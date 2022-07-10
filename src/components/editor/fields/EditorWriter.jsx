import React from "react"
import Select from "react-select"
import Form from "react-bootstrap/Form"

export const EditorWriter = ({ setValue, allowedValues }) => {
  const options = allowedValues.map(x => ({
    value: x.name,
    label: x.name,
  }))
  options.push({ value: "Non ci sono", label: "Non ci sono" })

  return (
    <Form.Group className="mb-3">
      <Form.Label>Chi sei?</Form.Label>
      <Select
        options={options}
        onChange={a => setValue(a.value)}
        placeholder="Tia"
      />
      <Form.Text className="text-muted">
        Se il tuo nome non è presente, seleziona "Non ci sono"
      </Form.Text>
    </Form.Group>
  )
}
