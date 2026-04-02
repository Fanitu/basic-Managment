import React, { useState } from 'react';
import axios from 'axios';
import './RunningCost.css';

const RunningCost = () => {
  const [costData, setCostData] = useState({
    costName: '',
    amount: 0
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setmessageType] = useState('');

  const showMessage = (text,type) =>{
    setMessage(text)
    setmessageType(type)

    setTimeout(()=>{
        setMessage()
        setmessageType()

    },5000)

  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCostData({
      ...costData,
      [name]: name === 'amount' ? parseFloat(value) : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await axios.post('http://localhost:5000/api/running-costs', costData);
      showMessage('Running cost added successfully!','success');
      setCostData({ costName: '', amount: 0 });
      console.log('Response:', response.data);
    } catch (error) {
      showMessage('Error adding running cost. Please try again.','error');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="running-cost">
      <h2>Add Running Cost</h2>
      <form onSubmit={handleSubmit} className="cost-form">
        {message && <div className={`message${messageType}`}>{message}</div>}
        <div className="form-group">
          <label htmlFor="costName">Cost Name:</label>
          <input
            type="text"
            id="costName"
            name="costName"
            value={costData.costName}
            onChange={handleInputChange}
            placeholder="e.g., Electricity Bill, Rent, etc."
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="amount">Amount:</label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={costData.amount}
            onChange={handleInputChange}
            min="0"
            step="0.01"
            required
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Adding...' : 'Add Running Cost'}
        </button>
      </form>
    </div>
  );
};

export default RunningCost;