import React from "react"
import Form from "react-bootstrap/Form"
import { editorHandleChange } from "./Helpers"

export const EditorLsgiochi = ({ value, setValue }) => {
  return (
    <Form.Group className="mb-3">
      <Form.Label>LS Giochi</Form.Label>
      <Form.Control
        placeholder="https://www.lsgiochi.it/product/10131042/arkham-horror-lcg-revised-core"
        onChange={editorHandleChange(setValue)}
        value={value}
      />
    </Form.Group>
  )
}
