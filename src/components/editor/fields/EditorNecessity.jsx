import Form from "react-bootstrap/Form"
import React from "react"
import { editorHandleChange } from "./Helpers"

export const EditorNecessity = ({ value, setValue }) => {
  return (
    <Form.Group className="mb-3">
      <Form.Label>Necessità</Form.Label>
      <Form.Range
        min={1}
        max={5}
        value={value}
        onChange={editorHandleChange(setValue)}
      />
      <Form.Text className="text-muted">
        1 = non serve -- 5 = assolutamente da avere
      </Form.Text>
    </Form.Group>
  )
}
