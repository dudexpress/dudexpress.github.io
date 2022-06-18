import React from "react"
import Form from "react-bootstrap/Form"
import { editorHandleChange } from "./Helpers"

export const EditorDescription = ({ value, setValue }) => {
  return (
    <Form.Group className="mb-3">
      <Form.Label>Descrizione</Form.Label>
      <Form.Control
        placeholder="Animaletti che fanno cose e corrono in giro!"
        onChange={editorHandleChange(setValue)}
        value={value}
      />
    </Form.Group>
  )
}
