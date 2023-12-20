import React from "react"
import Form from "react-bootstrap/Form"
import CreatableSelect from "react-select/creatable"
import { getSugesterSyle } from "./Helpers"

export const EditorPublisher = ({ value, setValue }) => {
  // TODO dynamic?
  const options = ["Giochi Uniti", "Cranio Creations", "dV Giochi", "Ghenos"].map(x => ({
    value: x,
    label: x,
  }))

  return (
    <Form.Group className="mb-3">
      <Form.Label>Editori</Form.Label>
      <CreatableSelect
        isClearable
        isMulti
        onChange={options => setValue(options.map(x => x.value))}
        options={options}
        placeholder="[Giochi Uniti] [Ghenos]"
        styles={getSugesterSyle(value)}
      />
      <Form.Text className="text-muted">Scrivi un nome e poi premi &lt;tab&gt; o "Create xxx"</Form.Text>
    </Form.Group>
  )
}
