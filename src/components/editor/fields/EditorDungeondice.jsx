import React from "react"
import Form from "react-bootstrap/Form"
import { editorHandleChange } from "./Helpers"

export const EditorDungeondice = ({ value, setValue }) => {
  return (
    <Form.Group className="mb-3">
      <Form.Label>Dungeondice</Form.Label>
      <Form.Control
        placeholder="https://www.dungeondice.it/25405-arkham-horror-lcg-revised-core.html"
        onChange={editorHandleChange(setValue)}
        value={value}
      />
    </Form.Group>
  )
}
