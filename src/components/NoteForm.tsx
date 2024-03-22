import { FormEvent, useRef, useState } from "react";
import { Accordion, Button, Col, Form, Row, Stack } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import CreatableReactSelect from 'react-select/creatable'
import { NoteData, Tag } from "../App";

//this library lets us create unique string-based ids
import { v4 as uuidV4 } from 'uuid'

//CUSTOM TYPES///////////////
type NoteFormProps = {
    onSubmit: (data: NoteData) => void
    onAddTag: (tag: Tag) => void
    availableTags: Tag[]
} & Partial<NoteData>

export function NoteForm({
    onSubmit,
    onAddTag,
    availableTags,
    title = "",
    markdown = "",
    tags = [],
  }: NoteFormProps) {

    const titleRef = useRef<HTMLInputElement>(null)
    const markdownRef = useRef<HTMLTextAreaElement>(null)

    const [selectedTags, setSelectedTags] = useState<Tag[]>(tags)

    const navigate = useNavigate()


    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        onSubmit({
            title: titleRef.current!.value,
            markdown: markdownRef.current!.value,
            tags: selectedTags,
        })
        navigate("..")
    }

    return (<Form onSubmit={handleSubmit}>
        <Stack gap={4}>
            <Row>

                <Col>
                <Form.Group controlId="title">
                    <Form.Label>Title</Form.Label>
                    <Form.Control ref={titleRef} required defaultValue={title} />
                </Form.Group>
                </Col>

                <Col>
                <Form.Group controlId="tags">
                    <Form.Label>Tags</Form.Label>
                    <CreatableReactSelect  
                        onCreateOption={label => {
                            const newTag = { id: uuidV4(), label }
                            onAddTag(newTag);
                            setSelectedTags(prev => [...prev, newTag]);
                        }}

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
                </Form.Group>
                </Col>

            </Row>

            <Row>
                <Accordion>
                    <Accordion.Header>This app supports markdown, expand to learn more.</Accordion.Header>
                    <Accordion.Body>
                    <p>Markdown is a powerful alternative to HTML for crafting written content that can be easily shared online, kept in a notes app, or exported to other formats. Some basic syntax:</p>
                    <ul>
                        <li>Prefix text with # for a H1 Heading, or ##, ### etc for smaller Headings.</li>
                        <li>Surround text with *asterisks* for italic, or **double asterisks** for bold.</li>
                        <li>Number text with 1., 2., etc for an ordered list, or - for an unordered one.</li>
                    </ul>
                    <Link to="https://www.markdownguide.org/cheat-sheet/" target="_blank">For further reference click this link (opens in new window).</Link>
                    </Accordion.Body>
                </Accordion>
            </Row>

            <Form.Group controlId="markdown">
                <Form.Label>Body</Form.Label>
                <Form.Control ref={markdownRef} defaultValue={markdown} required as="textarea" rows={15}/>
            </Form.Group>

            <Stack direction="horizontal" gap={2} className="justify-content-end">
                <Button type="submit" variant="primary">Save</Button>
                <Link to="..">
                <Button type="button" variant="outline-secondary">Cancel</Button>
                </Link>
            </Stack>
            
        </Stack>
    </Form>)

}