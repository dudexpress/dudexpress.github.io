import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/Layout"
import GameList from "../components/GameList"

const BlogList = ({ data, location, pageContext }) => {
  const siteTitle = data.site.siteMetadata.title
  const { currentPage, numPages } = pageContext
  const isFirst = currentPage === 1
  const isLast = currentPage === numPages
  const prevPage = currentPage - 1 === 1 ? "" : (currentPage - 1).toString()
  const nextPage = (currentPage + 1).toString()

  return (
    <Layout location={location} title={siteTitle}>
      <GameList games={data.allMdx.edges.map(x => x.node)} />
      {!isFirst && (
        <Link to={`/blog/${prevPage}`} rel="prev">
          ← Previous Page
        </Link>
      )}

      {!isLast && (
        <Link to={`/blog/${nextPage}`} rel="next">
          Next Page →
        </Link>
      )}
    </Layout>
  )
}

export default BlogList

export const blogListQuery = graphql`
  query blogListQuery($skip: Int!, $limit: Int!) {
    site {
      siteMetadata {
        title
      }
    }
    allMdx(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
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
