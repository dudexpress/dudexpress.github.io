import React from "react"
import Button from "react-bootstrap/Button"
import { convertToRaw } from "draft-js"
import draftToMarkdown from "draftjs-to-markdown"
import { saveAs } from "file-saver"
import JSZip from "jszip"
import showdown from "showdown"

const template = `---
date: "2022-xx-xx"
writer: {{writer}}
title: "{{title}}"
featureImage: cover.jpg
description: "{{description}}"
designer: {{designers}}
publisher: {{publishers}}
mechanisms:
{{mechanisms}}

score: {{score}}
weight: {{weight}}
player_count: {{player_count}}
player_count_official: "{{player_count_official}}"
playing_time: {{playing_time}}min
playing_time_official: {{playing_time_official}}min

sidebar_votes:
  - title: Complessità
    value: {{complexity}}
  - title: Preparazione
    value: {{preparation}}
  - title: Fortuna
    value: {{luck}}
  - title: Longevità
    value: {{longevity}}
  - title: Componenti
    value: {{components}}
  - title: Portabilità
    value: {{portability}}

# seelves
{{dungeondice_url}}
{{getyourfun_url}}
{{fantasia_url}}
# weega_url
# weega_future
# gamefound_url
# kickstarter_url
---

<Setting>
  {{setting}}
</Setting>

<img src="./game1.jpg" alt="{{title}}" />

<Rules>
 {{rules}}
</Rules>

<img src="./game2.jpg" alt="{{title}}" />

<Feedback>
  {{feedback}}
</Feedback>
`

export const EditorDownloader = props => {
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
      html = html.replace(/<p>/g, "")
      html = html.replace(/<\/p>/g, "<br />")

      return html
    },
    getText = () => {
      let text = template
      text = text.replace(/{{title}}/g, props.title)
      text = text.replace(/{{writer}}/g, props.writer)
      text = text.replace(/{{description}}/g, props.description)

      text = text.replace(/{{designers}}/g, props.designers.join(" - "))
      text = text.replace(/{{publishers}}/g, props.publishers.join(" - "))

      let mechanisms = ""
      for (let m of props.mechanisms) {
        mechanisms += `  - ${m}\n`
      }
      text = text.replace(/{{mechanisms}}/g, mechanisms)

      text = text.replace(/{{score}}/g, props.score)
      text = text.replace(/{{weight}}/g, props.weight)
      text = text.replace(/{{player_count}}/g, props.playerCount)
      text = text.replace(
        /{{player_count_official}}/g,
        props.playerCountOfficial
      )
      text = text.replace(/{{playing_time}}/g, props.playingTime)
      text = text.replace(
        /{{playing_time_official}}/g,
        props.playingTimeOfficial
      )

      text = text.replace(/{{complexity}}/g, props.complexity)
      text = text.replace(/{{preparation}}/g, props.preparation)
      text = text.replace(/{{luck}}/g, props.luck)
      text = text.replace(/{{longevity}}/g, props.longevity)
      text = text.replace(/{{components}}/g, props.components)
      text = text.replace(/{{portability}}/g, props.portability)

      if (props.fantasiaUrl) {
        text = text.replace(
          /{{fantasia_url}}/g,
          `fantasia_url: ${props.fantasiaUrl}`
        )
      } else {
        text = text.replace(/{{fantasia_url}}/g, "")
      }

      if (props.dungeondiceUrl) {
        text = text.replace(
          /{{dungeondice_url}}/g,
          `dungeondice_url: ${props.dungeondiceUrl}`
        )
      } else {
        text = text.replace(/{{dungeondice_url}}/g, "")
      }

      if (props.getYourFunUrl) {
        text = text.replace(
          /{{getyourfun_url}}/g,
          `getyourfun_url: ${props.getYourFunUrl}`
        )
      } else {
        text = text.replace(/{{getyourfun_url}}/g, "")
      }

      text = text.replace(/{{setting}}/g, makeSections(props.setting))
      text = text.replace(/{{rules}}/g, makeSections(props.rules))
      text = text.replace(/{{feedback}}/g, makeSections(props.feedback))

      return text
    },
    onSubmit = () => {
      const inputBlob = new Blob([getText()], { type: "text/plain" }),
        zip = new JSZip()

      zip.file("index.mdx", inputBlob)
      props.files.forEach(file => {
        zip.file(file.name, file)
      })

      zip.generateAsync({ type: "blob" }).then(content => {
        saveAs(content, `${props.title.replace(/ /g, "-")}.zip`)
      })
    }

  const disabledReason = props.isDisabled && (
    <>
      <br />
      <small>Compila tutti i campi!</small>
    </>
  )

  return (
    <>
      <Button disabled={props.isDisabled} onClick={onSubmit}>
        Salva
      </Button>
      {disabledReason}
    </>
  )
}
