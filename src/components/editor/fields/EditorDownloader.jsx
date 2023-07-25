import Button from "react-bootstrap/Button"
import JSZip from "jszip"
import React from "react"
import { convertToRaw } from "draft-js"
import draftToMarkdown from "draftjs-to-markdown"
import { saveAs } from "file-saver"
import showdown from "showdown"

export const EditorDownloader = props => {
  console.log(props)

  const template =
    `---
type: "review"
date: "{{date}}"
writer: {{writer}}
title: "{{title}}"
featureImage: cover.jpg
description: "{{description}}"
designer: 
{{designers}}
publisher: 
{{publishers}}
mechanisms:
{{mechanisms}}

score: {{score}}
weight: {{weight}}
player_count: {{player_count}}
player_count_official: "{{player_count_official}}"
playing_time: {{playing_time}}min
playing_time_official: {{playing_time_official}}min

sidebar_votes:
` +
    (props.typeContent === "expansion"
      ? `
  - title: Necessità
    value: {{necessity}}
`
      : ``) +
    `
  - title: Complessità
    value: {{complexity}}
  - title: Preparazione
    value: {{preparation}}
` +
    (props.typeContent === "review"
      ? `
  - title: Fortuna
    value: {{luck}}
`
      : ``) +
    `
  - title: Longevità
    value: {{longevity}}
  - title: Componenti
    value: {{components}}
  - title: Portabilità
    value: {{portability}}

# seelves
{{dungeondice_url}}
{{magicmerchant_url}}
{{getyourfun_url}}
{{fantasia_url}}
{{blasoneshop_url}}
# weega_url
# weega_future
# gamefound_url
# kickstarter_url
---
` +
    (props.typeContent === "expansion"
      ? `<OriginalReviewLink slug="{{reviewLink}}" />`
      : ``) +
    (props.typeContent === "review"
      ? `
<Setting>
  {{setting}}
</Setting>

<img src="./game1.jpg" alt="{{title}}" />

<Rules>
 {{rules}}
</Rules>
`
      : `
<Panoramic>
  {{panoramic}}
</Panoramic>

`) +
    `
<img src="./game2.jpg" alt="{{title}}" />

<Feedback>
  {{feedback}}
</Feedback>

<img src="./game3.jpg" alt="{{title}}" />
`

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

      if (props.date === "TBD") {
        const year = new Date().getFullYear()
        text = text.replace(/{{date}}/g, `${year}-MM-DD"`)
      } else {
        text = text.replace(/{{date}}/g, props.date)
      }

      text = text.replace(/{{writer}}/g, props.writer)
      text = text.replace(/{{description}}/g, props.description)

      let designers = ""
      for (let m of props.designers) {
        designers += `  - ${m}\n`
      }
      text = text.replace(/{{designers}}/g, designers)

      let publishers = ""
      for (let m of props.publishers) {
        publishers += `  - ${m}\n`
      }
      text = text.replace(/{{publishers}}/g, publishers)

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
      if (props.typeContent === "expansion") {
        text = text.replace(/{{necessity}}/g, props.necessity)
      }
      text = text.replace(/{{complexity}}/g, props.complexity)
      text = text.replace(/{{preparation}}/g, props.preparation)
      if (props.typeContent === "review") {
        text = text.replace(/{{luck}}/g, props.luck)
      }

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

      if (props.magicmerchantUrl) {
        text = text.replace(
          /{{magicmerchant_url}}/g,
          `magicmerchant_url: ${props.magicmerchantUrl}`
        )
      } else {
        text = text.replace(/{{magicmerchant_url}}/g, "")
      }

      if (props.getYourFunUrl) {
        text = text.replace(
          /{{getyourfun_url}}/g,
          `getyourfun_url: ${props.getYourFunUrl}`
        )
      } else {
        text = text.replace(/{{getyourfun_url}}/g, "")
      }

      if (props.blasoneshopUrl) {
        text = text.replace(
          /{{blasoneshop_url}}/g,
          `blasone_url: ${props.blasoneshopUrl}`
        )
      } else {
        text = text.replace(/{{blasoneshop_url}}/g, "")
      }

      if (props.typeContent === "expansion") {
        text = text.replace(/{{reviewLink}}/g, props.title.toLowerCase())
      }
      if (props.typeContent === "review") {
        text = text.replace(/{{setting}}/g, makeSections(props.setting))
        text = text.replace(/{{rules}}/g, makeSections(props.rules))
      } else {
        text = text.replace(/{{panoramic}}/g, makeSections(props.panoramic))
      }
      text = text.replace(/{{feedback}}/g, makeSections(props.feedback))

      return text
    },
    onSubmit = () => {
      const inputBlob = new Blob([getText()], { type: "text/plain" }),
        zip = new JSZip()

      zip.file("index.docx", inputBlob)
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
        Scarica lo zip
      </Button>
      {disabledReason}
    </>
  )
}
