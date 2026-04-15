import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Search, Eye, Trash2, X, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ManageRegistrations = () => {
  const [registrations, setRegistrations] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const fetchRegistrations = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const res = await axios.get('/api/registrations', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setRegistrations(res.data);
    } catch (err) {
      toast.error('Failed to load registrations');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this registration?')) return;
    try {
      const token = localStorage.getItem('adminToken');
      await axios.delete(`/api/registration/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Registration deleted');
      fetchRegistrations();
    } catch (err) {
      toast.error('Delete failed');
    }
  };

  const filteredRegistrations = registrations.filter(reg => 
    reg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    reg.registrationId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    reg.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
          <input 
            type="text" 
            placeholder="Search by name, ID or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 outline-none focus:border-pink-500 text-white"
          />
        </div>
        <div className="text-slate-400 text-sm">
          Showing {filteredRegistrations.length} of {registrations.length} bookings
        </div>
      </div>

      <div className="overflow-x-auto glass-card rounded-2xl border border-white/10">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-white/5 border-b border-white/10">
              <th className="px-6 py-4 text-sm font-semibold text-slate-300">Photo</th>
              <th className="px-6 py-4 text-sm font-semibold text-slate-300">Reg ID</th>
              <th className="px-6 py-4 text-sm font-semibold text-slate-300">Full Name</th>
              <th className="px-6 py-4 text-sm font-semibold text-slate-300">Gender</th>
              <th className="px-6 py-4 text-sm font-semibold text-slate-300">Email</th>
              <th className="px-6 py-4 text-sm font-semibold text-slate-300">Phone</th>
              <th className="px-6 py-4 text-sm font-semibold text-slate-300">Date</th>
              <th className="px-6 py-4 text-sm font-semibold text-slate-300">Guests</th>
              <th className="px-6 py-4 text-sm font-semibold text-slate-300">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filteredRegistrations.map((reg) => (
              <tr key={reg._id} className="hover:bg-white/5 transition-colors">
                <td className="px-6 py-4">
                  <img 
                    src={`/uploads/${reg.image}`} 
                    alt="User" 
                    className="w-12 h-12 rounded-full object-cover border-2 border-pink-500/20"
                  />
                </td>
                <td className="px-6 py-4 font-mono text-xs text-pink-400">{reg.registrationId}</td>
                <td className="px-6 py-4 text-white font-medium">{reg.name}</td>
                <td className="px-6 py-4 text-slate-400">{reg.gender}</td>
                <td className="px-6 py-4 text-slate-400">{reg.email}</td>
                <td className="px-6 py-4 text-slate-400">{reg.mobile}</td>
                <td className="px-6 py-4 text-slate-400">{new Date(reg.date).toLocaleDateString()}</td>
                <td className="px-6 py-4 text-center">
                  <span className="px-2 py-1 bg-pink-500/10 text-pink-400 rounded-md text-xs font-bold">
                    {reg.totalMembers}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button 
                      onClick={() => setSelectedUser(reg)}
                      className="p-2 bg-indigo-500/10 text-indigo-400 rounded-lg hover:bg-indigo-500 hover:text-white transition-all"
                      title="View Details"
                    >
                      <Eye size={18} />
                    </button>
                    <button 
                      onClick={() => handleDelete(reg._id)}
                      className="p-2 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-all"
                      title="Delete"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredRegistrations.length === 0 && !loading && (
          <div className="py-20 text-center text-slate-500">
            No registrations found
          </div>
        )}
      </div>

      {/* User Details Modal */}
      <AnimatePresence>
        {selectedUser && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedUser(null)}
              className="absolute inset-0 bg-[#000]/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-2xl glass-card border border-white/20 p-8 shadow-2xl overflow-hidden"
            >
              <div className="absolute top-4 right-4 focus:outline-none">
                <button onClick={() => setSelectedUser(null)} className="p-2 hover:bg-white/10 rounded-full transition-colors text-slate-400">
                  <X size={24} />
                </button>
              </div>

              <div className="flex flex-col md:flex-row gap-8">
                <div className="w-full md:w-1/3">
                  <img 
                    src={`/uploads/${selectedUser.image}`} 
                    alt={selectedUser.name}
                    className="w-full aspect-square rounded-2xl object-cover border-4 border-white/10 shadow-xl"
                  />
                  <div className="mt-4 p-4 bg-white/5 rounded-xl border border-white/5 text-center">
                    <p className="text-xs text-slate-500 uppercase tracking-widest">Reg ID</p>
                    <p className="text-lg font-bold text-pink-500 font-mono">{selectedUser.registrationId}</p>
                  </div>
                </div>

                <div className="flex-1 space-y-6">
                  <div>
                    <h3 className="text-2xl font-extrabold text-white">{selectedUser.name}</h3>
                    <p className="text-pink-500 font-medium">Invitation Status: confirmed</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-slate-500">Gender</p>
                      <p className="text-white">{selectedUser.gender}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Age</p>
                      <p className="text-white">{selectedUser.age} Years</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Venue</p>
                      <p className="text-white">{selectedUser.venue}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Date</p>
                      <p className="text-white">{new Date(selectedUser.date).toLocaleDateString()}</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs text-slate-500">Email Address</p>
                    <p className="text-white">{selectedUser.email}</p>
                  </div>

                  <div>
                    <p className="text-xs text-slate-500">Contact Number</p>
                    <p className="text-white">{selectedUser.mobile}</p>
                  </div>

                  <div>
                    <p className="text-xs text-slate-500">Residential Address</p>
                    <p className="text-white text-sm line-clamp-3">{selectedUser.address}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ManageRegistrations;
