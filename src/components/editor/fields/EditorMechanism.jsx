import React from "react"
import CreatableSelect from "react-select/creatable"
import Form from "react-bootstrap/Form"

export const EditorMechanism = ({ setValue, allowedValues }) => {
  const options = allowedValues.map(x => ({
    value: x,
    label: x,
  }))

  return (
    <Form.Group className="mb-3">
      <Form.Label>Meccaniche</Form.Label>
      <CreatableSelect
        isClearable
        isMulti
        onChange={options => setValue(options.map(x => x.value))}
        options={options}
        placeholder="[Asta] [Piazzamento lavoratori]"
      />
      <Form.Text className="text-muted">
        Scrivi un nome e poi premi &lt;tab&gt; o "Create xxx"
      </Form.Text>
    </Form.Group>
  )
}
