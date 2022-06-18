import React from "react"
import Select from "react-select"
import Form from "react-bootstrap/Form"

export const EditorWriter = ({ setValue, allowedValues }) => {
  const options = allowedValues.map(x => ({
    value: x.name,
    label: x.name,
  }))

  return (
    <Form.Group className="mb-3">
      <Form.Label>Chi sei?</Form.Label>
      <Select options={options} onChange={a => setValue(a.value)} />
    </Form.Group>
  )
}
