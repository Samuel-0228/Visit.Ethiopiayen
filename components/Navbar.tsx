
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { UserProfile } from '../types';

const Navbar: React.FC<{ user: UserProfile | null }> = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Destinations', path: '/destinations' },
    { name: 'Flights', path: '/flights' },
    { name: 'Itineraries', path: '/itineraries' },
    { name: 'Business', path: '/business' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold ethiopia-green">Visit.</span>
              <span className="text-2xl font-bold ethiopia-red">Ethiopiayen</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-ethiopia-green ${
                  isActive(link.path) ? 'text-ethiopia-green border-b-2 border-ethiopia-green' : 'text-slate-600'
                }`}
              >
                {link.name}
              </Link>
            ))}
            
            {user ? (
              <div className="flex items-center space-x-4 border-l pl-8">
                {user.role === 'admin' && (
                  <Link to="/admin" className="text-sm font-semibold px-3 py-1 bg-slate-100 rounded-md hover:bg-slate-200">
                    Dashboard
                  </Link>
                )}
                <Link to="/profile" className="flex items-center space-x-2">
                  <img src={user.avatar} className="w-8 h-8 rounded-full border border-gray-200" alt="Profile" />
                </Link>
              </div>
            ) : (
              <button className="bg-ethiopia-green text-white px-5 py-2 rounded-lg font-semibold hover:bg-opacity-90 transition-all">
                Sign In
              </button>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-600 focus:outline-none">
              <i className={`fas ${isOpen ? 'fa-times' : 'fa-bars'} text-2xl`}></i>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 animate-fade-in">
          <div className="px-4 pt-2 pb-6 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-4 text-base font-medium text-slate-700 hover:bg-gray-50 rounded-md"
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4 border-t border-gray-100">
              {user ? (
                <Link to="/profile" className="block px-3 py-4 text-base font-medium text-ethiopia-green">My Profile</Link>
              ) : (
                <button className="w-full text-left px-3 py-4 text-base font-medium text-ethiopia-green">Sign In</button>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
