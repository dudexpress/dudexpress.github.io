import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/Layout"
import Container from "react-bootstrap/Container"
import GameCard from "../components/misc/GameCard"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons/faAngleLeft"

const Mechanisms = ({ pageContext, location, data }) => {
  const siteTitle = data.site.siteMetadata.title

  return (
    <Layout location={location} title={siteTitle}>
      <Container className="mb-5">
        <Row className="game-list">
          <Col lg={{ span: 8, offset: 2 }}>
            <h1 className="mt-5 mb-1">{pageContext.mechanism}</h1>
            <h6 className="mb-5">
              <Link to="/mechanisms" className="text-muted">
                <FontAwesomeIcon icon={faAngleLeft} className="me-1" />
                vedi tutte le meccaniche
              </Link>
            </h6>
            {data.allMdx.edges.map(post => (
              <GameCard key={post.node.frontmatter.title} post={post.node} />
            ))}
          </Col>
        </Row>
      </Container>
    </Layout>
  )
}

export const mechanismsQuery = graphql`
  query mechanismQuery($ids: [String]!) {
    site {
      siteMetadata {
        title
      }
    }
    allMdx(filter: { id: { in: $ids } }) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            date(formatString: "DD/MM/YYYY")
            writer
            title
            description
            featureImage {
              childImageSharp {
                gatsbyImageData(
                  width: 330
                  placeholder: BLURRED
                  formats: [AUTO, WEBP, AVIF]
                )
              }
            }
          }
        }
      }
    }
  }
`

export default Mechanisms
