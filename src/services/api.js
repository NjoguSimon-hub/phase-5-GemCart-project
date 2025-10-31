const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000'

export const fetchProducts = async () => {
  try {
    const response = await fetch(`${API_URL}/products`)
    if (!response.ok) throw new Error('Failed to fetch')
    const data = await response.json()
    return data.products || data || []
  } catch (error) {
    console.error('Error fetching products:', error)
    // Return sample data if backend is not available
    return [
      { id: 1, name: "Diamond Ring", description: "Beautiful diamond ring", price: 299, image_url: null },
      { id: 2, name: "Gold Necklace", description: "Elegant gold necklace", price: 199, image_url: null },
      { id: 3, name: "Silver Watch", description: "Luxury silver watch", price: 399, image_url: null },
      { id: 4, name: "Pearl Bracelet", description: "Classic pearl bracelet", price: 149, image_url: null }
    ]
  }
}

export const fetchCategories = async () => {
  try {
    const response = await fetch(`${API_URL}/categories`)
    return await response.json()
  } catch (error) {
    console.error('Error fetching categories:', error)
    return []
  }
}