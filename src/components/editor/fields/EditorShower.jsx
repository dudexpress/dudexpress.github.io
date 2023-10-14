import Button from "react-bootstrap/Button"
import React from "react"
import { convertToRaw } from "draft-js"
import draftToMarkdown from "draftjs-to-markdown"
import showdown from "showdown"

export const EditorShower = props => {
  const [textEdited, setTextEdited] = React.useState("")

  const template = `{{editorText}}`

  const makeSections = text => {
      const mdWithHtml = draftToMarkdown(
          convertToRaw(text.getCurrentContent())
        ),
        htmlTagRegex = /(<([^>]+)>)/gi,
        md = mdWithHtml.replace(htmlTagRegex, ""),
        converter = new showdown.Converter({ simpleLineBreaks: true })

      let html = converter.makeHtml(md)
      html = html.replace(/\*\*([\w\s:_?]+)\*\*/gm, "<strong>$1</strong>")
      html = html.replace(/\*([\w\s:_?]+)\*/gm, "<em>$1</em>")
      html = html.replace(/\_\_([\w\s:_?]+)\_\_/gm, "<u>$1</u>")
      html = html.replace(/\~\~([\w\s:_?]+)\~\~/gm, "<s>$1</s>")
      html = html.replace(/(https:\/\/dudexpress\.it)/gm, "")
      html = html.replace(/(&lt;)/gm, "<")
      html = html.replace(/(&gt;)/gm, ">")
      html = html.replace(/<p>/g, "")
      html = html.replace(/<\/p>/g, "<br />")

      return html
    },
    getText = () => {
      let text = template

      text = text.replace(/{{editorText}}/g, makeSections(props.editingText))

      return text
    },
    onSubmit = () => {
      setTextEdited(getText())
    }

  return (
    <>
      <Button onClick={onSubmit}>Mostra il testo editato</Button>
      <br />
      <br />
      {textEdited}
    </>
  )
}
