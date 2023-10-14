import Form from "react-bootstrap/Form"
import React from "react"
import Select from "react-select"
import { getSugesterSyle } from "./Helpers"

export const EditorTypeContent = ({ value, setValue }) => {
  const options = [
    { value: "review", label: "gioco base" },
    { value: "expansion", label: "espansione" },
    { value: "editor", label: "editing veloce" },
  ]

  return (
    <Form.Group className="mb-3">
      <Form.Label>Tipologia di contenuto</Form.Label>
      <Select
        options={options}
        onChange={a => setValue(a.value)}
        placeholder="gioco base o espansione?"
        styles={getSugesterSyle(value ? [value] : [])}
      />
    </Form.Group>
  )
}
