import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { Button } from "../components/ui/button";

// Importing image
import herossectionImage from "../images/herossection-image.avif";

export const ViewFeedback = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRating, setFilterRating] = useState('all');

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setLoading(true);

    const { data, error } = await supabase
      .from("feedback") // ✅ Make sure your table name is correct
      .select("*")
      .order('created_at', { ascending: false });

    if (error) {
      console.log(error);
      // console.error("Error fetching data:", error.message);
    } else {
      setData(data);
    }

    setLoading(false);
  }

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this feedback?")) {
      try {
        const { error } = await supabase
          .from("feedback")
          .delete()
          .eq('id', id);
        
        if (error) throw error;
        setData(data.filter(item => item.id !== id));
      } catch (err) {
        console.error("Error deleting feedback:", err);
      }
    }
  };

  const handleMarkAsReviewed = async (id) => {
    try {
      const { error } = await supabase
        .from("feedback")
        .update({ status: 'reviewed' })
        .eq('id', id);
      
      if (error) throw error;
      fetchData(); // Refresh data
    } catch (err) {
      console.error("Error updating feedback status:", err);
    }
  };

  const filteredData = data.filter(item => {
    const matchesSearch = item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.message?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const getRatingStars = (rating) => {
    if (!rating) return '⭐⭐⭐⭐⭐';
    const stars = '⭐'.repeat(Math.min(5, Math.max(1, rating)));
    const emptyStars = '☆'.repeat(5 - Math.min(5, Math.max(1, rating)));
    return stars + emptyStars;
  };

  const getRatingColor = (rating) => {
    if (!rating) return 'text-gray-400';
    if (rating >= 4) return 'text-green-400';
    if (rating >= 3) return 'text-yellow-400';
    return 'text-red-400';
  };

  if (loading) {
    return (
      <div className="relative w-full text-white min-h-screen overflow-hidden flex items-center justify-center">
        <img src={herossectionImage} alt="hero section" className="absolute w-full h-full object-cover -z-[10]" />
        <div className="text-center">
          <div className="text-6xl mb-4">⏳</div>
          <p className="text-2xl bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">Loading feedback...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full text-white min-h-screen overflow-hidden">
      <img
        src={herossectionImage}
        alt="hero section"
        className="absolute w-full h-full object-cover -z-[10]"
      />
      
      <div>
        <header className="max-w-[50rem] mx-auto px-8 py-10 z-10 relative">
          <h1 className="text-6xl font-semibold mb-6 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
            💭 Feedback Management Center
          </h1>
          <Link 
            to="/admin" 
            className="inline-block bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg"
          >
            🏠 Home
          </Link>
        </header>

        <main className="p-6 max-w-6xl mx-auto space-y-8 z-[10]">
          <div className="bg-gradient-to-br from-slate-800 via-purple-900 to-slate-900 border-purple-500/20 shadow-2xl rounded-xl p-8">
            {/* Header with Statistics */}
            <div className="mb-8">
              <h2 className="text-4xl font-bold mb-6 text-center bg-gradient-to-r from-pink-400 via-red-500 to-yellow-500 bg-clip-text text-transparent">
                📝 Customer Feedback Dashboard
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                <div className="bg-gradient-to-br from-blue-800 via-indigo-900 to-purple-800 border-blue-500/20 shadow-xl rounded-lg p-4 text-center">
                  <div className="text-3xl mb-2">💬</div>
                  <h3 className="text-lg font-bold text-blue-300">Total Feedback</h3>
                  <p className="text-2xl font-bold text-white">{data.length}</p>
                </div>
                
                <div className="bg-gradient-to-br from-green-800 via-emerald-900 to-teal-800 border-green-500/20 shadow-xl rounded-lg p-4 text-center">
                  <div className="text-3xl mb-2">⭐</div>
                  <h3 className="text-lg font-bold text-green-300">Positive</h3>
                  <p className="text-2xl font-bold text-white">{data.filter(item => item.rating >= 4).length}</p>
                </div>
                
                <div className="bg-gradient-to-br from-yellow-800 via-amber-900 to-orange-800 border-yellow-500/20 shadow-xl rounded-lg p-4 text-center">
                  <div className="text-3xl mb-2">🔶</div>
                  <h3 className="text-lg font-bold text-yellow-300">Neutral</h3>
                  <p className="text-2xl font-bold text-white">{data.filter(item => item.rating === 3).length}</p>
                </div>
                
                <div className="bg-gradient-to-br from-red-800 via-rose-900 to-pink-800 border-red-500/20 shadow-xl rounded-lg p-4 text-center">
                  <div className="text-3xl mb-2">❌</div>
                  <h3 className="text-lg font-bold text-red-300">Needs Attention</h3>
                  <p className="text-2xl font-bold text-white">{data.filter(item => item.rating <= 2).length}</p>
                </div>
              </div>

              {/* Search and Filter Controls */}
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="🔍 Search feedback by name, email, or message content..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-700/50 border border-purple-400/30 rounded-lg text-white placeholder-gray-300 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 focus:outline-none"
                  />
                </div>
                <Button className="bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white border-0 px-6 py-3">
                  📊 Export Report
                </Button>
              </div>
            </div>

            {filteredData.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📭</div>
                <p className="text-gray-300 text-xl bg-gradient-to-r from-slate-700 to-slate-600 rounded-xl p-8 inline-block">
                  {searchTerm ? `No feedback found matching "${searchTerm}"` : "No customer feedback available yet."}
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="mb-4 p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-400/30 rounded-lg">
                  <p className="text-center text-blue-200 font-medium">
                    📊 Showing <span className="text-white font-bold text-lg">{filteredData.length}</span> of {data.length} feedback entries
                  </p>
                </div>

                {filteredData.map((item, index) => (
                  <div
                    key={item.id}
                    className="bg-gradient-to-br from-slate-800 via-indigo-900 to-slate-900 border-indigo-500/20 shadow-xl hover:shadow-indigo-500/10 transition-all duration-300 p-6 rounded-xl hover:scale-[1.01] group"
                  >
                    <div className="flex flex-col lg:flex-row justify-between items-start gap-6">
                      <div className="flex-1 space-y-4">
                        {/* Customer Header */}
                        <div className="flex items-start gap-3">
                          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                            {item.name?.charAt(0)?.toUpperCase() || '?'}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-1">
                              <h3 className="text-xl font-bold text-white">{item.name || 'Anonymous'}</h3>
                              {item.status !== 'reviewed' && (
                                <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full font-semibold">PENDING</span>
                              )}
                            </div>
                            <p className="text-blue-300 flex items-center gap-1 mb-2">
                              📧 {item.email || 'No email provided'}
                            </p>
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-gray-400">Rating:</span>
                              <span className={`text-lg ${getRatingColor(item.rating)}`}>
                                {getRatingStars(item.rating)}
                              </span>
                              {item.rating && (
                                <span className="text-sm text-gray-300">({item.rating}/5)</span>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Feedback Content */}
                        <div className="bg-slate-700/30 rounded-lg p-4 border border-slate-600/30">
                          <h4 className="text-sm text-gray-400 mb-2 font-medium">💭 Feedback Message:</h4>
                          <p className="text-gray-200 leading-relaxed">{item.message || item.feedback || 'No feedback message provided.'}</p>
                        </div>

                        {/* Metadata */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                          <div className="flex items-center gap-2">
                            <span className="text-lg">🆔</span>
                            <div>
                              <p className="text-gray-400">Feedback ID</p>
                              <p className="text-cyan-300 font-mono">{item.id}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <span className="text-lg">📅</span>
                            <div>
                              <p className="text-gray-400">Submitted At</p>
                              <p className="text-emerald-300 font-semibold">
                                {item.created_at ? new Date(item.created_at).toLocaleDateString() : 'N/A'}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <span className="text-lg">📈</span>
                            <div>
                              <p className="text-gray-400">Status</p>
                              <p className={`font-semibold ${item.status === 'reviewed' ? 'text-green-300' : 'text-yellow-300'}`}>
                                {item.status === 'reviewed' ? '✅ Reviewed' : '⏳ Pending Review'}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-col sm:flex-row lg:flex-col gap-3 min-w-fit">
                        {item.status !== 'reviewed' && (
                          <Button 
                            onClick={() => handleMarkAsReviewed(item.id)}
                            className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white border-0 transition-all duration-300 hover:scale-105 px-4 py-2 text-sm whitespace-nowrap"
                          >
                            ✅ Mark Reviewed
                          </Button>
                        )}
                        
                        {item.email && (
                          <Button 
                            onClick={() => window.open(`mailto:${item.email}?subject=Thank you for your feedback`)}
                            className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white border-0 transition-all duration-300 hover:scale-105 px-4 py-2 text-sm whitespace-nowrap"
                          >
                            📧 Respond
                          </Button>
                        )}
                        
                        <Button 
                          onClick={() => handleDelete(item.id)}
                          className="bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white border-0 transition-all duration-300 hover:scale-105 px-4 py-2 text-sm whitespace-nowrap"
                        >
                          🗑️ Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Quick Actions Panel */}
            <div className="mt-8 p-6 bg-gradient-to-r from-slate-700/50 to-slate-600/50 rounded-lg border border-slate-500/30">
              <h3 className="text-xl font-bold mb-4 text-center bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                ⚡ Quick Actions
              </h3>
              <div className="flex flex-wrap gap-4 justify-center">
                <button 
                  onClick={() => setSearchTerm('')}
                  className="bg-gradient-to-r from-slate-500 to-gray-600 hover:from-slate-600 hover:to-gray-700 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-300 hover:scale-105"
                >
                  🔄 Clear Search
                </button>
                <button className="bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-300 hover:scale-105">
                  📈 Analytics Dashboard
                </button>
                <button className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-300 hover:scale-105">
                  📋 Bulk Actions
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
