import React, { useState } from "react"
import Container from "react-bootstrap/Container"
import Form from "react-bootstrap/Form"
import { Helmet } from "react-helmet"
import Layout from "../components/Layout"
import { graphql } from "gatsby"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"
import { EditorState, convertToRaw } from "draft-js"
import draftToMarkdown from "draftjs-to-markdown"

import { EditorTitle } from "../components/editor/fields/EditorTitle"
import { EditorDescription } from "../components/editor/fields/EditorDescription"
import { EditorWriter } from "../components/editor/fields/EditorWriter"
import { EditorScore } from "../components/editor/fields/EditorScore"
import { EditorSetting } from "../components/editor/fields/EditorSetting"

const MyForm = ({ data, location }) => {
  const siteMeta = data.site.siteMetadata,
    metaTitle = `Nuova recensione | ${siteMeta.title}`,
    onSubmit = () => {
      console.log(
        title,
        writer,
        description,
        score,
        draftToMarkdown(convertToRaw(setting.getCurrentContent()))
      )
    },
    [title, setTitle] = useState(""),
    [writer, setWriter] = useState(null),
    [description, setDescription] = useState(""),
    [score, setScore] = useState(1),
    [setting, setSetting] = useState(EditorState.createEmpty())

  return (
    <Layout location={location} title={title}>
      <Helmet>
        <title>{metaTitle}</title>
      </Helmet>

      <Container>
        <Row>
          <Col lg={{ span: 8, offset: 2 }}>
            <h1 className="my-5">Nuova recensione</h1>

            <Form>
              <EditorTitle value={title} setValue={setTitle} />
              <EditorWriter
                setValue={setWriter}
                allowedValues={siteMeta.authors}
              />
              <EditorDescription
                value={description}
                setValue={setDescription}
              />
              <EditorScore value={score} setValue={setScore} />
              <EditorSetting value={setting} setValue={setSetting} />

              <Button onClick={onSubmit}>Salva</Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </Layout>
  )
}

export default MyForm

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
