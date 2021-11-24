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
import Feedback from "../components/sections/Feedback"
import Spotify from "../components/misc/Spoify"
import Youtube from "../components/misc/Youtube"
import Seo from "../components/seo"
import PostWriter from "../components/misc/PostWriter"
import Mechanisms from "../components/sidebar/Mechanisms"
import Container from "react-bootstrap/Container"
import Img from "gatsby-image"
import GameCard from "../components/GameCard"
import GameList from "../components/GameList"

const BlogPostTemplate = ({ data, location }) => {
  const post = data.mdx
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const shortcodes = { Setting, Rules, Feedback, Spotify, Youtube }

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
            <Container>
              <Row>
                <Col md={3}>
                  <Img
                    fluid={post.frontmatter.featureImage.childImageSharp.fluid}
                  />
                </Col>
                <Col md={9} className="blog-post-title">
                  <h4>
                    <span>{post.frontmatter.designer}</span>
                    <span>● {post.frontmatter.publisher}</span>
                  </h4>
                  <h1 itemProp="headline">{post.frontmatter.title}</h1>
                  <p>{post.frontmatter.description}</p>
                </Col>
              </Row>
            </Container>
          </header>
          <div>
            <Container>
              <Row className="welcome-boxes">
                <Col md={6} lg={3}>
                  <ScoreBox value={post.frontmatter.score} />
                </Col>
                <Col md={6} lg={3}>
                  <DurationBox value={post.frontmatter.playing_time} />
                </Col>
                <Col md={6} lg={3}>
                  <WeightBox value={post.frontmatter.weight} />
                </Col>
                <Col md={6} lg={3}>
                  <PlayerCountBox
                    value={post.frontmatter.player_count}
                    officialValue={post.frontmatter.player_count_official}
                  />
                </Col>
              </Row>
            </Container>
          </div>
          <div className="main-content article-main-content">
            <Container>
              <Row>
                <Col
                  xs={12}
                  md={8}
                  lg={{ span: 7, offset: 1 }}
                  className="base-section-column"
                >
                  <MDXRenderer>{post.body}</MDXRenderer>
                  <PostWriter writerName={post.frontmatter.writer} />
                </Col>

                <Col md={{ span: 3, offset: 1 }}>
                  <Mechanisms values={post.frontmatter.mechanisms} />
                  <div className="mt-5">
                    <SidebarValues values={post.frontmatter.sidebar_votes} />
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
        </article>
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

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($id: String!) {
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
        design
        player_count
        player_count_official
        playing_time
        unboxing_youtbe_id
        sidebar_votes {
          title
          value
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
