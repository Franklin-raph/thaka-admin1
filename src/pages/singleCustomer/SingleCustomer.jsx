import React from 'react'
import { useParams } from 'react-router-dom'

const SingleCustomer = () => {
    
    const { id } = useParams()

  return (
    <div>SingleCustomer</div>
  )
}

export default SingleCustomer