import React, { useState } from 'react';
import { styles } from '../styles/styles';

export default function UserSignin() {
  const [usn, setUsn] = useState('');
  const [password, setPassword] = useState('');
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
    console.log('User Sign In:', { usn, password });
    setMessage('User signed in successfully!');

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} style={styles.formContainer}>
      <h2 style={{ textAlign: 'center', color: 'black' }}>User Sign In</h2>
      <div>
        <label htmlFor="usn" style={styles.label}>
          USN
        </label>
        <input
          id="usn"
          type="text"
          value={usn}
          onChange={(e) => setUsn(e.target.value)}
          required
          style={styles.input}
        />
        {errors.usn && <p style={styles.error}>{errors.usn}</p>}
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
      <button type="submit" style={styles.button} disabled={loading}>
        {loading ? 'Signing in...' : 'Sign In'}
      </button>
      {message && <p style={{ ...styles.error, color: 'green' }}>{message}</p>}
    </form>
  );
}

