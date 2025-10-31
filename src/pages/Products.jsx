import React, { useState, useEffect } from 'react'
import { fetchProducts } from '../services/api'

const Products = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadProducts = async () => {
      const data = await fetchProducts()
      setProducts(data)
      setLoading(false)
    }
    loadProducts()
  }, [])

  if (loading) {
    return (
      <div style={{padding: '40px', textAlign: 'center'}}>
        <h2>Loading products...</h2>
      </div>
    )
  }

  return (
    <div style={{padding: '40px'}}>
      <h1 style={{fontSize: '36px', color: '#2563eb', textAlign: 'center', marginBottom: '40px'}}>
        Our Products
      </h1>
      {products.length === 0 ? (
        <div style={{textAlign: 'center', padding: '40px'}}>
          <p>No products available. Make sure the backend is running.</p>
        </div>
      ) : (
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px'}}>
          {products.map(product => (
          <div key={product.id} style={{
            backgroundColor: 'white',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            padding: '20px',
            textAlign: 'center',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
          }}>
            {product.image_url ? (
              <img src={product.image_url} alt={product.name} style={{width: '100%', height: '200px', objectFit: 'cover', borderRadius: '4px', marginBottom: '15px'}} />
            ) : (
              <div style={{width: '100%', height: '200px', backgroundColor: '#f3f4f6', borderRadius: '4px', marginBottom: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '48px'}}>
                💎
              </div>
            )}
            <h3 style={{fontSize: '20px', fontWeight: 'bold', marginBottom: '10px'}}>{product.name}</h3>
            <p style={{color: '#6b7280', marginBottom: '10px'}}>{product.description}</p>
            <p style={{color: '#2563eb', fontWeight: 'bold', fontSize: '18px', marginBottom: '15px'}}>${product.price}</p>
            <button style={{
              backgroundColor: '#3b82f6',
              color: 'white',
              padding: '10px 20px',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '14px'
            }}>
              Add to Cart
            </button>
          </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Products