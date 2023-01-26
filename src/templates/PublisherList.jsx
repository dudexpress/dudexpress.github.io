import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/Layout"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import { Helmet } from "react-helmet"

const PublisherList = ({ data, location, pageContext }) => {
  const { title } = data.site.siteMetadata,
    metaTitle = `Publisher | ${title}`

  return (
    <Layout location={location} title={title}>
      <Helmet>
        <title>{metaTitle}</title>
      </Helmet>

      <Container className="mb-5">
        <Row>
          <Col lg={{ span: 8, offset: 2 }}>
            <h1 className="my-5">Editori</h1>
            <ul>
              {pageContext.publishers.map(publisher => {
                return (
                  <li>
                    <Link to={publisher.path}>{publisher.name}</Link>
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
export default PublisherList

export const publisherListQuery = graphql`
  query publisherListQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`
