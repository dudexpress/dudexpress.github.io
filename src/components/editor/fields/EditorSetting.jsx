import React from "react"
import Form from "react-bootstrap/Form"
import { Editor } from "react-draft-wysiwyg"
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"

export const EditorSetting = ({ value, setValue }) => {
  return (
    <Form.Group className="mb-3">
      <Form.Label>Setting</Form.Label>
      <Editor
        editorState={value}
        toolbarClassName="boder"
        editorClassName="px-2 border"
        onEditorStateChange={setValue}
        toolbar={{
          options: ["inline", "list"],
          inline: {
            options: ["bold", "italic", "underline"],
          },
          list: {
            options: ["unordered", "ordered"],
          },
        }}
      />
    </Form.Group>
  )
}
