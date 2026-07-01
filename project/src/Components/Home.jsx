import React from 'react'
import useFetch from "./CustomHook/useFetch";

const Home = () => {
let {products} = useFetch("http://localhost:5000/product")
  return (
    <div>
      <h2>Total Product - {products.length}</h2>
    </div>
  )
}

export default Home