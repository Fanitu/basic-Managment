import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminPanel.css';

const AdminPanel = () => {
  const [orders, setOrders] = useState([]);
  const [runningCosts, setRunningCosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/order')
      console.log(response)
      
      setOrders(response.orders);
      setRunningCosts(response.count);
      setError('');
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to fetch data. Please check your backend server.');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="admin-panel">
      <h2>Admin Dashboard</h2>
      
      <div className="dashboard-grid">
        {/* Orders Section */}
        <div className="section orders-section">
          <div className="section-header">
            <h3>Orders</h3>
            <span className="count">{orders.length} total</span>
          </div>
          
          {orders.length === 0 ? (
            <p className="no-data">No orders found</p>
          ) : (
            <div className="items-list">
              {orders.map((order, index) => (
                <div key={order.id || index} className="item-card">
                  <div className="item-header">
                    <strong className="item-title">{order.orderType}</strong>
                    <span className="item-date bold">{formatDate(order.createdAt || order.date)}</span>
                  </div>
                  <div className="item-details">
                    <span>Quantity: {order.quantity}</span>
                    <span>Total: ${(order.quantity * (order.price || 0)).toFixed(2)}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Running Costs Section */}
        <div className="section costs-section">
          <div className="section-header">
            <h3>Running Costs</h3>
            <span className="count">{runningCosts.length} total</span>
          </div>
          
          {runningCosts.length === 0 ? (
            <p className="no-data">No running costs found</p>
          ) : (
            <div className="items-list">
              {runningCosts.map((cost, index) => (
                <div key={cost.id || index} className="item-card cost-card">
                  <div className="item-header">
                    <strong className="item-title">{cost.costName}</strong>
                    <span className="item-date bold">{formatDate(cost.createdAt || cost.date)}</span>
                  </div>
                  <div className="item-details">
                    <span>Amount: ${cost.amount.toFixed(2)}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <button onClick={fetchData} className="refresh-btn">
        Refresh Data
      </button>
    </div>
  );
};

export default AdminPanel;