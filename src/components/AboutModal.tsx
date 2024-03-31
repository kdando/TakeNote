import { Modal } from "react-bootstrap";

//CUSTOM TYPES///////////
type AboutModalProps = {
    show: boolean
    handleClose: () => void
}
/////////////////////////

export function AboutModal ({ show, handleClose}: AboutModalProps ) {


    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Welcome to TakeNote!</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                TakeNote is a simple, lightweight note-taking app. Notes can be filtered by Title text or available Tags. Tags can be edited from the main page. New tags can be created when writing a new Note. TakeNote accepts Markdown for formatting. Notes are saved to your browser's local storage, so will persist when you close the application.
            </Modal.Body>
        </Modal>
    )

}