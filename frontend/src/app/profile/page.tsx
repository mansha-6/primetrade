'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import api from '@/services/api';
import Navbar from '@/components/Navbar';
import { User, Mail, Shield, Save, Loader2, ArrowLeft, Settings } from 'lucide-react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function ProfilePage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      router.replace('/login');
    } else if (user) {
      setFormData({
        name: user.name,
        email: user.email,
      });
    }
  }, [user, authLoading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const loadId = toast.loading('Synchronizing profile data...');

    try {
      await api.put('/auth/updatedetails', formData);
      toast.success('Identity profile updated successfully', { id: loadId });
      // In a real app, you might want to refresh the user context here
      // For now, we'll just show the success message
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Update failed', { id: loadId });
    } finally {
      setLoading(false);
    }
  };

  if (authLoading || !user) {
    return (
      <div className="page-container">
        <Loader2 className="animate-spin text-primary" size={48} />
      </div>
    );
  }

  return (
    <div className="page-container" style={{ justifyContent: 'flex-start', paddingBottom: '5rem' }}>
      <div className="mesh-bg">
        <div className="mesh-orb-1"></div>
        <div className="mesh-orb-2"></div>
      </div>
      
      <Navbar />
      
      <main className="container-max" style={{ marginTop: '8rem', maxWidth: '800px' }}>
        <Link href="/dashboard" className="back-home" style={{ position: 'relative', top: 0, left: 0, marginBottom: '2rem' }}>
          <ArrowLeft size={18} /> <span>Return to Nexus</span>
        </Link>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card"
          style={{ padding: '3rem' }}
        >
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div className="header-icon-box">
              <Settings size={32} color="white" />
            </div>
            <h1 className="gradient-text" style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Profile Settings</h1>
            <p style={{ color: 'var(--text-dim)', fontWeight: 500 }}>Manage your operative identification and security parameters</p>
          </div>

          <form onSubmit={handleSubmit} style={{ maxWidth: '500px', margin: '0 auto' }}>
            <div className="input-group">
              <label className="input-label">Operative Name</label>
              <div className="input-wrapper">
                <User className="input-icon" size={20} />
                <input
                  type="text"
                  className="input-field"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="input-group">
              <label className="input-label">Identity Email</label>
              <div className="input-wrapper">
                <Mail className="input-icon" size={20} />
                <input
                  type="email"
                  className="input-field"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="input-group">
              <label className="input-label">Classification Level</label>
              <div className="input-wrapper">
                <Shield className="input-icon" size={20} />
                <input
                  type="text"
                  className="input-field"
                  value={user.role.toUpperCase()}
                  disabled
                  style={{ opacity: 0.6, cursor: 'not-allowed' }}
                />
              </div>
              <p style={{ fontSize: '0.65rem', color: 'var(--text-dim)', marginTop: '0.5rem' }}>* Security role can only be modified by root administrators.</p>
            </div>

            <button
              type="submit"
              className="btn-primary"
              style={{ marginTop: '3rem' }}
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  <span>Synchronizing...</span>
                </>
              ) : (
                <>
                  <Save size={20} />
                  <span>Update Profile</span>
                </>
              )}
            </button>
          </form>
        </motion.div>
      </main>
    </div>
  );
}
