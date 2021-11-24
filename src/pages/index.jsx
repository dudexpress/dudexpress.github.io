import React from "react"
import { Link, graphql } from "gatsby"
import Container from "react-bootstrap/Container"
import Layout from "../components/Layout"
import Seo from "../components/seo"
import WhoWeAre from "../components/WhoWeAre"
import GameList from "../components/GameList"
import Search from "../components/Search"

const BlogIndex = ({ data, location }) => {
  const { title, authors } = data.site.siteMetadata

  return (
    <Layout location={location} title={title}>
      <Seo title="Welcome" />
      <Search {...data.localSearchPages} location={location} />

      <div className="main-content">
        <Container>
          <h2>Leggi gli ultimi articoli</h2>

          <GameList games={data.allMdx.nodes} />
          <Link to="/blog" rel="next">
            Scopri di più →
          </Link>
          <hr />
          <h2>Chi siamo</h2>
          <WhoWeAre authors={authors} />
        </Container>
      </div>
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    localSearchPages {
      index
      store
    }
    site {
      siteMetadata {
        title
        authors {
          name
          summary
          image
        }
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
