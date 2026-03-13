'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import api from '@/services/api';
import { LogIn, Loader2, ArrowLeft, Key, Mail } from 'lucide-react';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post('/auth/login', { email, password });
      toast.success('Welcome Back, Commander');
      login(res.data.token);
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Unauthorized access');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="page-container">
      <div className="mesh-bg">
        <div className="mesh-orb-1"></div>
        <div className="mesh-orb-2"></div>
      </div>

      <Link href="/" className="back-home">
        <ArrowLeft size={18} /> <span>Gateway</span>
      </Link>
      
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="glass-card"
      >
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div className="header-icon-box">
            <LogIn size={32} color="white" />
          </div>
          <h1 style={{ fontSize: '2.25rem', marginBottom: '0.5rem' }} className="gradient-text">
            Authenticate
          </h1>
          <p style={{ color: 'var(--text-dim)', fontSize: '0.95rem', fontWeight: 500 }}>
            Enter your credentials to access the terminal
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label className="input-label">Identity / Email</label>
            <div className="input-wrapper">
              <Mail className="input-icon" size={20} />
              <input
                type="email"
                className="input-field"
                placeholder="commander@primetrade.ai"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
          
          <div className="input-group" style={{ marginBottom: '2.5rem' }}>
            <label className="input-label">Security Key</label>
            <div className="input-wrapper">
              <Key className="input-icon" size={20} />
              <input
                type="password"
                className="input-field"
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="btn-primary"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                <span>Verifying Identity...</span>
              </>
            ) : (
              <>
                <span>Access Terminal</span>
                <LogIn size={18} />
              </>
            )}
          </button>
        </form>

        <div style={{ 
          marginTop: '2.5rem', 
          paddingTop: '2rem', 
          borderTop: '1px solid var(--glass-border)',
          textAlign: 'center',
          fontSize: '0.85rem'
        }}>
          <span style={{ color: 'var(--text-dim)' }}>New Operative? </span>
          <Link href="/register" className="link-btn">
            Initialize Account
          </Link>
        </div>
      </motion.div>
    </main>
  );
}
