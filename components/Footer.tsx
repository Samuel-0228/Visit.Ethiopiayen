
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-gray-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="text-2xl font-bold text-white mb-6 block">
              <span className="ethiopia-green">Visit.</span>
              <span className="ethiopia-red">Ethiopiayen</span>
            </Link>
            <p className="text-sm leading-relaxed mb-6">
              Your gateway to discovering the wonders of Ethiopia. From the ancient history of Lalibela to the wild landscapes of Simien, we bring the Land of Origins closer to you.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-white transition-colors"><i className="fab fa-facebook-f text-lg"></i></a>
              <a href="#" className="hover:text-white transition-colors"><i className="fab fa-instagram text-lg"></i></a>
              <a href="#" className="hover:text-white transition-colors"><i className="fab fa-twitter text-lg"></i></a>
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-6">Explore</h4>
            <ul className="space-y-4 text-sm">
              <li><Link to="/destinations" className="hover:text-ethiopia-green">Destinations</Link></li>
              <li><Link to="/flights" className="hover:text-ethiopia-green">Flight Search</Link></li>
              <li><Link to="/itineraries" className="hover:text-ethiopia-green">Itineraries</Link></li>
              <li><Link to="/business" className="hover:text-ethiopia-green">Travel Packages</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Company</h4>
            <ul className="space-y-4 text-sm">
              <li><a href="#" className="hover:text-ethiopia-green">About Us</a></li>
              <li><Link to="/business" className="hover:text-ethiopia-green">Partnership</Link></li>
              <li><a href="#" className="hover:text-ethiopia-green">Terms of Service</a></li>
              <li><a href="#" className="hover:text-ethiopia-green">Privacy Policy</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Newsletter</h4>
            <p className="text-sm mb-4">Get the latest travel tips and deals for Ethiopia.</p>
            <form className="flex">
              <input 
                type="email" 
                placeholder="Your email" 
                className="bg-slate-800 border-none px-4 py-2 rounded-l-md w-full focus:ring-1 focus:ring-ethiopia-green text-sm"
              />
              <button className="bg-ethiopia-green text-white px-4 py-2 rounded-r-md hover:bg-opacity-90 transition-all font-semibold">
                Join
              </button>
            </form>
          </div>
        </div>
        
        <div className="mt-16 pt-8 border-t border-slate-800 text-center flex flex-col items-center gap-3">
          <p className="text-xs text-gray-500">&copy; {new Date().getFullYear()} Visit.Ethiopiayen. All rights reserved.</p>
          <p className="text-sm font-medium">Built by <span className="text-ethiopia-green font-bold">S.Y</span></p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
