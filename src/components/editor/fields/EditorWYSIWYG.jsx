import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"

import { EditorState, Modifier } from "draft-js"
import React, { Component } from "react"

import { Editor } from "react-draft-wysiwyg"
import Form from "react-bootstrap/Form"

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
            options: ["bold", "italic", "underline", "strikethrough"],
          },
          list: {
            options: ["unordered", "ordered"],
          },
        }}
        toolbarCustomButtons={[<CustomLink />]}
      />
      <Form.Text className="text-muted">{text}</Form.Text>
    </Form.Group>
  )
}

class CustomLink extends Component {
  addStar = () => {
    const { editorState, onChange } = this.props
    const contentState = Modifier.replaceText(
      editorState.getCurrentContent(),
      editorState.getSelection(),
      '<Link to="link">testo</Link>',
      editorState.getCurrentInlineStyle()
    )
    onChange(EditorState.push(editorState, contentState, "insert-characters"))
  }

  render() {
    return (
      <div
        style={{
          marginLeft: "10px",
          padding: "0",
          fontSize: "15px",
        }}
        onClick={this.addStar}
      >
        🔗
      </div>
    )
  }
}
