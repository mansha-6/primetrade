'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import api from '@/services/api';
import Navbar from '@/components/Navbar';
import { Plus, Trash2, Edit2, Loader2, CheckCircle2, Clock, PlayCircle, BarChart3, LayoutGrid, List, Search, Filter } from 'lucide-react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

interface Task {
  _id: string;
  title: string;
  description: string;
  status: string;
  user?: { name: string; email: string };
}

export default function DashboardPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && !user) {
      router.replace('/login');
    }
  }, [user, authLoading, router]);

  const [tasks, setTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [formData, setFormData] = useState({ title: '', description: '', status: 'pending' });
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  // Search and Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    if (user) {
      fetchTasks();
    }
  }, [user]);

  useEffect(() => {
    applyFilters();
  }, [tasks, searchQuery, statusFilter]);

  const fetchTasks = async () => {
    try {
      const res = await api.get('/tasks');
      setTasks(res.data.data);
    } catch (err) {
      toast.error('Data link failed');
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let result = [...tasks];

    // Filter by status
    if (statusFilter !== 'all') {
      result = result.filter(task => task.status === statusFilter);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(task => 
        task.title.toLowerCase().includes(query) || 
        task.description.toLowerCase().includes(query)
      );
    }

    setFilteredTasks(result);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const loadId = toast.loading(editingTask ? 'Updating record...' : 'Creating record...');
    try {
      if (editingTask) {
        await api.put(`/tasks/${editingTask._id}`, formData);
        toast.success('Record synchronized', { id: loadId });
      } else {
        await api.post('/tasks', formData);
        toast.success('Record initialized', { id: loadId });
      }
      fetchTasks();
      closeModal();
    } catch (err: any) {
      toast.error('Sync failed', { id: loadId });
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Permanently delete this record?')) {
      const loadId = toast.loading('Deleting...');
      try {
        await api.delete(`/tasks/${id}`);
        toast.success('Record purged', { id: loadId });
        fetchTasks();
      } catch (err) {
        toast.error('Purge failed', { id: loadId });
      }
    }
  };

  const openModal = (task: Task | null = null) => {
    if (task) {
      setEditingTask(task);
      setFormData({ title: task.title, description: task.description, status: task.status });
    } else {
      setEditingTask(null);
      setFormData({ title: '', description: '', status: 'pending' });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingTask(null);
  };

  const stats = {
    total: tasks.length,
    completed: tasks.filter(t => t.status === 'completed').length,
    pending: tasks.filter(t => t.status === 'pending').length,
    inProgress: tasks.filter(t => t.status === 'in-progress').length,
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
      
      <main className="container-max" style={{ marginTop: '5rem' }}>
        <header className="dashboard-header">
          <div>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 800 }} className="gradient-text">Operations Center</h1>
            <p style={{ color: 'var(--text-dim)', marginTop: '0.5rem' }}> Welcome back, <b>{user.name}</b>. Classification: <b>{user.role}</b></p>
          </div>
          
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
             <button onClick={() => openModal()} className="btn-primary" style={{ width: 'auto', padding: '0.75rem 1.5rem' }}>
                <Plus size={20} />
                New Task
              </button>
          </div>
        </header>

        {/* Search and Filter Bar */}
        <section className="glass-card" style={{ padding: '1.5rem', marginBottom: '2rem', display: 'flex', gap: '1.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <div className="input-wrapper" style={{ flex: 1, minWidth: '250px' }}>
            <Search className="input-icon" size={18} />
            <input 
              type="text" 
              className="input-field" 
              placeholder="Search tasks by title or intel..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            <Filter size={18} className="text-dim" />
            <div className="role-grid" style={{ marginBottom: 0, gap: '0.5rem' }}>
              {['all', 'pending', 'in-progress', 'completed'].map((f) => (
                <button
                  key={f}
                  onClick={() => setStatusFilter(f)}
                  className={`role-btn ${statusFilter === f ? 'active' : ''}`}
                  style={{ padding: '0.5rem 1rem', fontSize: '0.65rem' }}
                >
                  {f === 'all' ? 'All Units' : f.replace('-', ' ')}
                </button>
              ))}
            </div>
          </div>

          <div style={{ 
               background: 'rgba(255,255,255,0.05)', 
               padding: '0.25rem', 
               borderRadius: '12px', 
               display: 'flex', 
               border: '1px solid var(--glass-border)' 
             }}>
                <button 
                  onClick={() => setViewMode('grid')}
                  style={{ 
                    padding: '0.5rem', 
                    borderRadius: '8px', 
                    background: viewMode === 'grid' ? 'var(--primary)' : 'transparent',
                    color: viewMode === 'grid' ? 'white' : 'var(--text-dim)',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  <LayoutGrid size={16} />
                </button>
                <button 
                  onClick={() => setViewMode('list')}
                  style={{ 
                    padding: '0.5rem', 
                    borderRadius: '8px', 
                    background: viewMode === 'list' ? 'var(--primary)' : 'transparent',
                    color: viewMode === 'list' ? 'white' : 'var(--text-dim)',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  <List size={16} />
                </button>
             </div>
        </section>

        <section className="stats-grid">
          {[
            { label: 'Total Tasks', value: stats.total, color: '#6366f1', icon: <BarChart3 /> },
            { label: 'Completed', value: stats.completed, color: '#10b981', icon: <CheckCircle2 /> },
            { label: 'In Progress', value: stats.inProgress, color: '#f59e0b', icon: <PlayCircle /> },
            { label: 'Pending', value: stats.pending, color: '#94a3b8', icon: <Clock /> },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="stat-card"
            >
              <div style={{ color: stat.color, marginBottom: '1rem' }}>{stat.icon}</div>
              <div style={{ fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-dim)' }}>{stat.label}</div>
              <div style={{ fontSize: '2rem', fontWeight: 800, marginTop: '0.25rem' }}>{stat.value}</div>
            </motion.div>
          ))}
        </section>

        <section className={viewMode === 'grid' ? 'task-grid' : 'task-list'}>
          <AnimatePresence mode="popLayout">
            {filteredTasks.map((task) => (
              <motion.div
                key={task._id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="glass-card"
                style={{ 
                  padding: '2rem', 
                  maxWidth: viewMode === 'list' ? '100%' : 'none',
                  display: viewMode === 'list' ? 'flex' : 'block',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                    <span style={{ 
                      fontSize: '0.6rem', 
                      fontWeight: 900, 
                      textTransform: 'uppercase', 
                      padding: '0.4rem 0.8rem', 
                      borderRadius: '100px',
                      background: task.status === 'completed' ? 'rgba(16, 185, 129, 0.1)' : task.status === 'in-progress' ? 'rgba(245, 158, 11, 0.1)' : 'rgba(148, 163, 184, 0.1)',
                      color: task.status === 'completed' ? '#10b981' : task.status === 'in-progress' ? '#f59e0b' : '#94a3b8',
                      border: `1px solid ${task.status === 'completed' ? 'rgba(16, 185, 129, 0.2)' : task.status === 'in-progress' ? 'rgba(245, 158, 11, 0.2)' : 'rgba(148, 163, 184, 0.2)'}`
                    }}>
                      {task.status}
                    </span>
                    {user.role === 'admin' && task.user && (
                      <span style={{ fontSize: '0.7rem', color: 'var(--primary)', fontWeight: 700 }}>@{task.user.name}</span>
                    )}
                  </div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>{task.title}</h3>
                  <p style={{ color: 'var(--text-dim)', fontSize: '0.85rem', lineHeight: '1.6' }}>{task.description}</p>
                </div>
                
                <div style={{ 
                  display: 'flex', 
                  gap: '0.5rem', 
                  marginTop: viewMode === 'grid' ? '2rem' : '0',
                  marginLeft: viewMode === 'grid' ? '0' : '2rem',
                  borderTop: viewMode === 'grid' ? '1px solid var(--glass-border)' : 'none',
                  paddingTop: viewMode === 'grid' ? '1.5rem' : '0'
                }}>
                  <button onClick={() => openModal(task)} style={{ 
                    flex: 1, 
                    padding: '0.6rem', 
                    borderRadius: '10px', 
                    background: 'rgba(99, 102, 241, 0.05)', 
                    color: 'var(--primary)', 
                    border: '1px solid rgba(99, 102, 241, 0.1)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    fontWeight: 700,
                    fontSize: '0.8rem'
                  }}>
                    <Edit2 size={14} /> Edit
                  </button>
                  <button onClick={() => handleDelete(task._id)} style={{ 
                    flex: 1, 
                    padding: '0.6rem', 
                    borderRadius: '10px', 
                    background: 'rgba(239, 68, 68, 0.05)', 
                    color: '#ef4444', 
                    border: '1px solid rgba(239, 68, 68, 0.1)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    fontWeight: 700,
                    fontSize: '0.8rem'
                  }}>
                    <Trash2 size={14} /> Delete
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </section>

        {filteredTasks.length === 0 && !loading && (
          <div style={{ 
            textAlign: 'center', 
            padding: '5rem', 
            background: 'var(--glass)', 
            borderRadius: '30px', 
            border: '2px dashed var(--glass-border)',
            marginTop: '3rem'
          }}>
             <BarChart3 size={48} color="var(--text-dim)" style={{ marginBottom: '1.5rem', opacity: 0.5 }} />
             <h3 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Search Result Empty</h3>
             <p style={{ color: 'var(--text-dim)', marginTop: '0.5rem' }}>No task records match your current identity search parameters.</p>
          </div>
        )}
      </main>

      {/* Modern Modal Overlay */}
      <AnimatePresence>
        {isModalOpen && (
          <div style={{ 
            position: 'fixed', 
            top: 0, left: 0, right: 0, bottom: 0, 
            zIndex: 1000, 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            padding: '2rem'
          }}>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
              style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(10px)' }}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="glass-card"
              style={{ position: 'relative', zIndex: 1001, maxWidth: '600px' }}
            >
              <h2 style={{ fontSize: '2rem', marginBottom: '2rem' }} className="gradient-text">
                {editingTask ? 'Modify Record' : 'Create Record'}
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="input-group">
                  <label className="input-label">Task Designation</label>
                  <input
                    type="text"
                    className="input-field"
                    style={{ paddingLeft: '1.25rem' }}
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>
                <div className="input-group">
                  <label className="input-label">Description / Intel</label>
                  <textarea
                    className="input-field"
                    style={{ paddingLeft: '1.25rem', minHeight: '120px', resize: 'none' }}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                  />
                </div>
                <div className="input-group">
                  <label className="input-label">Current Phase</label>
                  <div className="role-grid" style={{ gridTemplateColumns: '1fr 1fr 1fr' }}>
                    {['pending', 'in-progress', 'completed'].map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setFormData({ ...formData, status: s })}
                        className={`role-btn ${formData.status === s ? 'active' : ''}`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '1rem', marginTop: '3rem' }}>
                  <button type="button" onClick={closeModal} className="role-btn" style={{ flex: 1, padding: '1.25rem' }}>
                    Discard
                  </button>
                  <button type="submit" className="btn-primary" style={{ flex: 1.5 }}>
                    Push Sync
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
