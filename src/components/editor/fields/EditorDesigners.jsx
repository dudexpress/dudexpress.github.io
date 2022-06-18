import React from "react"
import Form from "react-bootstrap/Form"
import CreatableSelect from "react-select/creatable"

export const EditorDesigners = ({ setValue }) => {
  const options = ["Nome 1", "Nome 2", "Nome 3"].map(x => ({
    value: x,
    label: x,
  }))

  return (
    <Form.Group className="mb-3">
      <Form.Label>Autori</Form.Label>
      <CreatableSelect
        isClearable
        isMulti
        onChange={options => setValue(options.map(x => x.value))}
        options={options}
      />
    </Form.Group>
  )
}
