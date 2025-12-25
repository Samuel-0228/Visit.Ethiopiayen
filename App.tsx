
import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProfile } from './types';
import Home from './pages/Home';
import Destinations from './pages/Destinations';
import DestinationDetail from './pages/DestinationDetail';
import Flights from './pages/Flights';
import Itineraries from './pages/Itineraries';
import Business from './pages/Business';
import Admin from './pages/Admin';
import Profile from './pages/Profile';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const App: React.FC = () => {
  // Free browsing: No forced login, no demo admin.
  const [user, setUser] = useState<UserProfile | null>(null);

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar user={user} />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/destinations" element={<Destinations />} />
            <Route path="/destination/:id" element={<DestinationDetail user={user} />} />
            <Route path="/flights" element={<Flights />} />
            <Route path="/itineraries" element={<Itineraries />} />
            <Route path="/business" element={<Business />} />
            <Route path="/admin" element={<Admin user={user} />} />
            <Route path="/profile" element={<Profile user={user} />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
