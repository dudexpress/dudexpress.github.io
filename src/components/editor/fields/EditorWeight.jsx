import React from "react"
import Form from "react-bootstrap/Form"
import { editorHandleChange } from "./Helpers"
import WeightBox from "../../boxes/WeightBox"

export const EditorWeight = ({ value, setValue }) => {
  return (
    <Form.Group className="mb-3">
      <Form.Label>
        Peso {value}: {WeightBox.getLabel(parseInt(value, 10))}
      </Form.Label>
      <Form.Range
        min={1}
        max={5}
        value={value}
        onChange={editorHandleChange(setValue)}
      />
    </Form.Group>
  )
}
