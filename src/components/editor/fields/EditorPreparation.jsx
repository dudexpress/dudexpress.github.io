import React from "react"
import Form from "react-bootstrap/Form"
import { editorHandleChange } from "./Helpers"

export const EditorPreparation = ({ value, setValue }) => {
  return (
    <Form.Group className="mb-3">
      <Form.Label>Preparazione</Form.Label>
      <Form.Range
        min={1}
        max={5}
        value={value}
        onChange={editorHandleChange(setValue)}
      />
      <Form.Text className="text-muted">
        1 = già pronto -- 5 = ottimila cose da fare
      </Form.Text>
    </Form.Group>
  )
}
