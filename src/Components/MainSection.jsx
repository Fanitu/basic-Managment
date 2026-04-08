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
      const response = await axios.post('https://managmentbackend-production.up.railway.app/api/order', formData);
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
                    <option value="Fata_Normal_ms2">Fata Normal ms 2</option>
                    <option value="Fata_Normal_ms3">Fata Normal ms 3</option>
                    <option value="Fata_Normal_ms4">Fata Normal ms 4</option>
                    <option value="Fata_Normal_ms5">Fata Normal ms 5</option>
                    <option value="Fata_Normal_ms6">Fata Normal ms 6</option>
                    <option value="Fata_Normal_ms7">Fata Normal ms 7</option>
                    <option value="Fata_Normal_ms8">Fata Normal ms 8</option>
                    <option value="Fata_Normal_ms9">Fata Normal ms 9</option>
                    <option value="Fata_Normal_ms10">Fata Normal ms 10</option>
                    <option value="Fata_Normal_ms11">Fata Normal ms 11</option>
                    <option value="Fata_Normal_ms12">Fata Normal ms 12</option>
                    <option value="Fata_Normal_ms13">Fata Normal ms 13</option>
                    <option value="Fata_Normal_ms14">Fata Normal ms 14</option>
                    <option value="Fata_Normal_ms15">Fata Normal ms 15</option>
                  </optgroup>
                  <optgroup label="Fata Special">
                    <option value="Fata_Special_ms2">Fata Special ms 2</option>
                    <option value="Fata_Special_ms3">Fata Special ms 3</option>
                    <option value="Fata_Special_ms4">Fata Special ms 4</option>
                    <option value="Fata_Special_ms5">Fata Special ms 5</option>
                    <option value="Fata_Special_ms6">Fata Special ms 6</option>
                    <option value="Fata_Special_ms7">Fata Special ms 7</option>
                    <option value="Fata_Special_ms8">Fata Special ms 8</option>
                    <option value="Fata_Special_ms9">Fata Special ms 9</option>
                    <option value="Fata_Special_ms10">Fata Special ms 10</option>
                    <option value="Fata_Special_ms11">Fata Special ms 11</option>
                    <option value="Fata_Special_ms12">Fata Special ms 12</option>
                    <option value="Fata_Special_ms13">Fata Special ms 13</option>
                    <option value="Fata_Special_ms14">Fata Special ms 14</option>
                    <option value="Fata_Special_ms15">Fata Special ms 15</option>
                  </optgroup>
                  <optgroup label="Toast">
                    <option value="Normal_Toast">Normal Toast</option>
                    <option value="Special_Toast">Special Toast</option>
                    <option value="Egg_Sandwich">Egg Sandwich</option>
                  </optgroup>
                  <optgroup label="Ful">
                    <option value="Normal_Ful">Normal Ful</option>
                    <option value="Special_Ful">Special Ful</option>
                  </optgroup>
                  <optgroup label="water">
                    <option value="One_litre">One litre</option>
                    <option value="Two_litre">Two litre</option>
                    <option value="Half_litre">Half litre</option>
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
