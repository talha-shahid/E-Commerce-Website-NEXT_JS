import React from 'react'
import {useRouter} from 'next/router' 

//localhost:3000/product/dfgdfgfgd ==> dfgdfgfgd is {slug}

const Slug = () => {
  const router = useRouter()
  const {slug} = router.query
  return (
    <div>The slug is: {slug}</div>
  )
}

export default Slug