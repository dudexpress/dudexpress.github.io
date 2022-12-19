import React from "react"
import Form from "react-bootstrap/Form"
import { editorHandleChange } from "./Helpers"

export const EditorDate = ({ value, setValue }) => {
  return (
    <Form.Group className="mb-3">
      <Form.Label>Data d'uscita prevista</Form.Label>
      <Form.Control
        placeholder="2022-12-31"
        onChange={editorHandleChange(setValue)}
        value={value}
      />
      <Form.Text className="text-muted">
        inserire la data nel formato AAAA-MM-GG
      </Form.Text>
    </Form.Group>
  )
}
