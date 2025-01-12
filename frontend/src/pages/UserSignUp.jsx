


import React, { useState } from 'react';
import { styles } from '../styles/styles';

export default function UserSignUp() {
  const [username, setUsername] = useState('');
  const [usn, setUsn] = useState('');
  const [password, setPassword] = useState('');
  const [batch, setBatch] = useState('');
  const [year, setYear] = useState('');
  const [branch, setBranch] = useState('');
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
    console.log('User Sign Up:', { username, usn, password, batch, year, branch });
    setMessage('User signed up successfully!');

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} style={styles.formContainer}>
      <h2 style={{ textAlign: 'center', color: 'black' }}>User Sign Up</h2>
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
      <div>
        <label htmlFor="batch" style={styles.label}>
          Batch
        </label>
        <input
          id="batch"
          type="text"
          value={batch}
          onChange={(e) => setBatch(e.target.value)}
          required
          style={styles.input}
        />
        {errors.batch && <p style={styles.error}>{errors.batch}</p>}
      </div>
      <div>
        <label htmlFor="year" style={styles.label}>
          Year
        </label>
        <input
          id="year"
          type="text"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          required
          style={styles.input}
        />
        {errors.year && <p style={styles.error}>{errors.year}</p>}
      </div>
      <div>
        <label htmlFor="branch" style={styles.label}>
          Branch
        </label>
        <input
          id="branch"
          type="text"
          value={branch}
          onChange={(e) => setBranch(e.target.value)}
          required
          style={styles.input}
        />
        {errors.branch && <p style={styles.error}>{errors.branch}</p>}
      </div>
      <button type="submit" style={styles.button} disabled={loading}>
        {loading ? 'Signing up...' : 'Sign Up'}
      </button>
      {message && <p style={{ ...styles.error, color: 'green' }}>{message}</p>}
    </form>
  );
}

