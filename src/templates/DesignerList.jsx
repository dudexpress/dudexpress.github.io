import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/Layout"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import { Helmet } from "react-helmet"

const DesignerList = ({ data, location, pageContext }) => {
  const { title } = data.site.siteMetadata,
    metaTitle = `Designer | ${title}`

  return (
    <Layout location={location} title={title}>
      <Helmet>
        <title>{metaTitle}</title>
      </Helmet>

      <Container className="mb-5">
        <Row>
          <Col lg={{ span: 8, offset: 2 }}>
            <h1 className="my-5">Designer</h1>
            <ul>
              {pageContext.designers.map(designer => {
                return (
                  <li>
                    <Link to={designer.path}>{designer.name}</Link>
                  </li>
                )
              })}
            </ul>
          </Col>
        </Row>
      </Container>
    </Layout>
  )
}
export default DesignerList

export const designerListQuery = graphql`
  query designerListQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`
