import React from "react"
import Button from "react-bootstrap/Button"
import { convertToRaw } from "draft-js"
import draftToMarkdown from "draftjs-to-markdown"
import { saveAs } from "file-saver"
import JSZip from "jszip"

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
    value: {{complessita}}
  - title: Preparazione
    value: {{preparazione}}
  - title: Fortuna
    value: {{fortuna}}
  - title: Longevità
    value: {{longevita}}
  - title: Componenti
    value: {{componenti}}
  - title: Portabilità
    value: {{portabilita}}

# bustine
# ks
# ...

fantasia_url: {{fantasia_url}}
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
  const getText = () => {
      let text = template
      text = text.replace(/{{title}}/g, props.title)
      text = text.replace(/{{writer}}/g, props.writer)
      text = text.replace(/{{description}}/g, props.description)
      text = text.replace(/{{score}}/g, props.score)
      text = text.replace(
        /{{setting}}/g,
        draftToMarkdown(convertToRaw(props.setting.getCurrentContent()))
      )
      return text
    },
    onSubmit = () => {
      const inputBlob = new Blob([getText()], { type: "text/plain" }),
        zip = new JSZip()

      zip.file("index.mdx", inputBlob)
      zip.generateAsync({ type: "blob" }).then(content => {
        saveAs(content, `${props.title.replace(/ /g, "-")}.zip`)
      })
    }

  return <Button onClick={onSubmit}>Salva</Button>
}
