import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Users, UserPlus, Calendar, ArrowUpRight, TrendingUp, Clock, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

const DashboardOverview = () => {
  const [stats, setStats] = useState({ totalDocs: 0, recent: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('adminToken');
        const res = await axios.get('/api/registrations', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setStats({ 
          totalDocs: res.data.length,
          recent: res.data.slice(0, 5) // Last 5 registrations
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const cards = [
    { label: 'Total Registrations', value: stats.totalDocs, icon: Users, color: 'bg-pink-600', shadow: 'shadow-pink-500/20' },
    { label: 'Recent Bookings', value: stats.recent.length, icon: Clock, color: 'bg-purple-600', shadow: 'shadow-purple-500/20' },
    { label: 'VIP Guests', value: Math.floor(stats.totalDocs * 0.2), icon: TrendingUp, color: 'bg-indigo-600', shadow: 'shadow-indigo-500/20' },
  ];

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="w-10 h-10 border-4 border-pink-500/30 border-t-pink-500 rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((card, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="glass-card p-6 flex items-center justify-between group hover:border-white/20 transition-all cursor-default"
          >
            <div>
              <p className="text-slate-400 text-sm font-medium">{card.label}</p>
              <h3 className="text-3xl font-bold text-white mt-1">{card.value}</h3>
              <div className="flex items-center gap-1 mt-2 text-xs text-green-400">
                <ArrowUpRight size={14} />
                <span>Growth active</span>
              </div>
            </div>
            <div className={`w-14 h-14 ${card.color} rounded-2xl flex items-center justify-center shadow-lg ${card.shadow} group-hover:scale-110 transition-transform`}>
              <card.icon size={28} className="text-white" />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Decorative Chart Placeholder */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass-card p-8 flex flex-col"
        >
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <TrendingUp className="text-pink-500" size={20} /> Registration Trends
            </h3>
            <select className="bg-white/5 border border-white/10 rounded-lg px-3 py-1 text-xs text-slate-300 outline-none">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>
          
          <div className="flex-1 flex items-end gap-2 h-48 px-2">
            {[40, 70, 45, 90, 65, 85, 55].map((height, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                <div 
                  className="w-full bg-gradient-to-t from-pink-600 to-purple-500 rounded-t-lg transition-all duration-500 group-hover:from-pink-400"
                  style={{ height: `${height}%` }}
                />
                <span className="text-[10px] text-slate-500">{['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass-card p-8"
        >
          <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
            <Clock className="text-purple-500" size={20} /> Recent Registrations
          </h3>
          <div className="space-y-4">
            {stats.recent.length > 0 ? stats.recent.map((reg, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-700 overflow-hidden border border-white/10">
                    <img src={`/uploads/${reg.image}`} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{reg.name}</p>
                    <p className="text-xs text-slate-500 flex items-center gap-1">
                      <MapPin size={10} /> {reg.venue}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-pink-500 font-mono">#{reg.registrationId}</p>
                  <p className="text-[10px] text-slate-500">{new Date(reg.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
            )) : (
              <div className="text-center py-10 text-slate-500 text-sm">No recent activity</div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DashboardOverview;
