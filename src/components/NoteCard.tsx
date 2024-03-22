import { Badge, Card, Stack } from "react-bootstrap";
import { Tag } from "../App";
import { Link } from "react-router-dom";

import styles from '../NoteCard.module.scss'

//CUSTOM TYPES////////////////
export type SimplifiedNote = {
    tags: Tag[]
    title: string
    id: string
}
/////////////////////////////

export function NoteCard ({ id, title, tags }: SimplifiedNote) {
    return <Card as={Link} to={`/${id}`} className={`h-100 bg-warning text-reset text-decoration-none ${styles.card}`}>
        <Card.Body>
            <Stack gap={2} className="align-items-center justify-content-center h-100">
                <span className="fs-5">{title}</span>
                {tags.length > 0 && (
                    <Stack gap={1} direction="horizontal" className="justify-content-center flex-wrap">
                        {tags.map(tag => (
                            <Badge key={tag.id} className="text-truncate">{tag.label}</Badge>
                        ))}
                    </Stack>
                )}
            </Stack>
        </Card.Body>
    </Card>
}