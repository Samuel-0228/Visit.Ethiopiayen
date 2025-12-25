
import React, { useState } from 'react';
import { getFlightInformation } from '../geminiService';

const Flights: React.FC = () => {
  const [origin, setOrigin] = useState('');
  const [result, setResult] = useState<{ text: string, sources: any[] } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!origin.trim()) return;
    setLoading(true);
    const data = await getFlightInformation(origin);
    setResult(data);
    setLoading(false);
  };

  /**
   * Complex parser to convert raw AI markdown-like text into a professional UI.
   * Detects tables, headers, lists, and general text to wrap them in beautiful cards.
   */
  const renderBeautifiedResults = (text: string) => {
    const lines = text.split('\n');
    const sections: React.ReactNode[] = [];
    let currentList: string[] = [];
    let tableRows: string[][] = [];

    const flushList = (key: number) => {
      if (currentList.length > 0) {
        sections.push(
          <div key={`list-${key}`} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm mb-6">
            <ul className="space-y-4">
              {currentList.map((item, idx) => (
                <li key={idx} className="flex items-start gap-4 text-slate-700 leading-relaxed">
                  <div className="w-6 h-6 rounded-full bg-ethiopia-green/10 flex items-center justify-center shrink-0 mt-0.5">
                    <i className="fas fa-check text-[10px] text-ethiopia-green"></i>
                  </div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        );
        currentList = [];
      }
    };

    const flushTable = (key: number) => {
      if (tableRows.length > 0) {
        const headers = tableRows[0];
        const data = tableRows.slice(1);
        sections.push(
          <div key={`table-${key}`} className="bg-white rounded-3xl border border-gray-100 shadow-sm mb-8 overflow-hidden">
            <div className="bg-slate-900 px-8 py-4">
              <div className="grid grid-cols-3 gap-4">
                {headers.map((h, i) => <span key={i} className="text-xs font-black text-ethiopia-yellow uppercase tracking-widest">{h}</span>)}
              </div>
            </div>
            <div className="divide-y divide-gray-50">
              {data.map((row, idx) => (
                <div key={idx} className="grid grid-cols-3 gap-4 px-8 py-5 hover:bg-slate-50 transition-colors">
                  {row.map((cell, i) => (
                    <span key={i} className={`text-sm ${i === 0 ? 'font-bold text-slate-900' : 'text-slate-600 font-medium'}`}>
                      {cell.replace(/\*\*/g, '').trim()}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        );
        tableRows = [];
      }
    };

    lines.forEach((line, i) => {
      const trimmedLine = line.trim();

      // Detect Table rows
      if (trimmedLine.includes('|')) {
        const cells = trimmedLine.split('|').map(c => c.trim()).filter(c => c.length > 0);
        if (cells.length > 0 && !trimmedLine.includes('---')) {
          flushList(i);
          tableRows.push(cells);
          return;
        } else if (trimmedLine.includes('---')) {
          return;
        }
      } else {
        flushTable(i);
      }

      // Detect Headers
      if (trimmedLine.startsWith('#')) {
        flushList(i);
        const level = (trimmedLine.match(/#/g) || []).length;
        const textOnly = trimmedLine.replace(/#/g, '').trim();
        if (level === 1) {
          sections.push(<h2 key={i} className="text-4xl font-bold mt-16 mb-8 text-slate-900">{textOnly}</h2>);
        } else if (level === 2) {
          sections.push(<h3 key={i} className="text-2xl font-bold mt-12 mb-6 text-slate-800 border-l-4 border-ethiopia-green pl-6">{textOnly}</h3>);
        } else {
          sections.push(<h4 key={i} className="text-xl font-bold mt-10 mb-4 text-slate-800">{textOnly}</h4>);
        }
        return;
      }

      // Detect Lists
      if (trimmedLine.startsWith('*') || trimmedLine.startsWith('-') || /^\d+\./.test(trimmedLine)) {
        currentList.push(trimmedLine.replace(/^[*-\d.]+\s*/, '').trim());
        return;
      } else if (trimmedLine.length > 0) {
        flushList(i);
        sections.push(<p key={i} className="text-lg text-slate-600 leading-relaxed mb-6">{trimmedLine.replace(/\*\*/g, '')}</p>);
      } else {
        flushList(i);
      }
    });

    flushList(999);
    flushTable(1000);

    return sections;
  };

  return (
    <div className="min-h-screen bg-white pb-24">
      {/* Header */}
      <section className="bg-slate-900 py-32 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-ethiopia-green via-transparent to-transparent"></div>
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <span className="inline-block bg-ethiopia-green text-[10px] font-black uppercase tracking-[0.2em] px-4 py-1.5 rounded-full text-white mb-6">Real-Time Connectivity</span>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tight">Search Routes to <span className="text-ethiopia-yellow">Ethiopia</span></h1>
          <p className="text-gray-400 text-xl mb-12 max-w-2xl mx-auto leading-relaxed font-light">
            We use live search grounding to fetch the most current flight intelligence and price benchmarks from global carriers.
          </p>
          
          <form onSubmit={handleSearch} className="relative max-w-3xl mx-auto flex flex-col md:flex-row gap-4 p-2 bg-white/5 backdrop-blur-md rounded-[32px] border border-white/10">
            <div className="flex-grow relative group">
              <i className="fas fa-map-marker-alt absolute left-6 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-ethiopia-green transition-colors"></i>
              <input 
                type="text" 
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                placeholder="Flying from (e.g. Dubai, London, Nairobi)"
                className="w-full pl-16 pr-4 py-6 rounded-[24px] bg-white text-slate-900 border-none outline-none focus:ring-4 focus:ring-ethiopia-green/20 transition-all text-lg font-medium"
              />
            </div>
            <button 
              type="submit" 
              disabled={loading}
              className="bg-ethiopia-green text-white px-14 py-6 rounded-[24px] font-black uppercase tracking-widest text-sm hover:shadow-[0_20px_40px_-15px_rgba(0,151,57,0.5)] hover:bg-opacity-90 active:scale-95 transition-all shadow-xl disabled:opacity-50 flex items-center justify-center min-w-[220px]"
            >
              {loading ? <i className="fas fa-circle-notch fa-spin text-xl"></i> : 'Check Flights'}
            </button>
          </form>
        </div>
      </section>

      {/* Results Rendering */}
      <section className="max-w-6xl mx-auto px-4 -mt-12 relative z-20">
        {!result && !loading && (
          <div className="text-center py-32 bg-white rounded-[48px] shadow-2xl border border-gray-100 flex flex-col items-center">
            <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-8 border border-gray-100">
                <i className="fas fa-plane-departure text-4xl text-slate-200"></i>
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-2">Ready for take-off?</h3>
            <p className="text-slate-400 font-medium">Enter your departure location to get a full flight report.</p>
          </div>
        )}

        {loading && (
          <div className="space-y-12 animate-pulse bg-white p-12 rounded-[48px] shadow-2xl border border-gray-100">
            <div className="flex justify-between items-center">
                <div className="h-12 bg-slate-100 rounded-2xl w-64"></div>
                <div className="h-8 bg-slate-100 rounded-xl w-32"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2 space-y-8">
                <div className="h-64 bg-slate-50 rounded-[32px]"></div>
                <div className="h-48 bg-slate-50 rounded-[32px]"></div>
              </div>
              <div className="h-[400px] bg-slate-50 rounded-[32px]"></div>
            </div>
          </div>
        )}

        {result && (
          <div className="animate-fade-in-up bg-white p-6 md:p-16 rounded-[48px] shadow-2xl border border-gray-100">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-16 border-b border-slate-50 pb-12">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                    <span className="bg-ethiopia-red text-white text-[10px] font-black px-3 py-1 rounded-md uppercase tracking-widest">LIVE REPORT</span>
                    <span className="text-slate-400 font-bold text-sm">/</span>
                    <span className="text-slate-900 font-black text-sm uppercase tracking-widest">{origin} — ADD</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-slate-900">Flight Intelligence</h2>
              </div>
              <div className="bg-slate-50 px-8 py-5 rounded-3xl border border-gray-100 text-center md:text-right">
                <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] mb-1">Last Data Fetch</p>
                <p className="text-lg font-bold text-slate-800">{new Date().toLocaleDateString()} &bull; {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2">
                <div className="flight-report-content">
                  {renderBeautifiedResults(result.text)}
                </div>

                {/* Source Verification Cards */}
                <div className="mt-16 pt-16 border-t border-gray-50">
                    <div className="flex items-center gap-4 mb-10">
                        <div className="w-10 h-10 rounded-2xl bg-ethiopia-yellow/10 flex items-center justify-center">
                            <i className="fas fa-link text-ethiopia-yellow"></i>
                        </div>
                        <h4 className="text-2xl font-black text-slate-900">Booking Anchors</h4>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {result.sources.map((chunk, i) => (
                        chunk.web && (
                        <a 
                            key={i} 
                            href={chunk.web.uri} 
                            target="_blank" 
                            rel="noreferrer"
                            className="group bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all flex flex-col justify-between"
                        >
                            <div>
                                <div className="flex items-center justify-between mb-6">
                                    <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-300 group-hover:text-ethiopia-green group-hover:bg-ethiopia-green/5 transition-all">
                                        <i className="fas fa-external-link-alt"></i>
                                    </div>
                                    <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Global Provider</span>
                                </div>
                                <h5 className="text-xl font-bold text-slate-800 group-hover:text-ethiopia-green transition-colors line-clamp-2 leading-tight">{chunk.web.title || "Travel Listing"}</h5>
                            </div>
                            <div className="mt-8 flex items-center text-xs font-black text-ethiopia-green uppercase tracking-widest">
                                Discover Details <i className="fas fa-chevron-right ml-3 text-[8px] transform group-hover:translate-x-1 transition-transform"></i>
                            </div>
                        </a>
                        )
                    ))}
                    </div>
                </div>
              </div>

              {/* Sidebar Quick-Facts */}
              <div className="space-y-8">
                <div className="bg-slate-900 p-10 rounded-[40px] text-white shadow-2xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-ethiopia-green/10 rounded-full -mr-16 -mt-16 blur-3xl transition-all group-hover:bg-ethiopia-green/20"></div>
                  <h4 className="text-2xl font-black mb-10 relative z-10">Travel Smart</h4>
                  <div className="space-y-10 relative z-10">
                      <div className="flex gap-6">
                          <div className="shrink-0 w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-ethiopia-yellow font-black italic">1</div>
                          <div>
                            <p className="font-bold mb-1">Booking Window</p>
                            <p className="text-sm text-slate-400 leading-relaxed">Secure rates <span className="text-white">21-30 days</span> out. Mid-week departures consistently offer <span className="text-ethiopia-green">15-20% savings</span>.</p>
                          </div>
                      </div>
                      <div className="flex gap-6">
                          <div className="shrink-0 w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-ethiopia-yellow font-black italic">2</div>
                          <div>
                            <p className="font-bold mb-1">Flag Carrier Perks</p>
                            <p className="text-sm text-slate-400 leading-relaxed">Ethiopian Airlines is often competitive for full-service. Check for <span className="text-white font-bold">Free Transit Tours</span> if your layover exceeds 8 hours.</p>
                          </div>
                      </div>
                      <div className="flex gap-6">
                          <div className="shrink-0 w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-ethiopia-yellow font-black italic">3</div>
                          <div>
                            <p className="font-bold mb-1">Visa Readiness</p>
                            <p className="text-sm text-slate-400 leading-relaxed">Have your <span className="text-white">E-Visa</span> printout and proof of accommodation ready for a smooth entry at Bole Intl.</p>
                          </div>
                      </div>
                  </div>
                </div>

                <div className="bg-ethiopia-green/5 p-10 rounded-[40px] border border-ethiopia-green/10">
                  <i className="fas fa-quote-left text-3xl text-ethiopia-green/20 mb-6 block"></i>
                  <p className="text-slate-600 font-medium italic leading-relaxed">
                    "Addis Ababa is more than a destination; it's the gateway to Africa's deepest history. Choosing the right flight is the first step of your heritage journey."
                  </p>
                  <p className="mt-6 text-xs font-black text-slate-400 uppercase tracking-widest">— Travel Insight Team</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default Flights;
