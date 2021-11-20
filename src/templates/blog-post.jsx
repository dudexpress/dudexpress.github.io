import React from "react"
import { Link, graphql } from "gatsby"
import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"

import Bio from "../components/bio"
import DesignBox from "../components/boxes/DesignBox"
import WeightBox from "../components/boxes/WeightBox"
import Layout from "../components/Layout"
import Setting from "../components/sections/Setting"
import Rules from "../components/sections/Rules"
import Feedback from "../components/sections/Feedback"
import Spotify from "../components/misc/Spoify"
import Youtube from "../components/misc/Youtube"
import Seo from "../components/seo"

const BlogPostTemplate = ({ data, location }) => {
  const post = data.mdx
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const { previous, next } = data
  const shortcodes = { Setting, Rules, Feedback, Spotify }

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
          <header>
            <h1 itemProp="headline">{post.frontmatter.title}</h1>
            <h4>
              {post.frontmatter.designer} - {post.frontmatter.publisher}
            </h4>
            <h5>{post.frontmatter.mechanisms.join(", ")}</h5>
            <p>{post.frontmatter.date}</p>
            <p>{post.frontmatter.author}</p>
          </header>
          <h1>Infos</h1>
          <DesignBox value={post.frontmatter.design} />
          <WeightBox value={post.frontmatter.weight} />
          count: {post.frontmatter.player_count}
          <br />
          time: {post.frontmatter.playing_time}
          <hr />
          <MDXRenderer>{post.body}</MDXRenderer>
          <hr />
          <h4>unboxing</h4>
          <Youtube
            id={post.frontmatter.unboxing_youtbe_id}
            title={post.frontmatter.title}
          />
          <footer>
            <Bio />
          </footer>
        </article>
        <nav className="blog-post-nav">
          <ul
            style={{
              display: `flex`,
              flexWrap: `wrap`,
              justifyContent: `space-between`,
              listStyle: `none`,
              padding: 0,
            }}
          >
            <li>
              {previous && (
                <Link to={previous.fields.slug} rel="prev">
                  ← {previous.frontmatter.title}
                </Link>
              )}
            </li>
            <li>
              {next && (
                <Link to={next.fields.slug} rel="next">
                  {next.frontmatter.title} →
                </Link>
              )}
            </li>
          </ul>
        </nav>
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
        title
        description
        designer
        publisher
        mechanisms
        weight
        design
        player_count
        playing_time
        unboxing_youtbe_id
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
