import React from "react"
import Form from "react-bootstrap/Form"
import { editorHandleChange } from "./Helpers"

export const EditorTitle = ({ value, setValue }) => {
  return (
    <Form.Group className="mb-3">
      <Form.Label>Titolo</Form.Label>
      <Form.Control
        placeholder="Everdell"
        onChange={editorHandleChange(setValue)}
        value={value}
      />
    </Form.Group>
  )
}
