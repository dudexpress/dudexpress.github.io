const fetch = require("node-fetch")
const cheerio = require("cheerio")

const fetchWeegaDiscountItems = async () => {
  const items = []
  const response = await fetch(`https://www.weega.it/`)

  const html = await response.text()
  const $ = cheerio.load(html)

  $("#sales .card-ga").each((_idx, el) => {
    const title = $(".content .color-blue", el).text()
    const link = $("a", el).attr("href") + "?partners=Dudexpress"
    const image = $(".image", el)
      .attr("style")
      .replace("background-image: url(", "")
      .replace(")", "")
    const discount = $(".discount_percent", el).text().trim()

    items.push({ title, link, image, discount })
  })

  return items
}

module.exports = fetchWeegaDiscountItems

// fetchWeegaDiscountItems().then(items => console.log(items))
