import React, { useState } from 'react';
import axios from 'axios';
import './MainSection.css';

const MainSection = () => {
  const [formData, setFormData] = useState({
    orderType: '',
    quantity: 0
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'quantity' ? parseFloat(value) : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await axios.post('http://localhost:5000/api/orders', formData);
      setMessage('Order submitted successfully!');
      setFormData({ orderType: '', quantity: 0 });
      console.log('Response:', response.data);
    } catch (error) {
      setMessage('Error submitting order. Please try again.');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main-section">
      <h2>Place Order</h2>
      <form onSubmit={handleSubmit} className="order-form">
        <div className="form-group">
          <label htmlFor="orderType">Order Type:</label>
          <select
            id="orderType"
            name="orderType"
            value={formData.orderType}
            onChange={handleInputChange}
            required
          >
            <option value="">Select order type</option>
             <optgroup label="Fata Normal">
                    <option value="Fata Normal2">Fata Normal ms 2</option>
                    <option value="Fata Normal3">Fata Normal ms 3</option>
                    <option value="Fata Normal4">Fata Normal ms 4</option>
                    <option value="Fata Normal5">Fata Normal ms 5</option>
                    <option value="Fata Normal6">Fata Normal ms 6</option>
                    <option value="Fata Normal7">Fata Normal ms 7</option>
                    <option value="Fata Normal8">Fata Normal ms 8</option>
                    <option value="Fata Normal9">Fata Normal ms 9</option>
                    <option value="Fata Normal10">Fata Normal ms 10</option>
                  </optgroup>
                  <optgroup label="Fata Special">
                    <option value="Fata Special2">Fata Special ms 2</option>
                    <option value="Fata Special3">Fata Special ms 3</option>
                    <option value="Fata Special4">Fata Special ms 4</option>
                    <option value="Fata Special5">Fata Special ms 5</option>
                    <option value="Fata Special6">Fata Special ms 6</option>
                    <option value="Fata Special7">Fata Special ms 7</option>
                    <option value="Fata Special8">Fata Special ms 8</option>
                    <option value="Fata Special9">Fata Special ms 9</option>
                    <option value="Fata Special10">Fata Special ms 10</option>
                  </optgroup>
                  <optgroup label="Toast">
                    <option value="Normal Toast">Normal Toast</option>
                    <option value="Special Toast">Special Toast</option>
                    <option value="Egg Sandwich">Egg Sandwich</option>
                  </optgroup>
                  <optgroup label="Ful">
                    <option value="Normal Ful">Normal Ful</option>
                    <option value="Special Ful">Special Ful</option>
                  </optgroup>
                  <optgroup label="water">
                    <option value="One litre">One litre</option>
                    <option value="Two litre">Two litre</option>
                    <option value="Half litre">Half litre</option>
                  </optgroup>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="quantity">Price:</label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={formData.quantity}
            onChange={handleInputChange}
            min="1"
            required
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit Order'}
        </button>
        
        {message && <div className="message">{message}</div>}
      </form>
    </div>
  );
};

export default MainSection;
