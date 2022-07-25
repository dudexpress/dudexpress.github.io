const fetch = require("node-fetch")
const cheerio = require("cheerio")

const fetchDungeonDiceDiscountItems = async () => {
  const items = [],
    foundTitles = new Set()

  let shouldReturn = false,
    page = 0

  while (true) {
    page++
    const response = await fetch(
      `https://www.dungeondice.it/366-offerte-a-tempo?disponibile-24h=1&page=${page}`
    )

    const html = await response.text()
    const $ = cheerio.load(html)

    $(".e-list-products article.e-list-product").each((_idx, el) => {
      const title = $("h3", el).text()
      if (foundTitles.has(title)) {
        shouldReturn = true
        return false
      }

      const link = $("a", el).attr("href") + "?dda=9A5FB278F"
      const image = $("img", el).attr("src")
      const discount = $(".discount-percentage", el)
        .text()
        .replace("(", "")
        .replace(")", "")

      foundTitles.add(title)
      items.push({ title, link, image, discount })
    })

    if (shouldReturn) {
      return items
    }
  }
}

module.exports = fetchDungeonDiceDiscountItems

// fetchDungeonDiceDiscountItems().then(items => console.log(items))
