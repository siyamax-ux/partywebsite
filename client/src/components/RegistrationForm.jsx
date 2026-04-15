import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Upload, Calendar, User, Mail, Phone, MapPin, Hash, Trash2, PartyPopper, Users, RefreshCw, Volume2, Camera, X } from 'lucide-react';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: '', address: '', email: '', mobile: '', age: '',
    gender: '', date: '', venue: '', totalMembers: 1,
  });

  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [captchaCode, setCaptchaCode] = useState('');
  const [userCaptcha, setUserCaptcha] = useState('');
  const [loading, setLoading] = useState(false);
  const [isCameraOpen, setIsCameraOpen] = useState(false);

  const canvasRef = useRef(null);
  const videoRef = useRef(null);
  const webcamCanvasRef = useRef(null);

  useEffect(() => {
    generateCaptcha();
  }, []);

  const generateCaptcha = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789';
    let result = '';
    for (let i = 0; i < 6; i++) result += chars.charAt(Math.floor(Math.random() * chars.length));
    setCaptchaCode(result);
    drawCaptcha(result);
    setUserCaptcha('');
  };

  const drawCaptcha = (text) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#f3f4f6';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < 5; i++) {
        ctx.strokeStyle = `rgba(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255},0.3)`;
        ctx.beginPath();
        ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
        ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
        ctx.stroke();
    }
    ctx.font = 'bold 30px "Comic Sans MS", cursive, sans-serif';
    ctx.textBaseline = 'middle';
    for (let i = 0; i < text.length; i++) {
        const x = 20 + i * 25;
        const y = canvas.height / 2 + (Math.random() * 10 - 5);
        const angle = (Math.random() * 30 - 15) * Math.PI / 180;
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(angle);
        ctx.fillStyle = '#1f2937';
        ctx.fillText(text[i], 0, 0);
        ctx.restore();
    }
  };

  // Camera Functions
  const startCamera = async () => {
    setIsCameraOpen(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      toast.error("Could not access camera");
      setIsCameraOpen(false);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach(track => track.stop());
    }
    setIsCameraOpen(false);
  };

  const takePhoto = () => {
    const video = videoRef.current;
    const canvas = webcamCanvasRef.current;
    if (video && canvas) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      canvas.toBlob((blob) => {
        const file = new File([blob], "captured-photo.jpg", { type: "image/jpeg" });
        setImage(file);
        setImagePreview(URL.createObjectURL(blob));
        stopCamera();
      }, 'image/jpeg');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) return toast.error('Image size too large');
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.gender) return toast.error('Please select gender');
    if (!image) return toast.error('Please upload photo');
    if (userCaptcha.toLowerCase() !== captchaCode.toLowerCase()) return toast.error('Incorrect CAPTCHA');

    setLoading(true);
    const data = new FormData();
    Object.keys(formData).forEach(key => data.append(key, formData[key]));
    data.append('image', image);

    try {
      const response = await axios.post('/api/register', data);
      toast.success(response.data.message);
      setFormData({ name: '', address: '', email: '', mobile: '', age: '', gender: '', date: '', venue: '', totalMembers: 1 });
      setImage(null); setImagePreview(null);
      generateCaptcha();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed');
    } finally {
      setLoading(false);
    }
  };

  const inputClasses = "w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 outline-none focus:border-pink-500 text-white transition-all";
  const labelClasses = "block text-sm font-medium text-slate-300 mb-1 flex items-center gap-2";

  return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-3xl glass p-8 rounded-2xl shadow-2xl relative">
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className={labelClasses}><User size={16} /> Full Name</label>
          <input type="text" name="name" required value={formData.name} onChange={handleInputChange} className={inputClasses} />
        </div>
        <div>
          <label className={labelClasses}><Mail size={16} /> Email</label>
          <input type="email" name="email" required value={formData.email} onChange={handleInputChange} className={inputClasses} />
        </div>
        <div>
          <label className={labelClasses}><Phone size={16} /> Mobile</label>
          <input type="tel" name="mobile" required value={formData.mobile} onChange={handleInputChange} className={inputClasses} maxLength="10" />
        </div>
        <div>
          <label className={labelClasses}><Hash size={16} /> Age</label>
          <input type="number" name="age" required value={formData.age} onChange={handleInputChange} className={inputClasses} />
        </div>
        <div>
          <label className={labelClasses}><Users size={16} /> Guests</label>
          <input type="number" name="totalMembers" required min="1" value={formData.totalMembers} onChange={handleInputChange} className={inputClasses} />
        </div>
        <div>
          <label className={labelClasses}>Gender</label>
          <div className="flex gap-4 mt-2">
            {['Male', 'Female', 'Other'].map((g) => (
              <label key={g} className="flex items-center gap-2 cursor-pointer group">
                <input type="radio" name="gender" value={g} checked={formData.gender === g} onChange={handleInputChange} className="hidden" />
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${formData.gender === g ? 'border-pink-500 bg-pink-500' : 'border-white/30'}`}>
                  {formData.gender === g && <div className="w-2 h-2 bg-white rounded-full" />}
                </div>
                <span className="text-slate-300 group-hover:text-white transition-colors">{g}</span>
              </label>
            ))}
          </div>
        </div>
        <div>
          <label className={labelClasses}><Calendar size={16} /> Date</label>
          <input type="date" name="date" required value={formData.date} onChange={handleInputChange} className={inputClasses} />
        </div>
        <div>
          <label className={labelClasses}><MapPin size={16} /> Venue</label>
          <select name="venue" required value={formData.venue} onChange={handleInputChange} className={inputClasses}>
            <option value="">Select...</option>
            <option value="Grand Ballroom">Grand Ballroom</option>
            <option value="Sunset Garden">Sunset Garden</option>
          </select>
        </div>
        <div className="md:col-span-2">
          <label className={labelClasses}>Address</label>
          <textarea name="address" required rows="2" value={formData.address} onChange={handleInputChange} className={inputClasses} />
        </div>

        {/* PHOTO AREA */}
        <div className="md:col-span-2">
          <label className={labelClasses}><Camera size={16} /> Invitation Photo</label>
          <div className="mt-2 flex flex-col md:flex-row items-center gap-6 bg-white/5 p-4 rounded-xl border border-white/10">
            <div className={`w-40 h-40 rounded-lg border-2 border-dashed border-white/20 flex items-center justify-center relative overflow-hidden bg-black/20`}>
              {imagePreview ? (
                <>
                  <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                  <button type="button" onClick={() => { setImage(null); setImagePreview(null); }} className="absolute top-2 right-2 p-1 bg-red-500 rounded-full text-white">
                    <X size={16} />
                  </button>
                </>
              ) : (
                <div className="text-center text-slate-500">
                  <Camera size={40} className="mx-auto mb-2 opacity-20" />
                  <span className="text-xs italic">No photo captured</span>
                </div>
              )}
            </div>
            
            <div className="flex flex-col gap-3 w-full md:w-auto">
                <button type="button" onClick={startCamera} className="px-6 py-3 bg-pink-600 hover:bg-pink-500 text-white rounded-lg flex items-center gap-2 transition-all font-medium whitespace-nowrap">
                    <Camera size={18} /> Open Live Camera
                </button>
                <div className="relative">
                    <button type="button" className="w-full px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg flex items-center gap-2 transition-all font-medium border border-white/10">
                        <Upload size={18} /> Choose From Files
                    </button>
                    <input type="file" onChange={handleImageChange} className="absolute inset-0 opacity-0 cursor-pointer" accept="image/*" title="" />
                </div>
            </div>
          </div>
        </div>

        {/* CAPTCHA */}
        <div className="md:col-span-2 bg-white/5 p-6 rounded-xl border border-white/10 flex flex-col items-center gap-4">
            <div className="flex items-center gap-4">
                <div className="bg-white rounded-lg p-1 border-2 border-slate-300">
                    <canvas ref={canvasRef} width="180" height="60" />
                </div>
                <button type="button" onClick={generateCaptcha} className="p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all">
                    <RefreshCw size={20} />
                </button>
            </div>
            <input 
                type="text" required placeholder="Type the word above" value={userCaptcha} 
                onChange={(e) => setUserCaptcha(e.target.value)} 
                className="w-full max-w-xs bg-white border border-slate-300 rounded-md px-4 py-2 text-slate-900 font-bold tracking-widest text-center focus:ring-2 focus:ring-pink-500 outline-none"
            />
        </div>

        <div className="md:col-span-2 mt-4">
          <button type="submit" disabled={loading} className={`w-full bg-gradient-to-r from-pink-600 to-purple-600 text-white font-bold py-4 rounded-xl shadow-lg flex items-center justify-center gap-2 ${loading ? 'opacity-70' : ''}`}>
            {loading ? <div className="w-6 h-6 border-4 border-t-white rounded-full animate-spin" /> : <>Book Now <PartyPopper size={20} /></>}
          </button>
        </div>
      </form>

      {/* CAMERA MODAL */}
      <AnimatePresence>
        {isCameraOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={stopCamera} />
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative bg-[#1e1b4b] p-6 rounded-2xl border border-white/20 w-full max-w-md shadow-2xl">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2"><Camera className="text-pink-500" /> Live Capture</h3>
              <div className="relative aspect-video bg-black rounded-lg overflow-hidden border border-white/10 mb-6">
                <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
                <canvas ref={webcamCanvasRef} className="hidden" />
              </div>
              <div className="flex gap-4">
                <button type="button" onClick={takePhoto} className="flex-1 py-3 bg-pink-600 hover:bg-pink-500 text-white font-bold rounded-xl transition-all">Capture Photo</button>
                <button type="button" onClick={stopCamera} className="px-6 py-3 bg-white/10 text-white font-bold rounded-xl">Cancel</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default RegistrationForm;
