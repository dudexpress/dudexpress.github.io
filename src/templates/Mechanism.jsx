import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/Layout"
import Container from "react-bootstrap/Container"
import GameCard from "../components/misc/GameCard"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons/faAngleLeft"
import { Helmet } from "react-helmet"

const Mechanism = ({ pageContext, location, data }) => {
  const { title } = data.site.siteMetadata,
    metaTitle = `${pageContext.mechanism} | ${title}`

  return (
    <Layout location={location} title={title}>
      <Helmet>
        <title>{metaTitle}</title>
      </Helmet>

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

export const mechanismQuery = graphql`
  query mechanismQuery($ids: [String]!) {
    site {
      siteMetadata {
        title
      }
    }
    allMdx(
      filter: { id: { in: $ids } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
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
            mechanisms
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

export default Mechanism
