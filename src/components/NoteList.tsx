import { useState } from "react";
import { Button, Col, Form, Row, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import ReactSelect from "react-select";
import { Tag } from "../App";


export function NoteList ({ availableTags }: NoteListProps) {

    const [selectedTags, setSelectedTags] = useState<Tag[]>([])


    return (
        <>
        <Row>
            <Col>Ur Notes</Col>
            <Col xs="auto">
                <Stack gap={2} direction="horizontal">
                    <Link to="/new">
                        <Button variant="primary">Write</Button>
                    </Link>
                    <Button variant="outline-sec">Edit Tags</Button>
                </Stack>
            </Col>
        </Row>

        <Form>
            <Row className="mb-4">
                <Col>
                    <Form.Group controlId="title">
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" />
                    </Form.Group>
                </Col>

                <Col>
                <Form.Group controlId="tags">
                    <Form.Label>Tags</Form.Label>
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

                    isMulti={true}/>
                    <Form.Control required />
                </Form.Group>
                </Col>
            </Row>
        </Form>


        </>
    )
}