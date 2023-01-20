import React from "react"
import Form from "react-bootstrap/Form"
import { editorHandleChange } from "./Helpers"

export const EditorMagicMerchant = ({ value, setValue }) => {
  return (
    <Form.Group className="mb-3">
      <Form.Label>Magic Merchant</Form.Label>
      <Form.Control
        placeholder="https://magicmerchant.it/catalogue/arkham-horror-lcg-revised-core-set-55670/"
        onChange={editorHandleChange(setValue)}
        value={value}
      />
    </Form.Group>
  )
}
