import React from "react"
import Form from "react-bootstrap/Form"
import { Editor } from "react-draft-wysiwyg"
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"

export const EditorWYSIWYG = ({ name, value, setValue, text }) => {
  return (
    <Form.Group className="mb-3">
      <Form.Label>{name}</Form.Label>
      <Editor
        editorState={value}
        toolbarClassName="boder"
        editorClassName="px-2 border h-100"
        editorStyle={{ minHeight: 200 }}
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
      <Form.Text className="text-muted">{text}</Form.Text>
    </Form.Group>
  )
}
