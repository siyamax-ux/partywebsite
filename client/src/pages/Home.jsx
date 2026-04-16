import React from 'react';
import { motion } from 'framer-motion';
import RegistrationForm from '../components/RegistrationForm';
import { PartyPopper } from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10"
      >
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-pink-500 rounded-full shadow-lg shadow-pink-500/50">
            <PartyPopper size={40} className="text-white" />
          </div>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          Grand <span className="text-pink-500">Party</span> Invitation
        </h1>
        <p className="mt-4 text-lg text-slate-300 max-w-2xl">
          Register now to secure your spot at the most exclusive event of the year!
        </p>
      </motion.div>

      <RegistrationForm />
      
      <footer className="mt-12 text-slate-500 text-sm">
        © 2026 developed by Shreya Exclusive Events Co. All rights reserved.
      </footer>
    </div>
  );
};

export default Home;
