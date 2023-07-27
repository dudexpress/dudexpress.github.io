import classNames from "classnames"
import React from "react"
import { graphql, Link } from "gatsby"
import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import { Helmet } from "react-helmet"

import Layout from "../components/Layout"
import Container from "react-bootstrap/Container"
import GameCard from "../components/misc/GameCard"
import { Frontmatter, SimpleFrontmatter, SiteMetadata } from "../types"
import BlogPostHeader from "../components/blogPostAreas/BlogPostHeader"
import * as style from "./BlogPost.module.scss"
import * as styleSidebar from "../components/blogPostAreas/BlogPostSidebar.module.scss"
import Stores from "../components/sidebar/Stores"
import classnames from "classnames"
import { InterviewItem } from "../components/interview/InterviewItem"
import InterviewIntro from "../components/interview/InterviewIntro"
import PostWriter from "../components/misc/PostWriter"

const InterviewPost = ({ data, location }: BlogPostProps) => {
  const post = data.mdx
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const shortcodes = {
    Link,
    InterviewIntro,
    InterviewItem,
  }

  const classname = classNames(
      "main-content",
      style.blogPost,
      style.advisorPost
    ),
    metaTitle = `${post.frontmatter.title} | ${data.site.siteMetadata.title}`,
    metaDesciption = `${post.frontmatter.description} | Intevista ${data.site.siteMetadata.title}`,
    metaImage =
      "https://dudexpress.it" +
      post.frontmatter!.featureImage!.childImageSharp!.gatsbyImageData!.images!
        .fallback!.src

  const structuredJSON = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://dudexpress.it/${post.slug}`,
    },
    headline: post.frontmatter.title,
    description: post.frontmatter.description,
    image: metaImage,
    author: {
      "@type": "Organization",
      name: "dudexpress",
      url: "https://dudexpress.it",
    },
    publisher: {
      "@type": "Organization",
      name: "dudexpress",
      logo: {
        "@type": "ImageObject",
        url: "https://dudexpress.it/logo/logo-small.svg",
      },
    },
    datePublished: post.frontmatter.date,
  })

  return (
    <MDXProvider components={shortcodes}>
      <Layout location={location} title={siteTitle}>
        <Helmet>
          <title>{metaTitle}</title>
          <meta name="description" content={metaDesciption} />
          <link rel="canonical" href={`https://dudexpress.it/${post.slug}`} />
          <meta
            name="keywords"
            content={`${post.frontmatter.title}, dudexpress, intervista, interview, best board games, best of, dudeinterview, gioco, gioco da tavolo, recensioni, board game, review`}
          />

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
                  <div
                    className={classnames(
                      styleSidebar.blogPostSidebar,
                      "mt-5 mt-md-0"
                    )}
                  >
                    <Stores
                      label="Acquista i giochi su..."
                      dungeondice_url="https://www.dungeondice.it/"
                      magicmerchant_url="https://magicmerchant.it/"
                      getyourfun_url="https://www.getyourfun.it/"
                      fantasia_url="https://fantasiastore.it/"
                      blasone_url="https://www.blasoneshop.it/"
                      lsgiochi_url="https://www.lsgiochi.it/"
                      mse_url="https://www.msedizioni.it/"
                      pandoragames_url="https://pandoragames.it/"
                      weega_url="https://weega.it/"
                      linkToSpecificGame={false}
                    />
                  </div>
                </Col>
              </Row>
              <Row>
                <Col
                  lg={{ span: 7, offset: 1 }}
                  className="base-section-column"
                >
                  <PostWriter
                    writerName={post.frontmatter.writer}
                    asCard={true}
                  />
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

export default InterviewPost

export const pageQuery = graphql`
  query InterviewPostBySlug($id: String!, $readMoreIds: [String]!) {
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
        date(formatString: "DD/MM/YYYY")
        writer
        title
        featureImage {
          childImageSharp {
            gatsbyImageData(
              width: 330
              placeholder: BLURRED
              formats: [JPG, WEBP, AVIF]
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
      }
    }

    allMdx(filter: { id: { in: $readMoreIds } }) {
      nodes {
        fields {
          slug
        }
        frontmatter {
          date(formatString: "DD/MM/YYYY")
          writer
          title
          featureImage {
            childImageSharp {
              gatsbyImageData(
                width: 330
                placeholder: BLURRED
                formats: [JPG, WEBP, AVIF]
              )
            }
          }
          description
          mechanisms
        }
      }
    }
  }
`

export interface AdvisorPostDataProps {
  site: {
    siteMetadata: SiteMetadata
  }
  mdx: {
    frontmatter: Frontmatter // TODO
    body: string
    slug: string
  }
  allMdx: {
    nodes: {
      frontmatter: SimpleFrontmatter
      fields: {
        slug: string
      }
    }[]
  }
}

export interface BlogPostProps {
  data: AdvisorPostDataProps
  location: Location
}
