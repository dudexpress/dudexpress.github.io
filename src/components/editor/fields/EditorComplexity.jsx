import React from "react"
import Form from "react-bootstrap/Form"
import { editorHandleChange } from "./Helpers"

export const EditorComplexity = ({ value, setValue }) => {
  return (
    <Form.Group className="mb-3">
      <Form.Label>Complessità</Form.Label>
      <Form.Range
        min={1}
        max={5}
        value={value}
        onChange={editorHandleChange(setValue)}
      />
      <Form.Text className="text-muted">
        1 = super easy -- 5 = super complicato
      </Form.Text>
    </Form.Group>
  )
}
