'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { LogOut, User, CheckSquare } from 'lucide-react';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav style={{
      position: 'fixed',
      top: '1.5rem',
      left: '50%',
      transform: 'translateX(-50%)',
      width: 'calc(100% - 3rem)',
      maxWidth: '1400px',
      zIndex: 100,
      background: 'rgba(15, 23, 42, 0.4)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      border: '1px solid rgba(255, 255, 255, 0.08)',
      borderRadius: '20px',
      padding: '0.75rem 1.5rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'between',
      boxShadow: '0 10px 30px -10px rgba(0,0,0,0.5)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
        <Link href="/" style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '0.75rem', 
          fontWeight: 800, 
          fontSize: '1.25rem',
          letterSpacing: '-0.02em',
          textDecoration: 'none',
          color: 'white'
        }}>
          <div style={{ 
            width: '32px', 
            height: '32px', 
            background: 'var(--primary)', 
            borderRadius: '8px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)'
          }}>
            <CheckSquare size={18} color="white" />
          </div>
          <span>Prime<span style={{ color: 'var(--primary)' }}>Trade</span></span>
        </Link>

        {user && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.75rem', 
              background: 'rgba(255,255,255,0.03)', 
              padding: '0.5rem 1rem', 
              borderRadius: '12px',
              border: '1px solid rgba(255,255,255,0.05)'
            }}>
              <div style={{ 
                width: '28px', 
                height: '28px', 
                borderRadius: '50%', 
                background: 'rgba(99, 102, 241, 0.1)', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                color: 'var(--primary)'
              }}>
                <User size={14} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <Link href="/profile" style={{ textDecoration: 'none', color: 'inherit' }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'white', cursor: 'pointer' }} onMouseOver={(e) => e.currentTarget.style.color = 'var(--primary)'} onMouseOut={(e) => e.currentTarget.style.color = 'white'}>{user.name}</span>
                </Link>
                <span style={{ fontSize: '0.65rem', fontWeight: 600, color: 'var(--text-dim)', textTransform: 'uppercase' }}>{user.role}</span>
              </div>
            </div>
            
            <button 
              onClick={logout}
              style={{ 
                background: 'rgba(239, 68, 68, 0.1)', 
                color: '#ef4444', 
                border: '1px solid rgba(239, 68, 68, 0.2)',
                padding: '0.6rem 1rem',
                borderRadius: '12px',
                fontSize: '0.85rem',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = 'rgba(239, 68, 68, 0.2)';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <LogOut size={16} />
              <span>Logout</span>
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
