'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Shield, Zap, Layout, Terminal } from 'lucide-react';

export default function Home() {
  return (
    <main className="page-container" style={{ textAlign: 'center' }}>
      <div className="mesh-bg">
        <div className="mesh-orb-1" style={{ background: 'radial-gradient(circle, rgba(99, 102, 241, 0.2) 0%, transparent 70%)' }}></div>
        <div className="mesh-orb-2" style={{ background: 'radial-gradient(circle, rgba(6, 182, 212, 0.15) 0%, transparent 70%)' }}></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{ maxWidth: '900px', margin: '0 auto' }}
      >
        <div style={{ 
          display: 'inline-flex', 
          alignItems: 'center', 
          gap: '0.75rem', 
          background: 'rgba(99, 102, 241, 0.1)', 
          padding: '0.5rem 1.25rem', 
          borderRadius: '100px',
          border: '1px solid rgba(99, 102, 241, 0.2)',
          marginBottom: '2.5rem'
        }}>
          <Terminal size={16} className="text-primary" />
          <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--primary)' }}>
            Backend Developer Systems v1.0
          </span>
        </div>

        <h1 style={{ fontSize: 'clamp(2.5rem, 8vw, 5rem)', fontWeight: 800, lineHeight: 1, marginBottom: '2rem' }}>
          Secure Task <br />
          <span className="gradient-text">Management Nexus</span>
        </h1>

        <p style={{ color: 'var(--text-dim)', fontSize: '1.25rem', maxWidth: '700px', margin: '0 auto 3.5rem', lineHeight: 1.6, fontWeight: 500 }}>
          An enterprise-grade REST architecture with JWT authorization, 
          role-based operational access, and a premium glassmorphism interface.
        </p>
        
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', justifyContent: 'center' }}>
          <Link href="/register" className="btn-primary" style={{ width: 'auto', padding: '1.25rem 2.5rem', fontSize: '1.1rem' }}>
            Initialize Access <ArrowRight size={20} />
          </Link>
          <Link href="/login" className="role-btn" style={{ padding: '1.25rem 2.5rem', fontSize: '1.1rem', background: 'transparent' }}>
            Operative Login
          </Link>
        </div>
      </motion.div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
        gap: '2rem', 
        marginTop: '6rem', 
        width: '100%', 
        maxWidth: '1200px' 
      }}>
        {[
          { icon: <Shield color="#6366f1" size={32} />, title: 'JWT Security', desc: 'Secure token-based authentication with encrypted handshakes and session persistence.' },
          { icon: <Zap color="#f59e0b" size={32} />, title: 'Parallel API', desc: 'Optimized Node.js backend capable of multi-threaded request handling and low latency.' },
          { icon: <Layout color="#06b6d4" size={32} />, title: 'Hyper UI', desc: 'Blur-accelerated layouts with hardware-accelerated animations for smooth transitions.' }
        ].map((feature, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 + i * 0.1 }}
            className="stat-card"
            style={{ textAlign: 'left', padding: '2.5rem' }}
          >
            <div style={{ marginBottom: '1.5rem' }}>{feature.icon}</div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1rem' }}>{feature.title}</h3>
            <p style={{ color: 'var(--text-dim)', lineHeight: 1.6 }}>{feature.desc}</p>
          </motion.div>
        ))}
      </div>
    </main>
  );
}
