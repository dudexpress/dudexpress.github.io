const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions
  const blogPost = path.resolve(`./src/templates/blog-post.jsx`)
  const result = await graphql(
    `
      {
        allMdx(
          sort: { fields: [frontmatter___date], order: ASC }
          limit: 1000000
        ) {
          nodes {
            id
            fields {
              slug
            }
          }
        }
      }
    `
  )

  const posts = result.data.allMdx.nodes

  posts.forEach((post, index) => {
    const previousPostId = index === 0 ? null : posts[index - 1].id
    const nextPostId = index === posts.length - 1 ? null : posts[index + 1].id

    createPage({
      path: post.fields.slug,
      component: blogPost,
      context: {
        id: post.id,
        previousPostId,
        nextPostId,
      },
    })
  })

  const blogPostPerPage = 5
  const numPages = Math.ceil(posts.length / blogPostPerPage)
  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/blog` : `/blog/${i + 1}`,
      component: path.resolve("./src/templates/blog-list-template.jsx"),
      context: {
        limit: blogPostPerPage,
        skip: i * blogPostPerPage,
        numPages,
        currentPage: i + 1,
      },
    })
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `Mdx`) {
    const value = createFilePath({ node, getNode })

    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions

  createTypes(`
    type SiteSiteMetadata {
      author: Author
      siteUrl: String
      social: Social
    }

    type Author {
      name: String
      summary: String
    }

    type Social {
      twitter: String
    }

    type Mdx implements Node {
      frontmatter: Frontmatter
      fields: Fields
    }

    type Frontmatter {
      date: Date @dateformat
      title: String
      description: String
      designer: String
      publisher: String
      mechanisms: [String]
      weight: Float
      design: Float
      player_count: Int
      playing_time: String
      unboxing_youtbe_id: String
    }

    type Fields {
      slug: String
    }
  `)
}
