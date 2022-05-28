const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)
const slugify = require("slugify")

function getMechanismPath(mechanism) {
  return `/mechanisms/${slugify(mechanism, { lower: true })}`
}

function getWriterPath(author) {
  return `/writers/${slugify(author, { lower: true })}`
}

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions,
    result = await graphql(
      `
        {
          allMdx(sort: { fields: [frontmatter___date], order: ASC }) {
            nodes {
              id
              frontmatter {
                mechanisms
                writer
              }
              fields {
                slug
              }
            }
          }
        }
      `
    ),
    posts = result.data.allMdx.nodes

  posts.forEach((post, index) => {
    // TODO same mechaniism
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
      component: path.resolve(`./src/templates/BlogPost.tsx`),
      context: {
        id: post.id,
        readMoreIds: readMoreIds.map(x => posts[x].id),
      },
    })
  })

  const blogPostPerPage = 10,
    numPages = Math.ceil(posts.length / blogPostPerPage)

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

  let mechanismsCounter = {}
  result.data.allMdx.nodes.forEach(node => {
    node.frontmatter.mechanisms.forEach(m => {
      mechanismsCounter[m] = (mechanismsCounter[m] ?? 0) + 1
    })
  })

  const dedupedMechanisms = [...Object.keys(mechanismsCounter)].sort(),
    sortedMechanisms = Object.keys(mechanismsCounter).sort(
      (a, b) => mechanismsCounter[b] - mechanismsCounter[a]
    )

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
        ids: posts
          .filter(node => {
            return node.frontmatter.mechanisms.includes(mechanism)
          })
          .map(node => node.id),
      },
    })
  })

  let dedupedWriters = new Set()
  result.data.allMdx.nodes.forEach(node => {
    dedupedWriters.add(node.frontmatter.writer)
  })

  dedupedWriters.forEach(writer => {
    reporter.info(`Creating page: ${getWriterPath(writer)}`)
    createPage({
      path: getWriterPath(writer),
      component: require.resolve("./src/templates/Writer.jsx"),
      context: {
        writer,
        ids: posts
          .filter(node => {
            return node.frontmatter.writer === writer
          })
          .map(node => node.id),
      },
    })
  })

  createPage({
    path: "/",
    component: require.resolve("./src/templates/index.jsx"),
    context: {
      mechanisms: sortedMechanisms.slice(0, 5),
    },
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
