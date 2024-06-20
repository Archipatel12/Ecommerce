import React from 'react'
import Hero from '../Componenets/Hero/Hero'
import Popular from '../Componenets/popular/Popular'
import Offers from '../Componenets/Offfers/Offers'
import Newcollections from '../Componenets/Newcollections/Newcollections'
import Newslatters from '../Componenets/Newslatters/Newslatters'

const Shop = () => {
  return (
    <div>
      <Hero/>
      <Popular/>
      <Offers/>
      <Newcollections/>
      <Newslatters/>
    </div>
  )
}

export default Shop
