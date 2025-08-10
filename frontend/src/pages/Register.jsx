import { useState } from 'react';
import api from '../services/api';

export default function Register() {
  const [form, setForm] = useState({ fullname: '', username:'', email:'', password:''});
  const [msg, setMsg] = useState('');

  const submit = async e => {
    e.preventDefault();
    try {
      const { data } = await api.post('/register', form);
      setMsg(data.message);
    } catch (err) {
      setMsg(err.response?.data?.message || 'Error');
    }
  };

  return (
    <form onSubmit={submit}>
      <input value={form.fullname} onChange={e=>setForm({...form, fullname:e.target.value})} placeholder="Fullname" />
      <input value={form.username} onChange={e=>setForm({...form, username:e.target.value})} placeholder="Username" />
      <input value={form.email} onChange={e=>setForm({...form, email:e.target.value})} placeholder="Email" />
      <input type="password" value={form.password} onChange={e=>setForm({...form, password:e.target.value})} placeholder="Password" />
      <button>Register</button>
      <div>{msg}</div>
    </form>
  );
}
