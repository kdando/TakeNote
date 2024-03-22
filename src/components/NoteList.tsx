import { useMemo, useState } from "react";
import { Button, Col, Form, Row, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import ReactSelect from "react-select";
import { Tag } from "../App";

//importing components and types
import { NoteCard, SimplifiedNote } from "./NoteCard";
import { EditTagsModal } from "./EditTagsModal";

//CUSTOM TYPES///////////
type NoteListProps = {
    availableTags: Tag[]
    notes: SimplifiedNote[]
    onDeleteTag: (id: string) => void
    onUpdateTag: (id: string, label: string) => void
}
///////////////////////

export function NoteList ({ availableTags, notes, onUpdateTag, onDeleteTag }: NoteListProps) {

    //STATE TO TRACK FILTERING BY TAG, NOTE TITLE, AND EDIT TAG MODAL OPEN/CLOSE
    const [selectedTags, setSelectedTags] = useState<Tag[]>([])
    const [title, setTitle] = useState("")
    const [editTagsModalIsOpen, setEditTagsModalIsOpen] = useState(false)
    ///////////////////////

    const filteredNotes = useMemo(() => {
        return notes.filter(note => {
          return (
            (title === "" ||
              note.title.toLowerCase().includes(title.toLowerCase())) &&
            (selectedTags.length === 0 ||
              selectedTags.every(tag =>
                note.tags.some(noteTag => noteTag.id === tag.id)
              ))
          )
        })
      }, [title, selectedTags, notes])


    return (
        <>
        {/* TOP BAR - APP TITLE ON LEFT, 2 BUTTONS ON RIGHT */}
        <Row className="align-items-center mb-4">
            <Col><h1 >TakeNote</h1></Col>
            <Col xs="auto">
                <Stack gap={2} direction="horizontal">
                    <Link to="/new">
                        <Button variant="primary"  style={{ backgroundColor: '#C107FF'}}>New Note</Button>
                    </Link>
                    <Button variant="outline-sec" onClick={() => setEditTagsModalIsOpen(true)}>Edit Tags</Button>
                </Stack>
            </Col>
        </Row>

        {/* SECOND BAR - INPUTS TO FILTER BY TITLE AND TAG */}
        <Form>
            <Row className="mb-4">
                <Col>
                    <Form.Group controlId="title">
                        <Form.Label>Filter by Title</Form.Label>
                        <Form.Control type="text" value={title} onChange={event => setTitle(event.target.value)} />
                    </Form.Group>
                </Col>

                <Col>
                <Form.Group controlId="tags">
                    <Form.Label>Filter by Tags</Form.Label>
                    <ReactSelect  
                        
                        options={availableTags.map(tag => {
                            return { label: tag.label, value: tag.id}
                        })}
                        
                        value={selectedTags.map(tag => {
                        return { label: tag.label, value: tag.id}
                        })} 

                        onChange={tags => setSelectedTags(tags.map(tag => {
                        return { label: tag.label, id: tag.value }
                         }))}

                    isMulti={true} />
                </Form.Group>
                </Col>
            </Row>
        </Form>
        
        {/* MAIN BODY - THE ACTUAL LISTING OF THE NOTE CARDS */}
        <Row xs={1} sm={2} lg={3} xl={4} className="g-3">
            {filteredNotes.map(note => {
                return (
                    <Col key={note.id}>
                        <NoteCard id={note.id} title={note.title} tags={note.tags}  />
                    </Col>
                )
            })}
        </Row>

        {/* THE MODAL TO EDIT TAGS */}
        <EditTagsModal show={editTagsModalIsOpen} handleClose={() => setEditTagsModalIsOpen(false)} availableTags={availableTags} onUpdateTag={onUpdateTag} onDeleteTag={onDeleteTag} />
        </>
    )
}