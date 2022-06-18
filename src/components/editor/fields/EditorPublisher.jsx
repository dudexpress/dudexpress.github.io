import React from "react"
import Form from "react-bootstrap/Form"
import CreatableSelect from "react-select/creatable"

export const EditorPublisher = ({ setValue }) => {
  // TODO dynamic?
  const options = [
    "Giochi Uniti",
    "Cranio Creations",
    "dV Giochi",
    "Ghenos",
  ].map(x => ({
    value: x,
    label: x,
  }))

  return (
    <Form.Group className="mb-3">
      <Form.Label>Case editrici</Form.Label>
      <CreatableSelect
        isClearable
        isMulti
        onChange={options => setValue(options.map(x => x.value))}
        options={options}
        placeholder="[Giochi Uniti] [Ghenos]"
      />
    </Form.Group>
  )
}
