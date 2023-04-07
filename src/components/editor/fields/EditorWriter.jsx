import Form from "react-bootstrap/Form"
import React from "react"
import Select from "react-select"
import { getSugesterSyle } from "./Helpers"

export const EditorWriter = ({ value, setValue, allowedValues }) => {
  const options = allowedValues.map(x => ({
    value: x.name,
    label: x.name,
  }))
  options.push({ value: "Non ci sono", label: "Non ci sono" })

  console.log(allowedValues)

  return (
    <Form.Group className="mb-3">
      <Form.Label>Chi sei?</Form.Label>
      <Select
        options={options}
        onChange={a => setValue(a.value)}
        placeholder="Tia"
        styles={getSugesterSyle(value ? [value] : [])}
      />
      <Form.Text className="text-muted">
        Se il tuo nome non è presente, seleziona "Non ci sono"
      </Form.Text>
    </Form.Group>
  )
}
