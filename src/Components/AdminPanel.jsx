import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminPanel.css';

const AdminPanel = () => {
  const [orders, setOrders] = useState([]);
  const [runningCosts, setRunningCosts] = useState([]);
  const [load, setLoad] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
  setLoad(true); // Ensure loading is true when refresh is clicked
  setError('');   // Clear previous errors
  
  try {
    // Run both requests in parallel for better performance
    const [ordersRes, costsRes] = await Promise.all([
      axios.get('https://managmentbackend-production.up.railway.app/api/order'),
      axios.get('https://managmentbackend-production.up.railway.app/api/running-costs')
    ]);

    setOrders(ordersRes.data.orders);
    setRunningCosts(costsRes.data.runningCost);
  } catch (err) {
    console.error('Error fetching data:', err);
    setError('Failed to fetch data. Please check your backend server.');
  } finally {
    setLoad(false); // This will ALWAYS run, stopping the white screen
  }
};

    const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const groupByDate = (items) => {
    const grouped = {};
    items.forEach(item => {
      const dateKey = formatDate(item.createdAt || item.date);
      if (!grouped[dateKey]) {
        grouped[dateKey] = [];
      }
      grouped[dateKey].push(item);
    });
    return grouped;
  };

  const getAllDates = () => {
    const allDates = new Set();
    orders.forEach(order => {
      allDates.add(formatDate(order.createdAt || order.date));
    });
    runningCosts.forEach(cost => {
      allDates.add(formatDate(cost.createdAt || cost.date));
    });
    return Array.from(allDates).sort((a, b) => new Date(b) - new Date(a));
  };

  // Calculate sums for a specific date
  const calculateDaySums = (date) => {
    const dayOrders = ordersByDate[date] || [];
    
    const totalOrdersPrice = dayOrders.reduce((sum, order) => sum + (order.ordersPrice || 0), 0);
    const totalMakingPrice = dayOrders.reduce((sum, order) => sum + (order.ordersMakingPrice || 0), 0);
    const totalProfit = dayOrders.reduce((sum, order) => sum + (order.profite || 0), 0);
    const totalRunningCosts = (costsByDate[date] || []).reduce((sum, cost) => sum + (cost.price || 0), 0);
    
    // Net profit = Total profit - Running costs
    const netProfit = totalProfit - totalRunningCosts;
    
    return {
      totalOrdersPrice,
      totalMakingPrice,
      totalProfit,
      totalRunningCosts,
      netProfit
    };
  };

  const ordersByDate = groupByDate(orders);
  const costsByDate = groupByDate(runningCosts);
  const allDates = getAllDates();

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (load) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="admin-panel">
      <h2>Admin Dashboard</h2>

      <div className="timeline-view">
        {allDates.length === 0 ? (
          <p className="no-data">No data found</p>
        ) : (
          allDates.map(date => {
            const sums = calculateDaySums(date);
            
            return (
              <div key={date} className="date-group">
                <div className="date-header">
                  <h3>{date}</h3>
                </div>
                
                <div className="date-content">
                  {/* Orders for this date */}
                  {costsByDate[date] && costsByDate[date].length > 0 && (
                    <div className="subsection costs-subsection">
                      <div className="subsection-header">
                        <h4>Running Costs</h4>
                        <span className="count">{costsByDate[date].length} items</span>
                      </div>
                      <div className="items-list">
                        {costsByDate[date].map((cost, index) => (
                          <div key={cost.id || `cost-${index}`} className="item-card cost-card">
                            <div className="item-header">
                              <strong className="item-title">{cost.name}</strong>
                              <span className="item-date">{formatDateTime(cost.createdAt || cost.date)}</span>
                            </div>
                            <div className="item-details">
                              <span>Price: {cost.price.toFixed(2)} Birr</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Orders for this date */}
                  {ordersByDate[date] && ordersByDate[date].length > 0 && (
                    <div className="subsection orders-subsection">
                      <div className="subsection-header">
                        <h4>Orders</h4>
                        <span className="count">{ordersByDate[date].length} items</span>
                      </div>
                      <div className="items-list">
                        {ordersByDate[date].map((order, index) => (
                          <div key={order.id || `order-${index}`} className="item-card order-card">
                            <div className="item-header">
                              <strong className="item-title">{order.ordersName}</strong>
                              <span className="item-date">{formatDateTime(order.createdAt || order.date)}</span>
                            </div>
                            <div className="item-details">
                              <span>Quantity: {order.quantity || 1}</span>
                              <span>Price: {(order.ordersPrice || 0).toFixed(2)} Birr</span>
                              <span>Making price: {(order.ordersMakingPrice || 0).toFixed(2)} Birr</span>
                              <span>Profit: {(order.profite || 0).toFixed(2)} Birr</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Daily Summary Section */}
                {(ordersByDate[date]?.length > 0 || costsByDate[date]?.length > 0) && (
                  <div className="daily-summary">
                    <h4>Daily Summary</h4>
                    <div className="summary-grid">
                      <div className="summary-item">
                        <span className="summary-label">Total Orders Revenue:</span>
                        <span className="summary-value">{sums.totalOrdersPrice.toFixed(2)} Birr</span>
                      </div>
                      <div className="summary-item">
                        <span className="summary-label">Total Making Cost:</span>
                        <span className="summary-value">{sums.totalMakingPrice.toFixed(2)} Birr</span>
                      </div>
                      <div className="summary-item">
                        <span className="summary-label">Total Gross Profit:</span>
                        <span className="summary-value profit">{sums.totalProfit.toFixed(2)} Birr</span>
                      </div>
                      {sums.totalRunningCosts > 0 && (
                        <div className="summary-item">
                          <span className="summary-label">Total Running Costs:</span>
                          <span className="summary-value cost">{sums.totalRunningCosts.toFixed(2)} Birr</span>
                        </div>
                      )}
                      <div className="summary-item total">
                        <span className="summary-label">Net Profit:</span>
                        <span className={`summary-value ${sums.netProfit >= 0 ? 'net-profit' : 'net-loss'}`}>
                          {sums.netProfit.toFixed(2)} Birr
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
      
      <button onClick={fetchData} className="refresh-btn">
        Refresh Data
      </button>
    </div>
  );
};

export default AdminPanel;
