import React, { useEffect, useState } from "react"
import { Link, graphql } from "gatsby"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import { withPrefix } from "gatsby"
import { Helmet } from "react-helmet"
import Layout from "../components/Layout"
import GameCard from "../components/misc/GameCard"
import WeegaCard from "../components/misc/WeegaCard"
import * as style from "./index.module.scss"
import BlogPostHeader from "../components/blogPostAreas/BlogPostHeader"
import SidebarLinks from "../components/sidebar/SidebarLinks"
import { DefaultStores } from "../components/sidebar/DefaultStores"

const Index = ({ data, location, pageContext }) => {
  const { title, description } = data.site.siteMetadata,
    [firstPost, ...posts] = data.allMdx.nodes,
    [weegaData, setWeegaData] = useState([])

  const renderOtherPosts = () => {
    return (
      <div className="text-center">
        <Link to="/blog/2">
          <button className="btn btn-outline-secondary mt-2 mb-5">Scopri altri articoli</button>
        </Link>
      </div>
    )
  }

  useEffect(async () => {
    try {
      const response = await fetch("https://api.dudexpress.it/weega-sales"),
        weegaData = await response.json()
      setWeegaData(weegaData)
    } catch (e) {}
  }, [])

  const structuredJSON = JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://dudexpress.it/#organization",
        name: "dudexpress",
        url: "https://dudexpress.it/",
        sameAs: ["https://www.facebook.com/dudexpress.review", "https://www.instagram.com/dudexpress.review/"],
        logo: {
          "@type": "ImageObject",
          "@id": "https://dudexpress.it/#logo",
          inLanguage: "it-IT",
          url: `https://dudexpress.it${withPrefix("logo/logo.png")}`,
          caption: "dudexpress",
        },
        image: { "@id": "https://dudexpress.it/#logo" },
      },
      {
        "@type": "WebSite",
        "@id": "https://dudexpress.it/#website",
        url: "https://dudexpress.it/",
        name: title,
        description,
        publisher: { "@id": "https://dudexpress.it/#organization" },
        potentialAction: [],
        inLanguage: "it-IT",
      },
    ],
  })

  return (
    <Layout location={location} title={title}>
      <Helmet>
        <title>{title} | Recensioni di giochi da tavolo</title>
        <meta name="description" content={description} />
        <link rel="canonical" href="https://dudexpress.it/" />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={`https://dudexpress.it${withPrefix("logo/logo.png")}`} />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={`https://dudexpress.it${withPrefix("logo/logo.png")}`} />

        <script type="application/ld+json">{structuredJSON}</script>
      </Helmet>

      <div className={style.index}>
        <div className="main-content mb-5">
          <BlogPostHeader fields={firstPost.fields} frontmatter={firstPost.frontmatter} withLink />
          <Container>
            <Row className="game-list">
              <Col lg={8}>
                {posts.splice(0, 3).map(post => (
                  <GameCard key={post.frontmatter.title} post={post} />
                ))}
                <WeegaCard {...weegaData?.sales?.[0]} />
                {posts.splice(0, 3).map(post => (
                  <GameCard key={post.frontmatter.title} post={post} />
                ))}
                <WeegaCard {...weegaData?.sales?.[1]} />
                {posts.splice(0, 3).map(post => (
                  <GameCard key={post.frontmatter.title} post={post} />
                ))}
                {renderOtherPosts()}
              </Col>
              <Col lg={4}>
                <DefaultStores />
                <SidebarLinks type="designers" title="Naviga per autori" values={pageContext.designers} withMore />
                <SidebarLinks type="publishers" title="Naviga per editori" values={pageContext.publishers} withMore />
                <SidebarLinks
                  type="mechanisms"
                  title="Naviga per meccaniche"
                  values={pageContext.mechanisms}
                  withMore
                />
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </Layout>
  )
}

export default Index

export const pageQuery = graphql`
  query {
    localSearchPages {
      index
      store
    }
    site {
      siteMetadata {
        title
        description
        authors {
          name
          summary
          image
        }
      }
    }
    allMdx(limit: 10, sort: { fields: [frontmatter___date], order: DESC }) {
      nodes {
        fields {
          slug
        }
        frontmatter {
          type
          date(formatString: "DD/MM/YYYY")
          writer
          title
          designer
          publisher

          featureImage {
            childImageSharp {
              gatsbyImageData(width: 330, placeholder: BLURRED, formats: [JPG, WEBP, AVIF])
            }
          }
          description
          mechanisms
        }
      }
    }
  }
`
