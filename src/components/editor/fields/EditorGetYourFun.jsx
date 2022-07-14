import React from "react"
import Form from "react-bootstrap/Form"
import { editorHandleChange } from "./Helpers"

export const EditorGetYourFun = ({ value, setValue }) => {
  return (
    <Form.Group className="mb-3">
      <Form.Label>GetYourFun</Form.Label>
      <Form.Control
        placeholder="https://www.getyourfun.it/0218-arkham-horror-lcg-arkham-horror.html"
        onChange={editorHandleChange(setValue)}
        value={value}
      />
    </Form.Group>
  )
}
