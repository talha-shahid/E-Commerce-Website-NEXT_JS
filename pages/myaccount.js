import React from 'react'
import {useEffect} from 'react'
import {useRouter} from 'next/router'

const MyAccount = () => {
    const router = useRouter()

    useEffect(() => {
      if(localStorage.getItem('token')){
        router.push('/')
      }
    }, [router.query])
}

export default MyAccount