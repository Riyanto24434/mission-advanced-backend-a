import { useState } from 'react';
import api from '../services/api';

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const submit = async e => {
    e.preventDefault();
    try {
      const { data } = await api.post('/login', { email, password });
      const token = data.token;
      localStorage.setItem('token', token);
      api.setToken(token);
      onLogin(); // redirect
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <form onSubmit={submit}>
      <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" />
      <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" />
      <button>Login</button>
    </form>
  );
}
