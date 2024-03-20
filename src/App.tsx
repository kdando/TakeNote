import 'bootstrap/dist/css/bootstrap.min.css'
import { Container } from 'react-bootstrap'
import { Navigate, Route, Routes } from 'react-router-dom'
import { NewNote } from './components/NewNote'
import { useLocalStorage } from './hooks/useLocalStorage'
import { useMemo } from 'react'
//this library allows us to create unique string ids
import { v4 as uuidV4 } from 'uuid'
import { NoteList } from './components/NoteList'
import { NoteLayout } from './components/NoteLayout'
import { ShowNote } from './components/ShowNote'
import { EditNote } from './components/EditNote.tsx'

export interface Note extends NoteData {
  id: string
}

export type NoteData = {
  title: string
  markdown: string
  tags: Tag[]
}

export type Tag = {
  id: string
  label: string
}

export interface RawNote extends RawNoteData {
  id: string
}

export type RawNoteData = {
  title: string
  markdown: string
  tagIds: string[]
}


function App() {

  const [notes, setNotes ] = useLocalStorage<RawNote[]>("NOTES", [])
  const [tags, setTags ] = useLocalStorage<Tag[]>("TAGS", [])

  const notesWithTags = useMemo(() => {
    return notes.map(note => {
      return { ...note, tags: tags.filter(tag => note.tagIds.includes(tag.id))}
    })
  }, [notes, tags])

  function onCreateNote({tags, ...data}: NoteData) {
    setNotes(prevNotes => {
      return [...prevNotes, {...data, id: uuidV4(), tagIds: tags.map(tag => tag.id)}]
    })
  }

  function onUpdateNote (id: string, {tags, ...data}: NoteData) {
    setNotes(prevNotes => {
      return prevNotes.map(note => {
        if (note.id === id) {
          return {...note, ...data, tagIds: tags.map(tag => tag.id) }
        } else {
          return note;
        }
      })
    })
  }

  function addTag(tag: Tag) {
    setTags(prev => [...prev, tag]);
  }

  return (
    <Container className='my-4'>
    
    <Routes>
      <Route path="/" element={<NoteList notes={notesWithTags} availableTags={tags} />}/>
      <Route path="/new" element={<NewNote onSubmit={onCreateNote} onAddTag={addTag} availableTags={tags}/>}/>
      
      <Route path="/:id" element={<NoteLayout notes={notesWithTags} />}>
        <Route index element={<ShowNote />}/>
        <Route path="edit" element={<EditNote onSubmit={onUpdateNote} onAddTag={addTag} />}/>
      </Route>

      <Route path="*" element={<Navigate to="/"/>}/>
    </Routes>

    </Container>
  
  )
}

export default App
