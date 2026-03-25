import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import Layout from './Layout';

export default function App() {
  return (
    <Router>
      <Layout />
      <Analytics />
    </Router>
  );
}