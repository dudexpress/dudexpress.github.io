import React from "react"
import Form from "react-bootstrap/Form"
import { editorHandleChange } from "./Helpers"
import ScoreBox from "../../boxes/ScoreBox"

export const EditorScore = ({ value, setValue }) => {
  return (
    <Form.Group className="mb-3">
      <Form.Label>
        Voto {value}: {ScoreBox.getLabel(parseInt(value, 10))}{" "}
      </Form.Label>
      <Form.Range
        min={1}
        max={10}
        value={value}
        onChange={editorHandleChange(setValue)}
      />
    </Form.Group>
  )
}
