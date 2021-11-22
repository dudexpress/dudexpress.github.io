import React from "react"
import { Link, graphql } from "gatsby"
import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import SidebarValues from "../components/sidebar/SidebarVotes"
import WeightBox from "../components/boxes/WeightBox"
import PlayerCountBox from "../components/boxes/PlayerCountBox"
import DurationBox from "../components/boxes/DurationBox"
import ScoreBox from "../components/boxes/ScoreBox"
import Layout from "../components/Layout"
import Setting from "../components/sections/Setting"
import Rules from "../components/sections/Rules"
import ImageSection from "../components/sections/ImageSection"
import Feedback from "../components/sections/Feedback"
import Spotify from "../components/misc/Spoify"
import Youtube from "../components/misc/Youtube"
import Seo from "../components/seo"
import PostWriter from "../components/misc/PostWriter"
import Mechanisms from "../components/sidebar/Mechanisms"

const BlogPostTemplate = ({ data, location }) => {
  const post = data.mdx
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const { previous, next } = data
  const shortcodes = { Setting, ImageSection, Rules, Feedback, Spotify }

  return (
    <MDXProvider components={shortcodes}>
      <Layout location={location} title={siteTitle}>
        <Seo
          title={post.frontmatter.title}
          description={post.frontmatter.description || post.excerpt}
        />
        <article
          className="blog-post"
          itemScope
          itemType="http://schema.org/Article"
        >
          <header className="blog-post-header">
            <h1 itemProp="headline">{post.frontmatter.title}</h1>
            <h4>
              {post.frontmatter.designer} - {post.frontmatter.publisher}
            </h4>
            <em>{post.frontmatter.date}</em>
          </header>

          <Row className="mb-5 welcome-boxes">
            <Col md={3}>
              <ScoreBox value={post.frontmatter.score} />
            </Col>
            <Col md={3}>
              <DurationBox value={post.frontmatter.playing_time} />
            </Col>
            <Col md={3}>
              <WeightBox value={post.frontmatter.weight} />
            </Col>
            <Col md={3}>
              <PlayerCountBox value={post.frontmatter.player_count} />
            </Col>
          </Row>

          <Row>
            <Col md={9} className="base-section-column">
              <MDXRenderer>{post.body}</MDXRenderer>

              <Row className="mb-5">
                <Col md={6}>
                  <h4>Unboxing</h4>
                  <Youtube
                    id={post.frontmatter.unboxing_youtbe_id}
                    title={post.frontmatter.title}
                  />
                </Col>
                <Col md={6}>
                  <h4>Playlist</h4>
                  <Spotify playlistId="5vymJZWeWphxmQmnRqqutE" />
                </Col>
              </Row>
            </Col>
            <Col md={3}>
              <Mechanisms values={post.frontmatter.mechanisms} />
              <div className="mt-5">
                <SidebarValues values={post.frontmatter.sidebar_votes} />
              </div>
              <div className="mt-5">
                <h5>Leggi anche</h5>
                <nav className="blog-post-nav">
                  <ul>
                    <li>
                      {previous && (
                        <Link to={previous.fields.slug} rel="prev">
                          {previous.frontmatter.title}
                        </Link>
                      )}
                    </li>
                    <li>
                      {next && (
                        <Link to={next.fields.slug} rel="next">
                          {next.frontmatter.title}
                        </Link>
                      )}
                    </li>
                  </ul>
                </nav>
              </div>
            </Col>
          </Row>

          <footer className="mt-5">
            <PostWriter writerName={post.frontmatter.writer} />
          </footer>
        </article>
      </Layout>
    </MDXProvider>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
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
        description
        designer
        publisher
        score
        mechanisms
        weight
        design
        player_count
        playing_time
        unboxing_youtbe_id
        sidebar_votes {
          title
          value
        }
      }
    }
    previous: mdx(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: mdx(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`
