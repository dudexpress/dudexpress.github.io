import React from "react"
import Form from "react-bootstrap/Form"
import { editorHandleChange } from "./Helpers"

export const EditorWriter = ({ setValue, allowedValues }) => {
  return (
    <Form.Group className="mb-3">
      <Form.Label>Autore</Form.Label>
      <Form.Select onChange={editorHandleChange(setValue)}>
        <option key="--" value={null}>
          --
        </option>
        {allowedValues.map(x => (
          <option key={x.name} value={x.name}>
            {x.name}
          </option>
        ))}
      </Form.Select>
    </Form.Group>
  )
}
