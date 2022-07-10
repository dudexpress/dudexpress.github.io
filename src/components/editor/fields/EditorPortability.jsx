import React from "react"
import Form from "react-bootstrap/Form"
import { editorHandleChange } from "./Helpers"

export const EditorPortability = ({ value, setValue }) => {
  return (
    <Form.Group className="mb-3">
      <Form.Label>Portabilità</Form.Label>
      <Form.Range
        min={1}
        max={5}
        value={value}
        onChange={editorHandleChange(setValue)}
      />
      <Form.Text className="text-muted">
        1 = poco portabile (gloomhaven) -- 5 = tanto portabile (carte da
        briscola)
      </Form.Text>
    </Form.Group>
  )
}
