import classNames from "classnames"
import React from "react"
import { graphql } from "gatsby"
import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Layout from "../components/Layout"
import Setting from "../components/sections/Setting"
import Rules from "../components/sections/Rules"
import Feedback from "../components/sections/Feedback"
import Spotify from "../components/misc/Spoify"
import Instagram from "../components/misc/Instagram"
import Youtube from "../components/misc/Youtube"
import Seo from "../components/seo"
import PostWriter from "../components/misc/PostWriter"
import Container from "react-bootstrap/Container"
import GameCard from "../components/misc/GameCard"
import { Frontmatter, SimpleFrontmatter, SiteMetadata } from "../types"
import BlogPostHeader from "../components/blogPostAreas/BlogPostHeader"
import BlogPostBoxes from "../components/blogPostAreas/BlogPostBoxes"
import BlogPostSidebar from "../components/blogPostAreas/BlogPostSidebar"
import * as style from "./BlogPost.module.scss"

const BlogPost = ({ data, location }: BlogPostProps) => {
  const post = data.mdx
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const shortcodes = { Setting, Rules, Feedback, Spotify, Youtube, Instagram }
  const classname = classNames("main-content", style.blogPost)

  return (
    <MDXProvider components={shortcodes}>
      <Layout location={location} title={siteTitle}>
        <Seo
          title={post.frontmatter.title}
          description={post.frontmatter.description}
        />
        <div className="blog-post">
          <BlogPostHeader {...post.frontmatter} />
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
                  <PostWriter writerName={post.frontmatter.writer} />
                </Col>
              </Row>
            </Container>
          </div>
        </div>
        <Container className="read-more-posts">
          <Row className="game-list">
            <Col lg={{ span: 7, offset: 1 }}>
              <h1>Potrebbe interessarti anche</h1>
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
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        writer
        title
        featureImage {
          childImageSharp {
            fluid(maxWidth: 800) {
              ...GatsbyImageSharpFluid
            }
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
              fluid(maxWidth: 800) {
                ...GatsbyImageSharpFluid
              }
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
