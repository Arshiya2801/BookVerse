// src/pages/Signup.jsx
import React, { useState } from 'react';
import API from '../api/axios';
import { useNavigate, Link } from 'react-router-dom';
import Layout from '../components/Layout';

export default function Signup() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await API.post('/auth/signup', form);
      alert('Signup successful — please login.');
      navigate('/login');
    } catch (err) {
      alert(err.response?.data?.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-md mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-4">Signup</h2>
        <form onSubmit={submit} className="space-y-3">
          <input required value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="Name" className="w-full p-2 border rounded" />
          <input required value={form.email} onChange={e => setForm({...form, email: e.target.value})} placeholder="Email" type="email" className="w-full p-2 border rounded" />
          <input required value={form.password} onChange={e => setForm({...form, password: e.target.value})} placeholder="Password" type="password" className="w-full p-2 border rounded" />
          <button disabled={loading} className="w-full bg-purple-600 text-white p-2 rounded">{loading ? 'Signing...' : 'Signup'}</button>
        </form>
        <p className="text-sm mt-3">Already have an account? <Link to="/login" className="text-purple-600">Login</Link></p>
      </div>
    </Layout>
  );
}
