import React from "react"
import { useDropzone } from "react-dropzone"

const thumbsContainer = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
}

const thumb = {
  display: "inline-flex",
  borderRadius: 2,
  border: "1px solid #eaeaea",
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: "border-box",
}

const thumbInner = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden",
}

const img = {
  display: "block",
  width: "auto",
  height: "100%",
}

export const EditorImages = props => {
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
    },
    onDrop: acceptedFiles => {
      props.setValue(
        props.value.concat(
          acceptedFiles.map(file =>
            Object.assign(file, {
              preview: URL.createObjectURL(file),
            })
          )
        )
      )
    },
  })

  const thumbs = props.value.map(file => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img
          alt="dont-care"
          src={file.preview}
          style={img}
          onLoad={() => {
            URL.revokeObjectURL(file.preview)
          }}
        />
      </div>
    </div>
  ))

  return (
    <div
      className="card text-center p-2 bg-light
    "
    >
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        <span style={{ cursor: "pointer" }}>Carica qui le immagini</span>
      </div>
      <aside style={thumbsContainer}>{thumbs}</aside>
    </div>
  )
}
