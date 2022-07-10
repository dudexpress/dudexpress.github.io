import React from "react"
import Form from "react-bootstrap/Form"
import { editorHandleChange } from "./Helpers"

export const EditorLuck = ({ value, setValue }) => {
  return (
    <Form.Group className="mb-3">
      <Form.Label>Fortuna</Form.Label>
      <Form.Range
        min={1}
        max={5}
        value={value}
        onChange={editorHandleChange(setValue)}
      />
      <Form.Text className="text-muted">
        1 = nessuna fortuna -- 5 = dadi come piovesse
      </Form.Text>
    </Form.Group>
  )
}
