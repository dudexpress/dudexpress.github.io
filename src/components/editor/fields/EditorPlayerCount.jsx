import React from "react"
import Form from "react-bootstrap/Form"
import { editorHandleChange } from "./Helpers"

export const EditorPlayerCount = ({ value, setValue }) => {
  return (
    <Form.Group className="mb-3">
      <Form.Label>Numero giocatori consigliato</Form.Label>
      <Form.Control
        type="number"
        placeholder="4"
        onChange={editorHandleChange(setValue)}
        value={value}
        isInvalid={!value}
      />
    </Form.Group>
  )
}
