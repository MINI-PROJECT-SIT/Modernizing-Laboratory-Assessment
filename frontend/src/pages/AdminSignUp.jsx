import React, { useState } from 'react';
import { styles } from '../styles/styles';

export default function AdminSignUp() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [department, setDepartment] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    setMessage('');

    // Add your form submission logic here
    // For demonstration, we'll just log the values and show a success message
    console.log('Admin Sign Up:', { username, email, password, department });
    setMessage('Admin signed up successfully!');

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} style={styles.formContainer}>
      <h2 style={{ textAlign: 'center', color: 'black' }}>Admin Sign Up</h2>
      <div>
        <label htmlFor="username" style={styles.label}>
          Username
        </label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          style={styles.input}
        />
        {errors.username && <p style={styles.error}>{errors.username}</p>}
      </div>
      <div>
        <label htmlFor="email" style={styles.label}>
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={styles.input}
        />
        {errors.email && <p style={styles.error}>{errors.email}</p>}
      </div>
      <div>
        <label htmlFor="password" style={styles.label}>
          Password
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={styles.input}
        />
        {errors.password && <p style={styles.error}>{errors.password}</p>}
      </div>
      <div>
        <label htmlFor="department" style={styles.label}>
          Department
        </label>
        <input
          id="department"
          type="text"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          required
          style={styles.input}
        />
        {errors.department && <p style={styles.error}>{errors.department}</p>}
      </div>
      <button type="submit" style={styles.button} disabled={loading}>
        {loading ? 'Signing up...' : 'Sign Up'}
      </button>
      {message && <p style={{ ...styles.error, color: 'green' }}>{message}</p>}
    </form>
  );
}

