import React from 'react'
import Link from 'next/link'

import { urlFor } from '@/lib/client'
import Image from 'next/image'

const Product = ({ product: { image, name, slug, price } }) => {
  return (
    <div>
      <Link href={`/product/${slug.current}`}>
        <div className="product-card">
          <Image src={urlFor(image && image[0])} width={250} height={250} className='product-image' alt="product-image" />
          <p className="product-name">{name}</p>
          <p className="product-price">${price}</p> 
          {/* $ dollar sign above is used for declaring currency not variable */}
        </div>
      </Link>
    </div>
  )
}

export default Product