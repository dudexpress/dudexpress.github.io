import React from "react"
import Form from "react-bootstrap/Form"
import { editorHandleChange } from "./Helpers"

export const EditorPlayingTimeOfficial = ({ value, setValue }) => {
  return (
    <Form.Group className="mb-3">
      <Form.Label>Durata dichiarta (in min)</Form.Label>
      <Form.Control
        placeholder="30-45"
        onChange={editorHandleChange(setValue)}
        value={value}
        isInvalid={!value}
      />
    </Form.Group>
  )
}
