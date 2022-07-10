import React from "react"
import Form from "react-bootstrap/Form"
import { editorHandleChange } from "./Helpers"

export const EditorPlayingTime = ({ value, setValue }) => {
  return (
    <Form.Group className="mb-3">
      <Form.Label>Durata effettiva (in min)</Form.Label>
      <Form.Control
        type="number"
        placeholder="180"
        onChange={editorHandleChange(setValue)}
        value={value}
        isInvalid={!value}
      />
    </Form.Group>
  )
}
