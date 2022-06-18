import React from "react"
import Form from "react-bootstrap/Form"
import { editorHandleChange } from "./Helpers"

export const EditorPlayerCountOfficial = ({ value, setValue }) => {
  return (
    <Form.Group className="mb-3">
      <Form.Label>Giocatori dichiarti</Form.Label>
      <Form.Control
        placeholder="1-5"
        onChange={editorHandleChange(setValue)}
        value={value}
      />
    </Form.Group>
  )
}
