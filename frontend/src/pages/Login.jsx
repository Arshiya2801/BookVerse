
import React, { useState } from 'react';
import API from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import Layout from '../components/Layout';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await API.post('/auth/login', form);
      login(data.user, data.token);
      navigate('/books');
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-md mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <form onSubmit={submit} className="space-y-3">
          <input required value={form.email} onChange={e => setForm({...form, email: e.target.value})} placeholder="Email" type="email" className="w-full p-2 border rounded" />
          <input required value={form.password} onChange={e => setForm({...form, password: e.target.value})} placeholder="Password" type="password" className="w-full p-2 border rounded" />
          <button disabled={loading} className="w-full bg-purple-600 text-white p-2 rounded">{loading ? 'Logging...' : 'Login'}</button>
        </form>
        <p className="text-sm mt-3">Don't have an account? <Link to="/signup" className="text-purple-600">Signup</Link></p>
      </div>
    </Layout>
  );
}
