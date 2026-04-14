// AdminPanel.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminPanel.css';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('orders'); // 'orders', 'daily', 'weekly', 'monthly'
  const [orders, setOrders] = useState([]);
  const [runningCosts, setRunningCosts] = useState([]);
  const [dailySummaries, setDailySummaries] = useState([]);
  const [weeklySummaries, setWeeklySummaries] = useState([]);
  const [monthlySummaries, setMonthlySummaries] = useState([]);
  const [dailyRunningCosts, setDailyRunningCosts] = useState([]);
  const [weeklyRunningCosts, setWeeklyRunningCosts] = useState([]);
  const [monthlyRunningCosts, setMonthlyRunningCosts] = useState([]);
  const [load, setLoad] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoad(true);
    setError('');
    
    try {
      // Fetch all required data in parallel
      const [
        ordersRes,
        costsRes,
        dailyOrdersRes,
        dailyCostsRes,
        weeklyOrdersRes,
        weeklyCostsRes,
        monthlyOrdersRes,
        monthlyCostsRes,
        dailySummariesRes,
      ] = await Promise.all([
        axios.get('https://managmentbackend-production.up.railway.app/api/order'),
        axios.get('https://managmentbackend-production.up.railway.app/api/running-costs'),
        axios.get('https://managmentbackend-production.up.railway.app/api/order/daily-summaries'),
        axios.get('https://managmentbackend-production.up.railway.app/api/running-costs/daily-summaries'),
        axios.get('https://managmentbackend-production.up.railway.app/api/order/weekly-summaries'),
        axios.get('https://managmentbackend-production.up.railway.app/api/running-costs/weekly-summaries'),
        axios.get('https://managmentbackend-production.up.railway.app/api/order/monthly-summaries'),
        axios.get('https://managmentbackend-production.up.railway.app/api/running-costs/monthly-summaries'),
        axios.get('https://managmentbackend-production.up.railway.app/api/combined')
      ]);

      setOrders(ordersRes.data.orders);
      setRunningCosts(costsRes.data.runningCost);
      setDailySummaries(dailyOrdersRes.data.dailySummaries || []);
      setDailyRunningCosts(dailyCostsRes.data.dailyRunningCostSummaries || []);
      setWeeklySummaries(weeklyOrdersRes.data.weeklySummaries || []);
      setWeeklyRunningCosts(weeklyCostsRes.data.weeklyRunningCostSummaries || []);
      setMonthlySummaries(monthlyOrdersRes.data.monthlySummaries || []);
      setMonthlyRunningCosts(monthlyCostsRes.data.monthlyRunningCostSummaries || []);
      setDailySummaries(dailySummariesRes.data.combinedSummaries || []);

    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Failed to fetch data. Please check your backend server.');
    } finally {
      setLoad(false);
    }
  };

  // Utility functions
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

  const formatWeekRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    return `${start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${end.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
  };

  const getMonthName = (month) => {
    return new Date(2000, month - 1, 1).toLocaleDateString('en-US', { month: 'long' });
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
    orders.forEach(order => allDates.add(formatDate(order.createdAt || order.date)));
    runningCosts.forEach(cost => allDates.add(formatDate(cost.createdAt || cost.date)));
    return Array.from(allDates).sort((a, b) => new Date(b) - new Date(a));
  };

  const calculateDaySums = (date) => {
    const dayOrders = ordersByDate[date] || [];
    
    const totalOrdersPrice = dayOrders.reduce((sum, order) => sum + (order.ordersPrice || 0), 0);
    const totalMakingPrice = dayOrders.reduce((sum, order) => sum + (order.ordersMakingPrice || 0), 0);
    const totalProfit = dayOrders.reduce((sum, order) => sum + (order.profite || 0), 0);
    const totalRunningCosts = (costsByDate[date] || []).reduce((sum, cost) => sum + (cost.price || 0), 0);
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

  // Render Orders Tab (Original view)
  const renderOrdersTab = () => (
    <div className="timeline-view">
      {allDates.length === 0 ? (
        <p className="no-data">Loading....</p>
      ) : (
        allDates.map(date => {
          const sums = calculateDaySums(date);
          
          return (
            <div key={date} className="date-group">
              <div className="date-header">
                <h3>{date}</h3>
              </div>
              
              <div className="date-content">
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
<span> margin: {(((order.profite ÷ order.ordersPrice)×100 )|| 0).toFixed(2)}% Birr</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {(ordersByDate[date]?.length > 0 || costsByDate[date]?.length > 0) && (
                <div className="daily-summary">
                  <h4>Daily Summary</h4>
                  <div className="summary-grid">
                    <div className="summary-item">
                      <span className="summary-label">Total Orders Revenue:</span>
                      <span className="summary-value">{sums.totalOrdersPrice.toFixed(2)} Birr</span>
                    </div>
                    <div className="summary-item">
                      <span className="summary-label">COGS (Making Cost):</span>
                      <span className="summary-value">{sums.totalMakingPrice.toFixed(2)} Birr</span>
                    </div>
                    <div className="summary-item">
                      <span className="summary-label">Gross Profit:</span>
                      <span className="summary-value profit">{sums.totalProfit.toFixed(2)} Birr</span>
                    </div>
                    {sums.totalRunningCosts > 0 && (
                      <div className="summary-item">
                        <span className="summary-label">Running Costs:</span>
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
  );

  // Render Daily Tab (Only daily summaries)
  const renderDailyTab = () => {
  // Access the combinedSummaries from the response
  const combinedSummaries = dailySummaries || [];

  return (
    <div className="daily-view">
      {combinedSummaries.length === 0 ? (
        <p className="no-data">No daily data found</p>
      ) : (
        combinedSummaries.map(summary => {
          const {
            date,
            totalRevenue = 0,
            totalMakingCost = 0,
            totalProfit = 0,
            totalRunningCost = 0,
            netProfit = 0,
            orderCount = 0
          } = summary;

          return (
            <div key={date} className="date-group">
              <div className="date-header">
                <h3>{formatDate(date)}</h3>
              </div>
              
              <div className="daily-summary standalone">
                <div className="summary-grid">
                  <div className="summary-item">
                    <span className="summary-label">Total Revenue:</span>
                    <span className="summary-value">{totalRevenue.toFixed(2)} Birr</span>
                  </div>
                  <div className="summary-item">
                    <span className="summary-label">COGS (Making Cost):</span>
                    <span className="summary-value">{totalMakingCost.toFixed(2)} Birr</span>
                  </div>
                  <div className="summary-item">
                    <span className="summary-label">Gross Profit:</span>
                    <span className="summary-value profit">{totalProfit.toFixed(2)} Birr</span>
                  </div>
                  <div className="summary-item">
                    <span className="summary-label">Running Costs:</span>
                    <span className="summary-value cost">{totalRunningCost.toFixed(2)} Birr</span>
                  </div>
                  <div className="summary-item">
                    <span className="summary-label">Number of Orders:</span>
                    <span className="summary-value">{orderCount}</span>
                  </div>
                  <div className="summary-item total">
                    <span className="summary-label">Net Profit:</span>
                    <span className={`summary-value ${netProfit >= 0 ? 'net-profit' : 'net-loss'}`}>
                      {netProfit.toFixed(2)} Birr
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

  // Render Weekly Tab
  const renderWeeklyTab = () => {
    const combinedWeeklyData = {};
    
    weeklySummaries.forEach(summary => {
      const key = `${summary._id.year}-${summary._id.week}`;
      combinedWeeklyData[key] = {
        ...combinedWeeklyData[key],
        ...summary,
        key: key
      };
    });
    
    weeklyRunningCosts.forEach(cost => {
      const key = `${cost._id.year}-${cost._id.week}`;
      combinedWeeklyData[key] = {
        ...combinedWeeklyData[key],
        totalRunningCost: cost.totalRunningCost || 0,
        costCount: cost.costCount || 0
      };
    });

    const sortedWeeks = Object.values(combinedWeeklyData).sort((a, b) => {
      if (a._id.year !== b._id.year) return b._id.year - a._id.year;
      return b._id.week - a._id.week;
    });

    return (
      <div className="weekly-view">
        {sortedWeeks.length === 0 ? (
          <p className="no-data">No weekly data found</p>
        ) : (
          sortedWeeks.map(week => {
            const totalRevenue = week.totalRevenue || 0;
            const totalMakingCost = week.totalMakingCost || 0;
            const totalProfit = week.totalProfit || 0;
            const totalRunningCost = week.totalRunningCost || 0;
            const netProfit = totalProfit - totalRunningCost;
            const orderCount = week.orderCount || 0;

            return (
              <div key={week.key} className="date-group">
                <div className="date-header">
                  <h3>Week {week._id.week}, {week._id.year}</h3>
                  <p className="week-range">{formatWeekRange(week.startDate, week.endDate)}</p>
                </div>
                
                <div className="daily-summary standalone">
                  <div className="summary-grid">
                    <div className="summary-item">
                      <span className="summary-label">Total Revenue:</span>
                      <span className="summary-value">{totalRevenue.toFixed(2)} Birr</span>
                    </div>
                    <div className="summary-item">
                      <span className="summary-label">COGS (Making Cost):</span>
                      <span className="summary-value">{totalMakingCost.toFixed(2)} Birr</span>
                    </div>
                    <div className="summary-item">
                      <span className="summary-label">Gross Profit:</span>
                      <span className="summary-value profit">{totalProfit.toFixed(2)} Birr</span>
                    </div>
                    <div className="summary-item">
                      <span className="summary-label">Running Costs:</span>
                      <span className="summary-value cost">{totalRunningCost.toFixed(2)} Birr</span>
                    </div>
                    <div className="summary-item">
                      <span className="summary-label">Number of Orders:</span>
                      <span className="summary-value">{orderCount}</span>
                    </div>
                    <div className="summary-item total">
                      <span className="summary-label">Net Profit:</span>
                      <span className={`summary-value ${netProfit >= 0 ? 'net-profit' : 'net-loss'}`}>
                        {netProfit.toFixed(2)} Birr
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    );
  };

  // Render Monthly Tab
  const renderMonthlyTab = () => {
    const combinedMonthlyData = {};
    
    monthlySummaries.forEach(summary => {
      const key = `${summary._id.year}-${summary._id.month}`;
      combinedMonthlyData[key] = {
        ...combinedMonthlyData[key],
        ...summary,
        key: key
      };
    });
    
    monthlyRunningCosts.forEach(cost => {
      const key = `${cost._id.year}-${cost._id.month}`;
      combinedMonthlyData[key] = {
        ...combinedMonthlyData[key],
        totalRunningCost: cost.totalRunningCost || 0,
        costCount: cost.costCount || 0
      };
    });

    const sortedMonths = Object.values(combinedMonthlyData).sort((a, b) => {
      if (a._id.year !== b._id.year) return b._id.year - a._id.year;
      return b._id.month - a._id.month;
    });

    return (
      <div className="monthly-view">
        {sortedMonths.length === 0 ? (
          <p className="no-data">No monthly data found</p>
        ) : (
          sortedMonths.map(month => {
            const totalRevenue = month.totalRevenue || 0;
            const totalMakingCost = month.totalMakingCost || 0;
            const totalProfit = month.totalProfit || 0;
            const totalRunningCost = month.totalRunningCost || 0;
            const netProfit = totalProfit - totalRunningCost;
            const orderCount = month.orderCount || 0;
            const monthName = getMonthName(month._id.month);

            return (
              <div key={month.key} className="date-group">
                <div className="date-header">
                  <h3>{monthName} {month._id.year}</h3>
                  <p className="month-range">
                    {formatDate(month.startDate)} - {formatDate(month.endDate)}
                  </p>
                </div>
                
                <div className="daily-summary standalone">
                  <div className="summary-grid">
                    <div className="summary-item">
                      <span className="summary-label">Total Revenue:</span>
                      <span className="summary-value">{totalRevenue.toFixed(2)} Birr</span>
                    </div>
                    <div className="summary-item">
                      <span className="summary-label">COGS (Making Cost):</span>
                      <span className="summary-value">{totalMakingCost.toFixed(2)} Birr</span>
                    </div>
                    <div className="summary-item">
                      <span className="summary-label">Gross Profit:</span>
                      <span className="summary-value profit">{totalProfit.toFixed(2)} Birr</span>
                    </div>
                    <div className="summary-item">
                      <span className="summary-label">Running Costs:</span>
                      <span className="summary-value cost">{totalRunningCost.toFixed(2)} Birr</span>
                    </div>
                    <div className="summary-item">
                      <span className="summary-label">Number of Orders:</span>
                      <span className="summary-value">{orderCount}</span>
                    </div>
                    <div className="summary-item total">
                      <span className="summary-label">Net Profit:</span>
                      <span className={`summary-value ${netProfit >= 0 ? 'net-profit' : 'net-loss'}`}>
                        {netProfit.toFixed(2)} Birr
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    );
  };

  if (error) {
    return <div className="error">{error}</div>;
  }

  {load &&( <div className="loading">Loading...</div>)
  }

  return (
    <div className="admin-panel">
      <h2>Admin Dashboard</h2>

      {/* Tab Navigation */}
      <div className="tab-navigation">
        <button 
          className={`tab-btn ${activeTab === 'orders' ? 'active' : ''}`}
          onClick={() => setActiveTab('orders')}
        >
          Orders
        </button>
        <button 
          className={`tab-btn ${activeTab === 'daily' ? 'active' : ''}`}
          onClick={() => setActiveTab('daily')}
        >
          Daily Summary
        </button>
        <button 
          className={`tab-btn ${activeTab === 'weekly' ? 'active' : ''}`}
          onClick={() => setActiveTab('weekly')}
        >
          Weekly Summary
        </button>
        <button 
          className={`tab-btn ${activeTab === 'monthly' ? 'active' : ''}`}
          onClick={() => setActiveTab('monthly')}
        >
          Monthly Summary
        </button>
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {activeTab === 'orders' && renderOrdersTab()}
        {activeTab === 'daily' && renderDailyTab()}
        {activeTab === 'weekly' && renderWeeklyTab()}
        {activeTab === 'monthly' && renderMonthlyTab()}
      </div>
      
      <button onClick={fetchData} className="refresh-btn">
        Refresh Data
      </button>
    </div>
  );
};

export default AdminPanel;