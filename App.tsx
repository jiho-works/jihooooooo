
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Records from './pages/Records';
import Admin from './pages/Admin';
import { Record, FeaturedMedia } from './types';
import { INITIAL_RECORDS, INITIAL_FEATURED } from './constants';

const App: React.FC = () => {
  const [records, setRecords] = useState<Record[]>(() => {
    const saved = localStorage.getItem('studi_ho_records');
    return saved ? JSON.parse(saved) : INITIAL_RECORDS;
  });

  const [featured, setFeatured] = useState<FeaturedMedia[]>(() => {
    const saved = localStorage.getItem('studi_ho_featured');
    return saved ? JSON.parse(saved) : INITIAL_FEATURED;
  });

  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    return sessionStorage.getItem('studi_ho_admin') === 'true';
  });

  useEffect(() => {
    localStorage.setItem('studi_ho_records', JSON.stringify(records));
  }, [records]);

  useEffect(() => {
    localStorage.setItem('studi_ho_featured', JSON.stringify(featured));
  }, [featured]);

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        {/* Header */}
        <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
            <Link to="/" className="text-2xl font-bold tracking-tighter text-black">
              studi_ho
            </Link>
            <nav className="flex items-center gap-8 text-sm uppercase tracking-widest font-medium">
              <Link to="/" className="hover:opacity-50 transition-opacity">Home</Link>
              <Link to="/records" className="hover:opacity-50 transition-opacity">Records</Link>
              {isAdmin ? (
                <Link to="/admin" className="hover:opacity-50 transition-opacity text-black font-bold underline">Admin</Link>
              ) : (
                <Link to="/admin" className="opacity-20 hover:opacity-100 transition-opacity">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                </Link>
              )}
            </nav>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-grow pt-32 pb-20 px-6">
          <div className="max-w-7xl mx-auto">
            <Routes>
              <Route path="/" element={<Home featured={featured} />} />
              <Route path="/records" element={<Records records={records} />} />
              <Route 
                path="/admin" 
                element={
                  <Admin 
                    isAdmin={isAdmin} 
                    setIsAdmin={setIsAdmin} 
                    records={records} 
                    setRecords={setRecords}
                    featured={featured}
                    setFeatured={setFeatured}
                  />
                } 
              />
            </Routes>
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-gray-100 py-10">
          <div className="max-w-7xl mx-auto px-6 flex justify-between items-center text-[10px] uppercase tracking-widest text-gray-400">
            <span>&copy; 2024 studi_ho</span>
            <span>Minimalist Journal</span>
          </div>
        </footer>
      </div>
    </Router>
  );
};

export default App;
