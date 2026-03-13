'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import api from '@/services/api';
import { UserPlus, Loader2, ArrowLeft, ShieldCheck, Mail, Key, UserIcon } from 'lucide-react';
import toast from 'react-hot-toast';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post('/auth/register', { name, email, password, role });
      toast.success('Access Granted. Operative Registered.');
      login(res.data.token);
    } catch (err: any) {
      toast.error(err.response?.data?.error || 'Initialization failed');
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
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="glass-card"
      >
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div className="header-icon-box" style={{ background: 'linear-gradient(135deg, #10b981, #06b6d4)' }}>
            <UserPlus size={32} color="white" />
          </div>
          <h1 style={{ fontSize: '2.25rem', marginBottom: '0.5rem' }} className="gradient-text">
            Join Directive
          </h1>
          <p style={{ color: 'var(--text-dim)', fontSize: '0.95rem', fontWeight: 500 }}>
            Establish your profile in the PrimeTrade network
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label className="input-label">Full Name</label>
            <div className="input-wrapper">
              <UserIcon className="input-icon" size={18} />
              <input
                type="text"
                className="input-field"
                placeholder="Operative Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="input-group">
            <label className="input-label">Identity Email</label>
            <div className="input-wrapper">
              <Mail className="input-icon" size={18} />
              <input
                type="email"
                className="input-field"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="input-group">
            <label className="input-label">Secret Passphrase</label>
            <div className="input-wrapper">
              <Key className="input-icon" size={18} />
              <input
                type="password"
                className="input-field"
                placeholder="Min. 6 alphanumeric"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="input-group">
            <label className="input-label">Classification</label>
            <div className="role-grid">
              <button
                type="button"
                onClick={() => setRole('user')}
                className={`role-btn ${role === 'user' ? 'active' : ''}`}
              >
                Standard
              </button>
              <button
                type="button"
                onClick={() => setRole('admin')}
                className={`role-btn ${role === 'admin' ? 'active' : ''}`}
              >
                <ShieldCheck size={14} /> Admin
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="btn-primary"
            style={{ marginTop: '2rem' }}
            disabled={loading}
          >
            {loading ? <Loader2 className="animate-spin" /> : <ArrowLeft className="rotate-180" size={20} />}
            {loading ? 'Initializing...' : 'Confirm Registration'}
          </button>
        </form>

        <div style={{ 
          marginTop: '2.5rem', 
          paddingTop: '2rem', 
          borderTop: '1px solid var(--glass-border)',
          textAlign: 'center',
          fontSize: '0.85rem'
        }}>
          <span style={{ color: 'var(--text-dim)' }}>Already registered? </span>
          <Link href="/login" className="link-btn">
            Log In
          </Link>
        </div>
      </motion.div>
    </main>
  );
}
