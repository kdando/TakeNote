import { Navigate, Outlet, useOutletContext, useParams } from "react-router-dom"

//importing types
import { Note } from "../App"

//CUSTOM TYPES////////////
type NoteLayoutProps = {
    notes: Note[]
}
/////////////////////////

//allows us to access outlet context from elsewhere
export function useNote() {
    return useOutletContext<Note>();
}
/////////////////////////

export function NoteLayout ({ notes }: NoteLayoutProps) {    

    //get id from params and find the note with the corresponding id from the array of notes
    const { id } = useParams();
    const note = notes.find(item => item.id === id);

    // if the id doesnt exist redirect to homepage
    if (!note) { return <Navigate to="/" replace /> }

    //if it does, render the relevant nested route
    return <Outlet context={note} />

}

