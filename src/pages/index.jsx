import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/Layout"
import Seo from "../components/seo"
import WhoWeAre from "../components/WhoWeAre"
import GameList from "../components/GameList"

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title="Welcome" />

      <h2>Leggi gli ultimi articoli</h2>

      <GameList games={data.allMdx.nodes} />
      <Link to="/blog/2" rel="next">
        Scopri di più →
      </Link>
      <hr />
      <h2>Chi siamo</h2>
      <WhoWeAre />
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMdx(limit: 2, sort: { fields: [frontmatter___date], order: DESC }) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          description
        }
      }
    }
  }
`
