
import React, { useState } from 'react';

const Business: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-slate-900 text-white py-24">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">Empowering Ethiopia's <br/><span className="text-ethiopia-green">Tourism Ecosystem</span></h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Join the digital gateway for Ethiopian tourism. We connect international travelers with local excellence.
          </p>
        </div>
      </section>

      {/* Value Props */}
      <section className="py-24 max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="p-8 rounded-3xl bg-slate-50 border border-gray-100">
            <div className="w-16 h-16 bg-ethiopia-green/10 rounded-2xl flex items-center justify-center mb-6">
              <i className="fas fa-chart-line text-2xl text-ethiopia-green"></i>
            </div>
            <h3 className="text-xl font-bold mb-4">Global Reach</h3>
            <p className="text-gray-600">Access thousands of international travelers planning their next journey to the Horn of Africa.</p>
          </div>
          <div className="p-8 rounded-3xl bg-slate-50 border border-gray-100">
            <div className="w-16 h-16 bg-ethiopia-yellow/10 rounded-2xl flex items-center justify-center mb-6">
              <i className="fas fa-shield-alt text-2xl text-ethiopia-yellow"></i>
            </div>
            <h3 className="text-xl font-bold mb-4">Verified Status</h3>
            <p className="text-gray-600">Get the "Verified Partner" badge to build trust with high-intent luxury and mid-range travelers.</p>
          </div>
          <div className="p-8 rounded-3xl bg-slate-50 border border-gray-100">
            <div className="w-16 h-16 bg-ethiopia-red/10 rounded-2xl flex items-center justify-center mb-6">
              <i className="fas fa-ad text-2xl text-ethiopia-red"></i>
            </div>
            <h3 className="text-xl font-bold mb-4">Priority Listing</h3>
            <p className="text-gray-600">Appearing at the top of our accommodation and tour recommendations for specific regions.</p>
          </div>
        </div>
      </section>

      {/* Partner Form */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-8">Let's Grow Together</h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Whether you're a luxury boutique hotel in Addis or a trekking guide service in the Bale Mountains, we want to showcase your business to the world.
            </p>
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <i className="fas fa-check text-ethiopia-green"></i>
                <span className="font-semibold text-slate-700">Zero upfront commission for first 3 months</span>
              </div>
              <div className="flex items-center space-x-4">
                <i className="fas fa-check text-ethiopia-green"></i>
                <span className="font-semibold text-slate-700">Dedicated dashboard for booking inquiries</span>
              </div>
              <div className="flex items-center space-x-4">
                <i className="fas fa-check text-ethiopia-green"></i>
                <span className="font-semibold text-slate-700">Content creation support (Photography/Copy)</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-10 rounded-3xl shadow-2xl border border-gray-100">
            {submitted ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <i className="fas fa-check text-3xl text-green-500"></i>
                </div>
                <h3 className="text-2xl font-bold mb-2">Application Received</h3>
                <p className="text-gray-500">Our partnership manager will contact you within 48 hours.</p>
                <button 
                  onClick={() => setSubmitted(false)}
                  className="mt-8 text-ethiopia-green font-bold hover:underline"
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Business Name</label>
                  <input required type="text" className="w-full px-4 py-3 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:ring-2 focus:ring-ethiopia-green transition-all" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Business Type</label>
                    <select className="w-full px-4 py-3 rounded-xl bg-gray-50 border-transparent">
                      <option>Hotel</option>
                      <option>Tour Operator</option>
                      <option>Restaurant</option>
                      <option>Investor</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">City</label>
                    <input required type="text" className="w-full px-4 py-3 rounded-xl bg-gray-50 border-transparent" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Contact Email</label>
                  <input required type="email" className="w-full px-4 py-3 rounded-xl bg-gray-50 border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Brief Message</label>
                  <textarea rows={4} className="w-full px-4 py-3 rounded-xl bg-gray-50 border-transparent"></textarea>
                </div>
                <button type="submit" className="w-full bg-ethiopia-green text-white py-4 rounded-xl font-bold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all">
                  Apply for Partnership
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Developer Portfolio Showcase */}
      <section className="py-24 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <span className="text-ethiopia-yellow font-bold uppercase tracking-widest text-sm mb-4 block">Product Engineering</span>
          <h2 className="text-3xl font-bold mb-6">Designed for Performance & Scalability</h2>
          <p className="text-gray-400 leading-relaxed mb-10">
            This platform is built with a production-ready React architecture, leveraging Gemini AI for real-time travel intelligence. Designed to scale from a single destination guide to a nationwide tourism infrastructure.
          </p>
          <div className="flex flex-wrap justify-center gap-12 opacity-50">
            <div className="flex items-center space-x-2"><i className="fab fa-react text-2xl"></i> <span>React 18+</span></div>
            <div className="flex items-center space-x-2"><i className="fas fa-database text-2xl"></i> <span>PostgreSQL Ready</span></div>
            <div className="flex items-center space-x-2"><i className="fas fa-brain text-2xl"></i> <span>Gemini LLM</span></div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Business;
