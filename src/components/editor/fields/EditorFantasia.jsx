import React from "react"
import Form from "react-bootstrap/Form"
import { editorHandleChange } from "./Helpers"

export const EditorFantasia = ({ value, setValue }) => {
  return (
    <Form.Group className="mb-3">
      <Form.Label>Fantasia</Form.Label>
      <Form.Control
        placeholder="https://fantasiastore.it/it/arkham-horror-lcg/12002-arkham-horror-lcg-set-base-revised.html"
        onChange={editorHandleChange(setValue)}
        value={value}
      />
    </Form.Group>
  )
}
