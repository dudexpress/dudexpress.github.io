const fetch = require("node-fetch")
const cheerio = require("cheerio")

const fetchGetYourFunDiscountItems = async () => {
  const items = [],
    foundTitles = new Set()

  let shouldReturn = false,
    page = 0

  while (true) {
    page++
    const response = await fetch(
      `https://www.getyourfun.it/s/23/giochi-da-tavolo-in-super-offerta?order=product.date_upd.desc&page=${page}`
    )

    const html = await response.text()
    const $ = cheerio.load(html)

    $(".product_list_item").each((_idx, el) => {
      const title = $("h3.s_title_block a", el).text()
      if (foundTitles.has(title)) {
        shouldReturn = true
        return false
      }

      const link = $("h3.s_title_block a", el).attr("href") + "?ref=7020"
      const image = $(".tm_gallery_item", el).attr("src")
      const discount = $(".st_reduce", el).text()

      foundTitles.add(title)
      items.push({ title, link, image, discount })
    })

    if (shouldReturn) {
      return items
    }
  }
}

module.exports = fetchGetYourFunDiscountItems

// fetchGetYourFunDiscountItems().then(items => console.log(items))
