import React from "react"
import Stores from "./Stores"

export const DefaultStores = () => {
  return (
    <Stores
      label="Acquista i giochi su..."
      dungeondice_url="https://www.dungeondice.it/"
      magicmerchant_url="https://magicmerchant.it/"
      getyourfun_url="https://www.getyourfun.it/"
      fantasia_url="https://fantasiastore.it/"
      blasone_url="https://www.blasoneshop.it/"
      lsgiochi_url="https://www.lsgiochi.it/"
      mse_url="https://www.msedizioni.it/"
      weega_url="https://weega.it/"
      linkToSpecificGame={false}
    />
  )
}
