import React from "react"
import Form from "react-bootstrap/Form"
import { editorHandleChange } from "./Helpers"

export const EditorComponents = ({ value, setValue }) => {
  return (
    <Form.Group className="mb-3">
      <Form.Label>Componenti</Form.Label>
      <Form.Range
        min={1}
        max={5}
        value={value}
        onChange={editorHandleChange(setValue)}
      />
      <Form.Text className="text-muted">1 = schifo -- 5 = strepitose</Form.Text>
    </Form.Group>
  )
}
