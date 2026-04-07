import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import './mainLayout.css'; // Optional: Add your styles

const MainLayout = () => {
  const location = useLocation();

  return (
    <div className="main-layout">
      <nav className="navbar">
        <div className="nav-container">
          <h1 className="shop-title">My Shop Management System</h1>
        </div>
      </nav>
      <div className='underNav'>
        <ul className="nav-menu">
            <li className={location.pathname === '/' ? 'active' : ''}>
              <Link to="/">Main Section</Link>
            </li>
            <li className={location.pathname === '/running-cost' ? 'active' : ''}>
              <Link to="/running-cost">Running Cost</Link>
            </li>
            <li className={location.pathname === '/admin' ? 'active' : ''}>
              <Link to="/admin">Admin Panel</Link>
            </li>
          </ul>
      </div>
      
      <main className="main-content">
        <Outlet /> {/* This renders the current route's component */}
      </main>
    </div>
  );
};

export default MainLayout;
