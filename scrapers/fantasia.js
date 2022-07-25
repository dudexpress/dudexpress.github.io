const fetch = require("node-fetch")
const cheerio = require("cheerio")

const fetchFantasiaDiscountItems = async () => {
  const items = [],
    foundTitles = new Set()

  let shouldReturn = false,
    page = 0

  while (true) {
    page++
    const response = await fetch(
      `https://fantasiastore.it/it/527-Outlet?categoria=giochi-in-scatola&page=${page}`
    )

    const html = await response.text()
    const $ = cheerio.load(html)

    $(".js-product-miniature-wrapper").each((_idx, el) => {
      const title = $("h3.product-title a", el).text()
      if (foundTitles.has(title)) {
        shouldReturn = true
        return false
      }

      const link = $("h3.product-title a", el).attr("href") + "?aff=47"
      const image = $(".product-thumbnail-first", el).attr("data-src")
      const discount = $(".badge-discount", el).text()

      foundTitles.add(title)
      items.push({ title, link, image, discount })
    })

    if (shouldReturn) {
      return items
    }
  }
}

module.exports = fetchFantasiaDiscountItems

// fetchFantasiaDiscountItems().then(items => console.log(items))
