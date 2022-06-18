import React from "react"
import Form from "react-bootstrap/Form"
import { editorHandleChange } from "./Helpers"

export const EditorLongevity = ({ value, setValue }) => {
  return (
    <Form.Group className="mb-3">
      <Form.Label>Longevità</Form.Label>
      <Form.Range
        min={1}
        max={5}
        value={value}
        onChange={editorHandleChange(setValue)}
      />
    </Form.Group>
  )
}
