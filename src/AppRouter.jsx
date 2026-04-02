import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import MainSection from './Components/MainSection';
import RunningCost from './Components/RunningCost';
import AdminPanel from './Components/AdminPanel';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<MainSection />} />
          <Route path="running-cost" element={<RunningCost />} />
          <Route path="admin" element={<AdminPanel />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;