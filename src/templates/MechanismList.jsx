import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/Layout"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import { Helmet } from "react-helmet"

const MechanismList = ({ data, location, pageContext }) => {
  const { title } = data.site.siteMetadata,
    metaTitle = `Meccaniche | ${title}`

  return (
    <Layout location={location} title={title}>
      <Helmet>
        <title>{metaTitle}</title>
      </Helmet>

      <Container className="mb-5">
        <Row>
          <Col lg={{ span: 8, offset: 2 }}>
            <h1 className="my-5">Meccaniche</h1>
            <ul>
              {pageContext.mechanisms.map(mechanism => {
                return (
                  <li>
                    <Link to={mechanism.path}>{mechanism.title}</Link>
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
export default MechanismList

export const mechanismListQuery = graphql`
  query mechanismListQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`
