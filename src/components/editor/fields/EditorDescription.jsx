import React from "react"
import Form from "react-bootstrap/Form"
import { editorHandleChange } from "./Helpers"

export const EditorDescription = ({ value, setValue }) => {
  return (
    <Form.Group className="mb-3">
      <Form.Label>Description</Form.Label>
      <Form.Control
        placeholder="Bla bla descrizione"
        onChange={editorHandleChange(setValue)}
        value={value}
      />
    </Form.Group>
  )
}
