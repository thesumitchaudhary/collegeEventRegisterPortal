import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from "../supabaseClient";
import { Button } from "../components/ui/button";

// Importing image
import herossectionImage from "../images/herossection-image.avif";

export const UserDashboardControl = () => {
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    newRegistrations: 0,
    totalEvents: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
    fetchStats();
  }, []);

  const fetchUsers = async () => {
    try {
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setUsers(data || []);
    } catch (err) {
      console.error("Error fetching users:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      // Get total users
      const { count: userCount } = await supabase
        .from("users")
        .select("*", { count: 'exact', head: true });

      // Get total events
      const { count: eventCount } = await supabase
        .from("events")
        .select("*", { count: 'exact', head: true });

      // Get total registrations
      const { count: regCount } = await supabase
        .from("registrations")
        .select("*", { count: 'exact', head: true });

      setStats({
        totalUsers: userCount || 0,
        activeUsers: Math.floor((userCount || 0) * 0.7), // Simulate active users
        newRegistrations: regCount || 0,
        totalEvents: eventCount || 0
      });
    } catch (err) {
      console.error("Error fetching stats:", err);
    }
  };

  const handleUserAction = async (userId, action) => {
    try {
      if (action === 'activate') {
        // Add your activation logic here
        console.log(`Activating user ${userId}`);
      } else if (action === 'deactivate') {
        // Add your deactivation logic here
        console.log(`Deactivating user ${userId}`);
      } else if (action === 'delete') {
        const { error } = await supabase
          .from("users")
          .delete()
          .eq('id', userId);
        
        if (error) throw error;
        fetchUsers(); // Refresh the list
        fetchStats(); // Update stats
      }
    } catch (err) {
      console.error(`Error ${action} user:`, err);
    }
  };

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
            👥 User Dashboard Control Center
          </h1>
          <Link 
            to="/admin" 
            className="inline-block bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg"
          >
            🏠 Home
          </Link>
        </header>

        <main className="p-6 max-w-6xl mx-auto space-y-8 z-[10]">
          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-gradient-to-br from-blue-800 via-indigo-900 to-purple-800 border-blue-500/20 shadow-xl rounded-lg p-6 text-center hover:scale-105 transition-all duration-300">
              <div className="text-4xl mb-3">👥</div>
              <h3 className="text-xl font-bold text-blue-300 mb-2">Total Users</h3>
              <p className="text-3xl font-bold text-white">{stats.totalUsers}</p>
            </div>

            <div className="bg-gradient-to-br from-green-800 via-emerald-900 to-teal-800 border-green-500/20 shadow-xl rounded-lg p-6 text-center hover:scale-105 transition-all duration-300">
              <div className="text-4xl mb-3">✅</div>
              <h3 className="text-xl font-bold text-green-300 mb-2">Active Users</h3>
              <p className="text-3xl font-bold text-white">{stats.activeUsers}</p>
            </div>

            <div className="bg-gradient-to-br from-orange-800 via-red-900 to-pink-800 border-orange-500/20 shadow-xl rounded-lg p-6 text-center hover:scale-105 transition-all duration-300">
              <div className="text-4xl mb-3">📝</div>
              <h3 className="text-xl font-bold text-orange-300 mb-2">Registrations</h3>
              <p className="text-3xl font-bold text-white">{stats.newRegistrations}</p>
            </div>

            <div className="bg-gradient-to-br from-purple-800 via-violet-900 to-indigo-800 border-purple-500/20 shadow-xl rounded-lg p-6 text-center hover:scale-105 transition-all duration-300">
              <div className="text-4xl mb-3">🎯</div>
              <h3 className="text-xl font-bold text-purple-300 mb-2">Total Events</h3>
              <p className="text-3xl font-bold text-white">{stats.totalEvents}</p>
            </div>
          </div>

          {/* User Management Section */}
          <div className="bg-gradient-to-br from-slate-800 via-purple-900 to-slate-900 border-purple-500/20 shadow-2xl rounded-xl p-8">
            <h2 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-pink-400 via-red-500 to-yellow-500 bg-clip-text text-transparent">
              🎛️ User Management Dashboard
            </h2>

            {loading ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">⏳</div>
                <p className="text-gray-300 text-xl">Loading users...</p>
              </div>
            ) : users.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">👥</div>
                <p className="text-gray-300 text-xl bg-gradient-to-r from-slate-700 to-slate-600 rounded-xl p-8 inline-block">
                  No users found in the system.
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="mb-6 p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-400/30 rounded-lg">
                  <p className="text-center text-blue-200 font-medium">
                    📊 Showing <span className="text-white font-bold text-lg">{users.length}</span> registered users
                  </p>
                </div>

                <div className="grid gap-6">
                  {users.map((user, index) => (
                    <div
                      key={user.id}
                      className="bg-gradient-to-br from-slate-800 via-indigo-900 to-slate-900 border-indigo-500/20 shadow-xl hover:shadow-indigo-500/10 transition-all duration-300 p-6 rounded-xl hover:scale-[1.02] group"
                    >
                      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                        <div className="flex-1 space-y-3">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                              {user.name?.charAt(0)?.toUpperCase() || 'U'}
                            </div>
                            <div>
                              <h3 className="text-xl font-bold text-white">{user.name || 'Unknown User'}</h3>
                              <p className="text-blue-300">{user.email}</p>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                            <div className="flex items-center gap-2">
                              <span className="text-xl">🆔</span>
                              <div>
                                <p className="text-sm text-gray-400">User ID</p>
                                <p className="text-gray-200 font-mono text-sm">{user.id}</p>
                              </div>
                            </div>

                            <div className="flex items-center gap-2">
                              <span className="text-xl">📅</span>
                              <div>
                                <p className="text-sm text-gray-400">Joined</p>
                                <p className="text-emerald-300 text-sm">
                                  {user.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A'}
                                </p>
                              </div>
                            </div>

                            <div className="flex items-center gap-2">
                              <span className="text-xl">📧</span>
                              <div>
                                <p className="text-sm text-gray-400">Status</p>
                                <p className="text-green-300 text-sm font-semibold">Active</p>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3">
                          <Button 
                            onClick={() => handleUserAction(user.id, 'activate')}
                            className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white border-0 transition-all duration-300 hover:scale-105 px-4 py-2 text-sm"
                          >
                            ✅ Activate
                          </Button>
                          <Button 
                            onClick={() => handleUserAction(user.id, 'deactivate')}
                            className="bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-white border-0 transition-all duration-300 hover:scale-105 px-4 py-2 text-sm"
                          >
                            ⏸️ Suspend
                          </Button>
                          <Button 
                            onClick={() => handleUserAction(user.id, 'delete')}
                            className="bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white border-0 transition-all duration-300 hover:scale-105 px-4 py-2 text-sm"
                          >
                            🗑️ Delete
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Quick Actions */}
            <div className="mt-8 p-6 bg-gradient-to-r from-slate-700/50 to-slate-600/50 rounded-lg border border-slate-500/30">
              <h3 className="text-xl font-bold mb-4 text-center bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                ⚡ Quick Actions
              </h3>
              <div className="flex flex-wrap gap-4 justify-center">
                <button className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-300 hover:scale-105">
                  📊 Export Users
                </button>
                <button className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-300 hover:scale-105">
                  ➕ Add User
                </button>
                <button className="bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-300 hover:scale-105">
                  📧 Send Bulk Email
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
