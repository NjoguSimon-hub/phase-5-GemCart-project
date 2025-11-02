import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Checkout() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [orderComplete, setOrderComplete] = useState(false)
  
  const [shippingInfo, setShippingInfo] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    country: 'Kenya'
  })

  const [mpesaPhone, setMpesaPhone] = useState('')

  // Format phone number as user types
  const formatPhoneNumber = (value) => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, '')
    
    // Add +254 prefix if not present
    if (digits.length > 0 && !digits.startsWith('254')) {
      if (digits.startsWith('0')) {
        return '+254' + digits.substring(1)
      } else if (digits.startsWith('7') || digits.startsWith('1')) {
        return '+254' + digits
      }
    } else if (digits.startsWith('254')) {
      return '+' + digits
    }
    
    return value
  }

  const handlePhoneChange = (e) => {
    const formatted = formatPhoneNumber(e.target.value)
    setMpesaPhone(formatted)
  }

  const handleShippingSubmit = (e) => {
    e.preventDefault()
    setStep(2)
  }

  const handleMpesaPayment = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      // Simulate M-Pesa payment API call
      const paymentData = {
        phone: mpesaPhone,
        amount: 1000, // Sample amount
        reference: 'GC' + Date.now()
      }
      
      console.log('Processing payment:', paymentData)
      
      // Simulate payment delay
      await new Promise(resolve => setTimeout(resolve, 3000))
      
      setOrderComplete(true)
      setStep(3)
    } catch (error) {
      alert('Payment failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  // Sample cart data since context is not available
  const sampleCart = {
    items: [
      { id: 1, title: 'Diamond Ring', price: 299, quantity: 1 },
      { id: 2, title: 'Gold Necklace', price: 199, quantity: 1 }
    ]
  }
  const cartTotal = sampleCart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0)

  if (sampleCart.items.length === 0 && !orderComplete) {
    return (
      <div style={{padding: '40px', textAlign: 'center'}}>
        <div style={{maxWidth: '400px', margin: '0 auto', backgroundColor: 'white', padding: '40px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)'}}>
          <div style={{fontSize: '48px', marginBottom: '20px'}}>🛒</div>
          <h2 style={{fontSize: '24px', fontWeight: 'bold', marginBottom: '16px'}}>Your cart is empty</h2>
          <p style={{color: '#6b7280', marginBottom: '24px'}}>Add some beautiful jewelry to get started!</p>
          <button 
            onClick={() => navigate('/products')}
            style={{backgroundColor: '#f59e0b', color: 'black', padding: '12px 24px', borderRadius: '8px', border: 'none', fontWeight: 'bold', cursor: 'pointer'}}
          >
            🛍️ Continue Shopping
          </button>
        </div>
      </div>
    )
  }

  if (orderComplete) {
    return (
      <div style={{padding: '40px', textAlign: 'center'}}>
        <div style={{maxWidth: '400px', margin: '0 auto', backgroundColor: 'white', padding: '40px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)'}}>
          <div style={{fontSize: '48px', marginBottom: '20px'}}>✅</div>
          <h2 style={{fontSize: '24px', fontWeight: 'bold', marginBottom: '16px', color: '#10b981'}}>Payment Successful!</h2>
          <p style={{color: '#6b7280', marginBottom: '24px'}}>Your order has been placed successfully. You will receive a confirmation SMS shortly.</p>
          <button 
            onClick={() => navigate('/products')}
            style={{backgroundColor: '#10b981', color: 'white', padding: '12px 24px', borderRadius: '8px', border: 'none', fontWeight: 'bold', cursor: 'pointer'}}
          >
            🛍️ Continue Shopping
          </button>
        </div>
      </div>
    )
  }

  return (
    <div style={{padding: '40px'}}>
      <h1 style={{fontSize: '32px', fontWeight: 'bold', marginBottom: '32px'}}>🔒 Secure Checkout</h1>
      
      <div style={{display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '32px'}}>
        <div>
          {step === 1 && (
            <div style={{backgroundColor: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)'}}>
              <h2 style={{fontSize: '24px', fontWeight: 'bold', marginBottom: '24px'}}>📦 Shipping Information</h2>
              <form onSubmit={handleShippingSubmit} style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
                <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px'}}>
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={shippingInfo.fullName}
                    onChange={(e) => setShippingInfo({...shippingInfo, fullName: e.target.value})}
                    style={{padding: '12px', border: '1px solid #d1d5db', borderRadius: '8px'}}
                    required
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={shippingInfo.email}
                    onChange={(e) => setShippingInfo({...shippingInfo, email: e.target.value})}
                    style={{padding: '12px', border: '1px solid #d1d5db', borderRadius: '8px'}}
                    required
                  />
                </div>
                <input
                  type="tel"
                  placeholder="Phone Number (+254XXXXXXXXX)"
                  value={shippingInfo.phone}
                  onChange={(e) => setShippingInfo({...shippingInfo, phone: formatPhoneNumber(e.target.value)})}
                  style={{padding: '12px', border: '1px solid #d1d5db', borderRadius: '8px'}}
                  required
                />
                <input
                  type="text"
                  placeholder="Address"
                  value={shippingInfo.address}
                  onChange={(e) => setShippingInfo({...shippingInfo, address: e.target.value})}
                  style={{padding: '12px', border: '1px solid #d1d5db', borderRadius: '8px'}}
                  required
                />
                <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px'}}>
                  <input
                    type="text"
                    placeholder="City"
                    value={shippingInfo.city}
                    onChange={(e) => setShippingInfo({...shippingInfo, city: e.target.value})}
                    style={{padding: '12px', border: '1px solid #d1d5db', borderRadius: '8px'}}
                    required
                  />
                  <select
                    value={shippingInfo.country}
                    onChange={(e) => setShippingInfo({...shippingInfo, country: e.target.value})}
                    style={{padding: '12px', border: '1px solid #d1d5db', borderRadius: '8px'}}
                  >
                    <option value="Kenya">Kenya</option>
                    <option value="Uganda">Uganda</option>
                    <option value="Tanzania">Tanzania</option>
                  </select>
                </div>
                <button
                  type="submit"
                  style={{backgroundColor: '#0d9488', color: 'white', padding: '12px', borderRadius: '8px', border: 'none', fontWeight: 'bold', cursor: 'pointer'}}
                >
                  Continue to Payment →
                </button>
              </form>
            </div>
          )}

          {step === 2 && (
            <div style={{backgroundColor: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)'}}>
              <h2 style={{fontSize: '24px', fontWeight: 'bold', marginBottom: '24px'}}>📱 M-Pesa Payment</h2>
              <div style={{backgroundColor: '#dcfce7', padding: '16px', borderRadius: '8px', marginBottom: '24px'}}>
                <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px'}}>
                  <div style={{width: '32px', height: '32px', backgroundColor: '#16a34a', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold'}}>M</div>
                  <span style={{fontWeight: 'bold', color: '#166534'}}>M-Pesa Secure Payment</span>
                </div>
                <p style={{fontSize: '14px', color: '#15803d'}}>Pay securely with your M-Pesa mobile money account</p>
              </div>
              
              <form onSubmit={handleMpesaPayment} style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
                <div>
                  <label style={{display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '8px'}}>M-Pesa Phone Number</label>
                  <input
                    type="tel"
                    placeholder="+254XXXXXXXXX"
                    value={mpesaPhone}
                    onChange={handlePhoneChange}
                    style={{width: '100%', padding: '12px', border: '1px solid #d1d5db', borderRadius: '8px'}}
                    required
                  />
                  <p style={{fontSize: '12px', color: '#6b7280', marginTop: '4px'}}>Enter your M-Pesa registered phone number (format: +254XXXXXXXXX)</p>
                </div>
                
                <div style={{backgroundColor: '#f9fafb', padding: '16px', borderRadius: '8px'}}>
                  <h3 style={{fontWeight: 'bold', marginBottom: '8px'}}>Payment Instructions:</h3>
                  <ol style={{fontSize: '14px', color: '#6b7280', paddingLeft: '16px'}}>
                    <li>Click "Pay with M-Pesa" below</li>
                    <li>You'll receive an M-Pesa prompt on your phone</li>
                    <li>Enter your M-Pesa PIN to complete payment</li>
                    <li>You'll receive a confirmation SMS</li>
                  </ol>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    backgroundColor: loading ? '#9ca3af' : '#16a34a',
                    color: 'white',
                    padding: '12px',
                    borderRadius: '8px',
                    border: 'none',
                    fontWeight: 'bold',
                    cursor: loading ? 'not-allowed' : 'pointer'
                  }}
                >
                  {loading ? '⏳ Processing Payment...' : `📱 Pay KSH ${(cartTotal * 110).toFixed(0)} with M-Pesa`}
                </button>
              </form>
              
              <button
                onClick={() => setStep(1)}
                style={{width: '100%', marginTop: '16px', color: '#6b7280', backgroundColor: 'transparent', border: 'none', cursor: 'pointer'}}
              >
                ← Back to Shipping
              </button>
            </div>
          )}
        </div>
        
        <div style={{backgroundColor: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', height: 'fit-content'}}>
          <h3 style={{fontSize: '20px', fontWeight: 'bold', marginBottom: '16px'}}>📋 Order Summary</h3>
          <div style={{marginBottom: '16px'}}>
            {sampleCart.items.map(item => (
              <div key={item.id} style={{display: 'flex', justifyContent: 'space-between', fontSize: '14px', marginBottom: '8px'}}>
                <span>{item.title} x{item.quantity}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div style={{borderTop: '1px solid #e5e7eb', paddingTop: '16px'}}>
            <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '8px'}}>
              <span>Subtotal:</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
            <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '8px'}}>
              <span>Shipping:</span>
              <span style={{color: '#10b981'}}>FREE</span>
            </div>
            <div style={{display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '18px', marginBottom: '8px'}}>
              <span>Total (USD):</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
            <div style={{display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '18px', color: '#10b981'}}>
              <span>Total (KSH):</span>
              <span>KSH {(cartTotal * 110).toFixed(0)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout