import { Navigate, Outlet, useOutletContext, useParams } from "react-router-dom"
import { Note } from "../App"

type NoteLayoutProps = {
    notes: Note[]
}

export function NoteLayout ({ notes }: NoteLayoutProps) {    
    const { id } = useParams();
    const note = notes.find(item => item.id === id);

    // if the id doesnt exist redirect to homepage
    if (!note) { return <Navigate to="/" replace /> }

    //if it does, render the relevant nested route
    return <Outlet context={note} />

}

//allows us to access outlet context when we want
export function useNote() {
    return useOutletContext<Note>();
}