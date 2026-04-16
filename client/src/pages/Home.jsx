import React from 'react';
import { motion } from 'framer-motion';
import RegistrationForm from '../components/RegistrationForm';
import { PartyPopper, Calendar, MapPin, Users, Sparkles, ChevronDown, Music, Utensils, GlassWater } from 'lucide-react';

const Home = () => {
  const scrollToRSVP = () => {
    document.getElementById('rsvp-section').scrollIntoView({ behavior: 'smooth' });
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  return (
    <div className="min-h-screen bg-main transition-colors duration-500">
      {/* Hero Section */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 z-0 bg-hero"
          style={{ 
            backgroundImage: `url('/assets/images/hero_bg.png')`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-slate-900/90" />
        </div>

        {/* Floating Sparks/Effects */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-pink-500 rounded-full blur-sm opacity-40"
              animate={{
                y: [0, -100, 0],
                x: [0, i % 2 === 0 ? 50 : -50, 0],
                opacity: [0.2, 0.6, 0.2]
              }}
              transition={{
                duration: 5 + i,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.5
              }}
              style={{
                top: `${20 + Math.random() * 60}%`,
                left: `${10 + Math.random() * 80}%`,
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-white/20 text-pink-400 font-semibold mb-6 animate-float"
          >
            <Sparkles size={18} />
            <span className="text-sm tracking-wider uppercase">The Event of the Year</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-8xl font-extrabold text-white mb-6 tracking-tight leading-tight"
          >
            A Night to <br />
            <span className="text-gradient">Remember Forever</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-10 font-light"
          >
            Join us for a spectacular evening of music, gourmet dining, and magic under the stars. 
            Exclusively by invitation only.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button 
              onClick={scrollToRSVP}
              className="px-10 py-4 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-full font-bold text-lg hover:shadow-2xl hover:shadow-pink-500/40 transition-all hover:scale-105"
            >
              Reserve My Spot
            </button>
            <a href="#about" className="px-10 py-4 glass text-white rounded-full font-bold text-lg hover:bg-white/10 transition-all">
              Explore More
            </a>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 cursor-pointer"
          onClick={() => document.getElementById('about').scrollIntoView({ behavior: 'smooth' })}
        >
          <ChevronDown size={32} />
        </motion.div>
      </section>

      {/* About/Features Section */}
      <section id="about" className="py-24 bg-main relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div {...fadeInUp} className="glass-card p-8 rounded-3xl text-center">
              <div className="w-16 h-16 bg-pink-500/20 text-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Music size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4">Live Performance</h3>
              <p className="text-slate-400 leading-relaxed">Experience a night filled with soulful music from world-class artists and live bands.</p>
            </motion.div>

            <motion.div {...fadeInUp} transition={{ delay: 0.2 }} className="glass-card p-8 rounded-3xl text-center border-t-2 border-purple-500/20">
              <div className="w-16 h-16 bg-purple-500/20 text-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Utensils size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4">Exquisite Dining</h3>
              <p className="text-slate-400 leading-relaxed">Indulge in a 5-course gourmet dinner curated by our award-winning executive chefs.</p>
            </motion.div>

            <motion.div {...fadeInUp} transition={{ delay: 0.4 }} className="glass-card p-8 rounded-3xl text-center">
              <div className="w-16 h-16 bg-blue-500/20 text-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <GlassWater size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4">Open Bar</h3>
              <p className="text-slate-400 leading-relaxed">Enjoy premium spirits and custom cocktails throughout the night at our exclusive lounge.</p>
            </motion.div>
          </div>

          <div className="mt-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div {...fadeInUp} className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold">Unveiling the <span className="text-gradient">Magic</span></h2>
              <p className="text-lg text-slate-400">
                This year, we're taking the celebration to the Grand Ballroom at Sunset Garden. 
                Prepare yourself for an immersive experience that blends tradition with modern luxury.
              </p>
              <ul className="space-y-4">
                {[
                  { icon: Calendar, text: "December 31st, 2026", color: 'text-pink-500' },
                  { icon: MapPin, text: "Sunset Garden Palace, LA", color: 'text-purple-500' },
                  { icon: Users, text: "Limited to 200 Guests", color: 'text-blue-500' },
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-4 text-slate-300">
                    <div className={`p-2 rounded-lg bg-white/5 ${item.color}`}><item.icon size={20} /></div>
                    <span className="font-medium">{item.text}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative aspect-square rounded-3xl overflow-hidden glass shadow-3xl"
            >
              <img 
                src="https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&q=80&w=800" 
                alt="Atmosphere" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8">
                <p className="text-white text-xl font-bold italic">"An atmosphere like no other, where every detail is a masterpiece."</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* RSVP Section */}
      <section id="rsvp-section" className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-pink-500/5 to-transparent pointer-events-none" />
        <div className="container mx-auto px-6 flex flex-col items-center">
          <motion.div 
            {...fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-4">Ready to <span className="text-gradient">Celebrate?</span></h2>
            <p className="text-slate-400 max-w-xl mx-auto">Fill out the form below to register and receive your invitation card via email. We can't wait to see you there!</p>
          </motion.div>

          <RegistrationForm />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/10 glass">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-500 rounded-xl flex items-center justify-center">
                <PartyPopper className="text-white" size={24} />
              </div>
              <span className="text-2xl font-black tracking-tighter italic">PARTY<span className="text-pink-500 underline decoration-purple-500">INVITE</span></span>
            </div>
            
            <div className="flex gap-8 text-sm text-slate-400 font-medium">
              <a href="#" className="hover:text-pink-500 transition-colors">Safety Guidelines</a>
              <a href="#" className="hover:text-pink-500 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-pink-500 transition-colors">Contact Support</a>
            </div>

            <p className="text-slate-500 text-sm">
              © 2026 Shreya Exclusive Events Co.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
