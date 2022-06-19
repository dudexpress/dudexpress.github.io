import React from "react"
import { graphql } from "gatsby"

const EditorCore = React.lazy(() => import("../components/editor/EditorCore"))

const Editor = props => {
  const isSSR = typeof window === "undefined"
  return (
    <>
      {!isSSR && (
        <React.Suspense fallback={<div />}>
          <EditorCore {...props} />
        </React.Suspense>
      )}
    </>
  )
}

export default Editor

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        authors {
          name
        }
      }
    }
  }
`
