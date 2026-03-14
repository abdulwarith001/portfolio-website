import React, { useState } from 'react';
import { GithubIcon, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

const XIcon = ({ size = 20, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const WhatsAppIcon = ({ size = 20, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const SimpleContact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'
  const [errors, setErrors] = useState({});

  const socials = [
    { name: 'X', icon: XIcon, url: 'https://x.com/enigmare_' },
    { name: 'Github', icon: GithubIcon, url: 'https://github.com/abdulwarith001' },
    { name: 'WhatsApp', icon: WhatsAppIcon, url: 'https://wa.me/+2348147801152' },
  ];

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setStatus('loading');
    
    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
    
    if (!accessKey) {
      console.error("Web3Forms Access Key is missing in .env file");
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
      return;
    }
    
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: accessKey,
          name: formData.name,
          email: formData.email,
          message: formData.message,
          from_name: "Portfolio Contact Form",
          subject: `New Message from ${formData.name}`,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
        // Reset back to idle after 5 seconds
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        console.error("Web3Forms Error:", result);
        setStatus('error');
        setTimeout(() => setStatus('idle'), 5000);
      }
    } catch (error) {
      console.error("Form Submission Error:", error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <section id="contact" className="py-12 md:py-32 px-6 bg-white border-t border-gray-50">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <div className="space-y-4">
          <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-300">
            Get In Touch
          </h2>
          <h3 className="text-4xl md:text-6xl font-black tracking-tighter text-black leading-tight">
            Let's start a <br className="hidden md:block" />
            <span className="text-indigo-600 italic">conversation.</span>
          </h3>
        </div>

        {/* Contact info grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-4">
          <div className="space-y-8">
            <div className="space-y-2">
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Email me at</p>
              <a href="mailto:hello@enigmare.xyz" className="text-2xl font-bold text-black border-b-2 border-transparent hover:border-black transition-all">
                hello@enigmare.xyz
              </a>
            </div>
            <div className="space-y-2">
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Socials</p>
              <div className="flex space-x-6 pt-2">
                {socials.map((social) => (
                  <a 
                    key={social.name} 
                    href={social.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-2.5 bg-gray-50 rounded-xl text-gray-600 hover:text-black hover:bg-gray-100 transition-all border border-gray-100 hover:border-black active:scale-95 group"
                    aria-label={social.name}
                  >
                    <social.icon size={20} className="group-hover:scale-110 transition-transform" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Minimal Form */}
          <div className="relative">
            {status === 'success' ? (
              <div className="absolute inset-0 z-10 bg-white flex flex-col items-center justify-center text-center space-y-4 animate-fade-in">
                <CheckCircle2 className="text-green-500 w-16 h-16" />
                <h4 className="text-2xl font-bold text-black">Message Sent!</h4>
                <p className="text-gray-500">Thank you for reaching out. I'll get back to you soon.</p>
                <button 
                  onClick={() => setStatus('idle')}
                  className="text-xs font-bold uppercase tracking-widest text-indigo-600 hover:text-indigo-700 pt-4"
                >
                  Send another message
                </button>
              </div>
            ) : null}

            <form onSubmit={handleSubmit} className={`space-y-6 transition-opacity duration-300 ${status === 'success' ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Name" 
                    disabled={status === 'loading'}
                    className={`w-full pb-3 bg-transparent border-b ${errors.name ? 'border-red-400' : 'border-gray-200'} focus:border-black outline-none transition-colors text-sm font-medium text-black disabled:opacity-50`} 
                  />
                  {errors.name && <p className="text-[10px] text-red-500 font-bold uppercase tracking-wider">{errors.name}</p>}
                </div>
                <div className="space-y-1">
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email" 
                    disabled={status === 'loading'}
                    className={`w-full pb-3 bg-transparent border-b ${errors.email ? 'border-red-400' : 'border-gray-200'} focus:border-black outline-none transition-colors text-sm font-medium text-black disabled:opacity-50`} 
                  />
                   {errors.email && <p className="text-[10px] text-red-500 font-bold uppercase tracking-wider">{errors.email}</p>}
                </div>
              </div>
              <div className="space-y-1">
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Message" 
                  rows="4" 
                  disabled={status === 'loading'}
                  className={`w-full pb-3 bg-transparent border-b ${errors.message ? 'border-red-400' : 'border-gray-200'} focus:border-black outline-none transition-colors text-sm font-medium text-black resize-none disabled:opacity-50`}
                ></textarea>
                {errors.message && <p className="text-[10px] text-red-500 font-bold uppercase tracking-wider">{errors.message}</p>}
              </div>

              {status === 'error' && (
                <div className="flex items-center space-x-2 text-red-500 bg-red-50 p-3 rounded-lg animate-shake">
                  <AlertCircle size={16} />
                  <span className="text-xs font-bold">Something went wrong. Please try again.</span>
                </div>
              )}

              <button 
                type="submit"
                disabled={status === 'loading'}
                className="group w-full md:w-auto px-8 py-4 bg-black text-white text-[10px] font-bold uppercase tracking-[0.25em] rounded-full hover:bg-gray-800 transition-all active:scale-95 shadow-xl shadow-black/10 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center space-x-3"
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 size={14} className="animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <span>Send Message</span>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SimpleContact;
