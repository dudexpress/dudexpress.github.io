const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)
const slugify = require("slugify")

function dedupeMechanisms(allMdx) {
  const uniqeMechanisms = new Set()
  allMdx.edges.forEach(({ node }) => {
    node.frontmatter.mechanisms.forEach(m => {
      uniqeMechanisms.add(m)
    })
  })
  return [...uniqeMechanisms]
}

function getMechanismPath(mechanism) {
  return `/mechanisms/${slugify(mechanism, { lower: true })}`
}

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions
  const blogPost = path.resolve(`./src/templates/BlogPost.tsx`)
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
    let readMoreIds = []
    while (readMoreIds.length < 3) {
      let r = "" + Math.floor(Math.random() * posts.length)
      if (readMoreIds.indexOf(r) === -1 && r !== "" + index) {
        readMoreIds.push(r)
      }
    }

    reporter.info(`Creating page: ${post.fields.slug}`)

    createPage({
      path: post.fields.slug,
      component: blogPost,
      context: {
        id: post.id,
        readMoreIds: readMoreIds.map(x => posts[x].id),
      },
    })
  })

  const blogPostPerPage = 10
  const numPages = Math.ceil(posts.length / blogPostPerPage)

  Array.from({ length: numPages }).forEach((_, i) => {
    reporter.info(`Creating page: blog/${i + 1}`)
    createPage({
      path: i === 0 ? `/blog` : `/blog/${i + 1}`,
      component: path.resolve("./src/templates/BlogPostList.jsx"),
      context: {
        limit: blogPostPerPage,
        skip: i * blogPostPerPage,
        numPages,
        currentPage: i + 1,
      },
    })
  })

  const {
    data: { allMdx },
  } = await graphql(`
    query {
      allMdx {
        edges {
          node {
            id
            frontmatter {
              mechanisms
            }
          }
        }
      }
    }
  `)

  const dedupedMechanisms = dedupeMechanisms(allMdx).sort()

  createPage({
    path: `mechanisms`,
    component: require.resolve("./src/templates/MechanismList.jsx"),
    context: {
      mechanisms: dedupedMechanisms.map(x => ({
        title: x,
        path: getMechanismPath(x),
      })),
    },
  })

  dedupedMechanisms.forEach(mechanism => {
    reporter.info(`Creating page: ${getMechanismPath(mechanism)}`)
    createPage({
      path: getMechanismPath(mechanism),
      component: require.resolve("./src/templates/Mechanism.jsx"),
      context: {
        mechanism,
        ids: allMdx.edges
          .filter(({ node }) => {
            return node.frontmatter.mechanisms.includes(mechanism)
          })
          .map(({ node }) => node.id),
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
      authors: [Author]
      siteUrl: String
      social: Social
    }

    type Author {
      name: String
      summary: String
      image: String
      instagram_url: String
      website: String
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
      writer: String
      title: String
      description: String
      designer: String
      publisher: String
      score: Int
      mechanisms: [String]
      weight: Float
      player_count: Int
      player_count_official: String
      playing_time: String
      playing_time_official: String
      sidebar_votes: [SidebarVotes]
      seelves: [Sleeve]
      fantasia_url: String
      weega_url: String
      weega_future: Boolean
      gamefound_url: String
      kickstarter_url: String
    }

    type SidebarVotes {
      title: String
      value: Int
    }

    type Sleeve {
      amount: Int
      size: String
    }

    type Fields {
      slug: String
    }
  `)
}
