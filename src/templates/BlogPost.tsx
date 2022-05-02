import classNames from "classnames"
import React from "react"
import { graphql, Link } from "gatsby"
import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import { Helmet } from "react-helmet"

import Layout from "../components/Layout"
import Setting from "../components/sections/Setting"
import Rules from "../components/sections/Rules"
import Feedback from "../components/sections/Feedback"
import Spotify from "../components/misc/Spoify"
import Instagram from "../components/misc/Instagram"
import Youtube from "../components/misc/Youtube"
import PostWriter from "../components/misc/PostWriter"
import Container from "react-bootstrap/Container"
import GameCard from "../components/misc/GameCard"
import { Frontmatter, SimpleFrontmatter, SiteMetadata } from "../types"
import BlogPostHeader from "../components/blogPostAreas/BlogPostHeader"
import BlogPostBoxes from "../components/blogPostAreas/BlogPostBoxes"
import BlogPostSidebar from "../components/blogPostAreas/BlogPostSidebar"
import * as style from "./BlogPost.module.scss"
import { OutboundLink } from "gatsby-plugin-google-gtag"
import Fantasia from "../components/misc/Fantasia"
import Gamefound from "../components/misc/Gamefound"
import Kickstarter from "../components/misc/Kickstarter"
import RandomLink from "../components/misc/RandomLink"
import Weega from "../components/misc/Weega"

const BlogPost = ({ data, location }: BlogPostProps) => {
  const post = data.mdx
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const shortcodes = {
    Setting,
    Rules,
    Feedback,
    Spotify,
    Youtube,
    Instagram,
    OutboundLink,
    Link,
    RandomLink,
  }

  const classname = classNames("main-content", style.blogPost),
    metaTitle = `${post.frontmatter.title} | ${data.site.siteMetadata.title}`,
    metaDesciption = `${post.frontmatter.description} | Recensione gioco da tavolo ${data.site.siteMetadata.title}`,
    metaImage =
      "https://dudexpress.it" +
      post.frontmatter!.featureImage!.childImageSharp!.gatsbyImageData!.images!
        .fallback!.src

  const structuredJSON = JSON.stringify({
    "@context": "https://schema.org/",
    "@type": "Product",
    name: post.frontmatter.title,
    image: metaImage,
    review: [
      {
        "@type": "Review",
        reviewRating: {
          "@type": "Rating",
          ratingValue: post.frontmatter.score,
          bestRating: "10",
          worstRating: "0",
        },
        author: {
          "@type": "Person",
          name: post.frontmatter.writer,
        },
        reviewBody: post.frontmatter.description,
      },
    ],
  })

  return (
    <MDXProvider components={shortcodes}>
      <Layout location={location} title={siteTitle}>
        <Helmet>
          <title>{metaTitle}</title>
          <meta name="description" content={metaDesciption} />
          <link rel="canonical" href={`https://dudexpress.it/${post.slug}`} />

          <meta property="og:type" content="website" />
          <meta property="og:title" content={metaTitle} />
          <meta property="og:description" content={metaDesciption} />
          <meta property="og:image" content={metaImage} />

          <meta name="twitter:card" content="summary" />
          <meta name="twitter:title" content={metaTitle} />
          <meta name="twitter:description" content={metaDesciption} />
          <meta name="twitter:image" content={metaImage} />

          <script type="application/ld+json">{structuredJSON}</script>
        </Helmet>

        <div className="blog-post">
          <BlogPostHeader frontmatter={post.frontmatter} />
          <BlogPostBoxes {...post.frontmatter} />
          <div className={classname}>
            <Container>
              <Row>
                <Col
                  xs={12}
                  md={8}
                  lg={{ span: 7, offset: 1 }}
                  className="base-section-column"
                >
                  <MDXRenderer>{post.body}</MDXRenderer>
                </Col>
                <Col md={{ span: 3, offset: 1 }}>
                  <BlogPostSidebar {...post.frontmatter} />
                </Col>
              </Row>
              <Row>
                <Col
                  lg={{ span: 7, offset: 1 }}
                  className="base-section-column"
                >
                  <Fantasia
                    title={post.frontmatter.title}
                    link={post.frontmatter.fantasia_url}
                  />
                  <Weega
                    title={post.frontmatter.title}
                    link={post.frontmatter.weega_url}
                    future={post.frontmatter.weega_future}
                  />
                  <Gamefound
                    title={post.frontmatter.title}
                    link={post.frontmatter.gamefound_url}
                  />
                  <Kickstarter
                    title={post.frontmatter.title}
                    link={post.frontmatter.kickstarter_url}
                  />
                  <PostWriter writerName={post.frontmatter.writer} />
                </Col>
              </Row>
            </Container>
          </div>
        </div>
        <Container className="read-more-posts">
          <Row className="game-list">
            <Col lg={8}>
              <h2>Potrebbe interessarti anche...</h2>
              {data.allMdx.nodes.map(post => (
                <GameCard key={post.frontmatter.title} post={post} />
              ))}
            </Col>
          </Row>
        </Container>
      </Layout>
    </MDXProvider>
  )
}

export default BlogPost

export const pageQuery = graphql`
  query BlogPostBySlug($id: String!, $readMoreIds: [String]!) {
    site {
      siteMetadata {
        title
      }
    }

    mdx(id: { eq: $id }) {
      id
      body
      slug
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        writer
        title
        featureImage {
          childImageSharp {
            gatsbyImageData(
              width: 330
              placeholder: BLURRED
              formats: [AUTO, WEBP, AVIF]
            )
          }
        }
        description
        designer
        publisher
        score
        mechanisms
        weight
        player_count
        player_count_official
        playing_time
        playing_time_official
        sidebar_votes {
          title
          value
        }
        sleeves {
          amount
          size
        }
        fantasia_url
        weega_url
        weega_future
        gamefound_url
        kickstarter_url
      }
    }

    allMdx(filter: { id: { in: $readMoreIds } }) {
      nodes {
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          featureImage {
            childImageSharp {
              gatsbyImageData(
                width: 330
                placeholder: BLURRED
                formats: [AUTO, WEBP, AVIF]
              )
            }
          }
          description
        }
      }
    }
  }
`

export interface BlogPostDataProps {
  site: {
    siteMetadata: SiteMetadata
  }
  mdx: {
    frontmatter: Frontmatter
    body: string
    slug: string
  }
  allMdx: {
    nodes: {
      frontmatter: SimpleFrontmatter
    }[]
  }
}

export interface BlogPostProps {
  data: BlogPostDataProps
  location: Location
}
