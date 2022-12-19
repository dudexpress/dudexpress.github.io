import React from "react"
import Form from "react-bootstrap/Form"
import { editorHandleChange } from "./Helpers"

export const EditorBlasone = ({ value, setValue }) => {
  return (
    <Form.Group className="mb-3">
      <Form.Label>Blasone</Form.Label>
      <Form.Control
        placeholder="https://www.blasoneshop.it/catalogo/arkham-horror-lcg/arkham-horror-lcg-revised-core-set-474-1641"
        onChange={editorHandleChange(setValue)}
        value={value}
      />
    </Form.Group>
  )
}
