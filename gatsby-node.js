const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)
const slugify = require("slugify")
const fetch = require("node-fetch")

function getDesignerPath(mechanism) {
  return `/designers/${slugify(mechanism, { lower: true, strict: true })}`
}

function getPublisherPath(mechanism) {
  return `/publishers/${slugify(mechanism, { lower: true, strict: true })}`
}

function getMechanismPath(mechanism) {
  return `/mechanisms/${slugify(mechanism, { lower: true, strict: true })}`
}

function getWriterPath(author) {
  return `/writers/${slugify(author, { lower: true, strict: true })}`
}

async function getAllReviews(graphql) {
  const result = await graphql(
    `
      {
        allMdx(
          filter: { frontmatter: { type: { eq: "review" } } }
          sort: { fields: [frontmatter___date], order: ASC }
        ) {
          nodes {
            id
            frontmatter {
              type
              designer
              publisher
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
  )

  return result.data.allMdx.nodes
}

async function getAllAdvisor(graphql) {
  const result = await graphql(
    `
      {
        allMdx(
          filter: { frontmatter: { type: { eq: "advisor" } } }
          sort: { fields: [frontmatter___date], order: ASC }
        ) {
          nodes {
            id
            frontmatter {
              type
              designer
              publisher
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
  )

  return result.data.allMdx.nodes
}

async function getAllFunding(graphql) {
  const result = await graphql(
    `
      {
        allMdx(
          filter: { frontmatter: { type: { eq: "funding" } } }
          sort: { fields: [frontmatter___date], order: ASC }
        ) {
          nodes {
            id
            frontmatter {
              type
            }
            fields {
              slug
            }
          }
        }
      }
    `
  )

  return result.data.allMdx.nodes
}

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions
  const reviewPosts = await getAllReviews(graphql)
  const advisorPosts = await getAllAdvisor(graphql)
  const fundingPosts = await getAllFunding(graphql)

  reviewPosts.forEach((post, index) => {
    // TODO same mechaniism
    let readMoreIds = []
    while (readMoreIds.length < 3) {
      let r = "" + Math.floor(Math.random() * reviewPosts.length)
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
        readMoreIds: readMoreIds.map(x => reviewPosts[x].id),
      },
    })
  })

  advisorPosts.forEach((post, index) => {
    let readMoreIds = []
    while (readMoreIds.length < 3) {
      let r = "" + Math.floor(Math.random() * reviewPosts.length)
      if (readMoreIds.indexOf(r) === -1 && r !== "" + index) {
        readMoreIds.push(r)
      }
    }

    reporter.info(`Creating page: ${post.fields.slug}`)
    createPage({
      path: post.fields.slug,
      component: path.resolve(`./src/templates/AdvisorPost.tsx`),
      context: {
        id: post.id,
        readMoreIds: readMoreIds.map(x => reviewPosts[x].id),
      },
    })
  })

  fundingPosts.forEach((post, index) => {
    let readMoreIds = []
    while (readMoreIds.length < 3) {
      let r = "" + Math.floor(Math.random() * reviewPosts.length)
      if (readMoreIds.indexOf(r) === -1 && r !== "" + index) {
        readMoreIds.push(r)
      }
    }

    reporter.info(`Creating page: ${post.fields.slug}`)
    createPage({
      path: post.fields.slug,
      component: path.resolve(`./src/templates/FundingPost.tsx`),
      context: {
        id: post.id,
        readMoreIds: readMoreIds.map(x => reviewPosts[x].id),
      },
    })
  })

  const blogPostPerPage = 10,
    blogNumPages = Math.ceil(
      (reviewPosts.length + advisorPosts.length + fundingPosts.length) /
        blogPostPerPage
    )

  Array.from({ length: blogNumPages }).forEach((_, i) => {
    reporter.info(`Creating page: blog/${i + 1}`)
    createPage({
      path: i === 0 ? `/blog` : `/blog/${i + 1}`,
      component: path.resolve("./src/templates/BlogPostList.jsx"),
      context: {
        title: "Articoli",
        types: ["review", "advisor", "funding"],
        basePath: "blog",
        limit: blogPostPerPage,
        skip: i * blogPostPerPage,
        blogNumPages,
        currentPage: i + 1,
      },
    })
  })

  // const reviewsNumPages = Math.ceil(reviewPosts.length / blogPostPerPage)

  // Array.from({ length: reviewsNumPages }).forEach((_, i) => {
  //   reporter.info(`Creating page: reviews/${i + 1}`)
  //   createPage({
  //     path: i === 0 ? `/reviews` : `/reviews/${i + 1}`,
  //     component: path.resolve("./src/templates/BlogPostList.jsx"),
  //     context: {
  //       title: "Recensioni",
  //       types: ["review"],
  //       basePath: "reviews",
  //       limit: blogPostPerPage,
  //       skip: i * blogPostPerPage,
  //       reviewsNumPages,
  //       currentPage: i + 1,
  //     },
  //   })
  // })

  let mechanismsCounter = {}
  let designersCounter = {}
  let publishersCounter = {}

  reviewPosts.forEach(node => {
    node.frontmatter.designer.forEach(m => {
      designersCounter[m] = (designersCounter[m] ?? 0) + 1
    })
    node.frontmatter.publisher.forEach(m => {
      publishersCounter[m] = (publishersCounter[m] ?? 0) + 1
    })
    node.frontmatter.mechanisms.forEach(m => {
      mechanismsCounter[m] = (mechanismsCounter[m] ?? 0) + 1
    })
  })

  const dedupedDesigners = [...Object.keys(designersCounter)].sort()
  const sortedDesigners = Object.keys(designersCounter).sort(
    (a, b) => designersCounter[b] - designersCounter[a]
  )

  const dedupedPublishers = [...Object.keys(publishersCounter)].sort()
  const sortedPublishers = Object.keys(publishersCounter).sort(
    (a, b) => publishersCounter[b] - publishersCounter[a]
  )

  const dedupedMechanisms = [...Object.keys(mechanismsCounter)].sort()
  const sortedMechanisms = Object.keys(mechanismsCounter).sort(
    (a, b) => mechanismsCounter[b] - mechanismsCounter[a]
  )

  createPage({
    path: `editor`,
    component: require.resolve("./src/templates/Editor.jsx"),
    context: {
      mechanisms: dedupedMechanisms,
      // TODO
    },
  })

  createPage({
    path: `designers`,
    component: require.resolve("./src/templates/DesignerList.jsx"),
    context: {
      designers: dedupedDesigners.map(name => ({
        name,
        path: getDesignerPath(name),
      })),
    },
  })

  dedupedDesigners.forEach(designer => {
    reporter.info(`Creating page: ${getDesignerPath(designer)}`)
    createPage({
      path: getDesignerPath(designer),
      component: require.resolve("./src/templates/Designer.jsx"),
      context: {
        designer,
        ids: reviewPosts
          .filter(node => {
            return node.frontmatter.designer.includes(designer)
          })
          .map(node => node.id),
      },
    })
  })

  createPage({
    path: `publishers`,
    component: require.resolve("./src/templates/PublisherList.jsx"),
    context: {
      publishers: dedupedPublishers.map(name => ({
        name,
        path: getPublisherPath(name),
      })),
    },
  })

  dedupedPublishers.forEach(publisher => {
    reporter.info(`Creating page: ${getPublisherPath(publisher)}`)
    createPage({
      path: getPublisherPath(publisher),
      component: require.resolve("./src/templates/Publisher.jsx"),
      context: {
        publisher,
        ids: reviewPosts
          .filter(node => {
            return node.frontmatter.publisher.includes(publisher)
          })
          .map(node => node.id),
      },
    })
  })

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
        ids: reviewPosts
          .filter(node => {
            return node.frontmatter.mechanisms.includes(mechanism)
          })
          .map(node => node.id),
      },
    })
  })

  let dedupedWriters = new Set()
  reviewPosts.forEach(node => {
    dedupedWriters.add(node.frontmatter.writer)
  })

  dedupedWriters.forEach(writer => {
    reporter.info(`Creating page: ${getWriterPath(writer)}`)
    createPage({
      path: getWriterPath(writer),
      component: require.resolve("./src/templates/Writer.jsx"),
      context: {
        writer,
        ids: reviewPosts
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
      mechanisms: sortedMechanisms.slice(0, 10),
    },
  })

  createPage({
    path: "/giochi-in-sconto",
    component: require.resolve("./src/templates/discounts.jsx"),
  })

  createPage({
    path: "/trova-sconti",
    component: require.resolve("./src/templates/discounts.jsx"),
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
      youtube_url: String
      facebook_url: String
      tiktok_url: String
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
      type: String
      date: Date @dateformat
      writer: String
      title: String
      description: String
      designer: [String]
      publisher: [String]
      score: Int
      mechanisms: [String]
      weight: Float
      player_count: Int
      player_count_official: String
      playing_time: String
      playing_time_official: String
      sidebar_votes: [SidebarVotes]
      seelves: [Sleeve]
      dungeondice_url: String
      magicmerchant_url: String
      getyourfun_url: String
      fantasia_url: String
      blasone_url: String
      mse_url: String
      pandoragames_url: String
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
