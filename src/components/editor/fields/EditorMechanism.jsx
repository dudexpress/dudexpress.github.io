import React from "react"
import Select from "react-select"
import Form from "react-bootstrap/Form"

export const EditorMechanism = ({ setValue, allowedValues }) => {
  const options = allowedValues.map(x => ({
    value: x,
    label: x,
  }))

  return (
    <Form.Group className="mb-3">
      <Form.Label>Meccaniche</Form.Label>
      <Select
        options={options}
        isMulti
        onChange={options => setValue(options.map(x => x.value))}
      />
    </Form.Group>
  )
}
