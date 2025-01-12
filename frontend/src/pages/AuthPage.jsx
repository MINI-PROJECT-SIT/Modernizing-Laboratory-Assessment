import React, { useState } from 'react';
import UserSignin from './UserSignin';
import UserSignUp from './UserSignUp';
import AdminSignUp from './AdminSignUp';
import AdminSignin from './AdminSignin';
import { styles } from '../styles/styles';

export default function AuthPage() {
  const [mode, setMode] = useState('user-signin');

  const renderForm = () => {
    switch (mode) {
      case 'user-signin':
        return <UserSignin />;
      case 'user-signup':
        return <UserSignUp />;
      case 'admin-signin':
        return <AdminSignin />;
      case 'admin-signup':
        return <AdminSignUp />;
      default:
        return null;
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
          <button
            onClick={() => setMode(mode.startsWith('admin') ? 'admin-signup' : 'user-signup')}
            style={{
              ...styles.button,
              width: 'auto',
              marginRight: '0.5rem',
              backgroundColor: mode.includes('signup') ? '#4CAF50' : 'white',
              color: mode.includes('signup') ? 'white' : 'black',
            }}
          >
            Sign Up
          </button>
          <button
            onClick={() => setMode(mode.startsWith('admin') ? 'admin-signin' : 'user-signin')}
            style={{
              ...styles.button,
              width: 'auto',
              backgroundColor: mode.includes('signin') ? '#4CAF50' : 'white',
              color: mode.includes('signin') ? 'white' : 'black',
            }}
          >
            Sign In
          </button>
        </div>

        {renderForm()}

        <div style={{ textAlign: 'center', marginTop: '1rem' }}>
          <button
            onClick={() => {
              setMode(
                mode.startsWith('admin')
                  ? mode.includes('signin')
                    ? 'user-signin'
                    : 'user-signup'
                  : mode.includes('signin')
                  ? 'admin-signin'
                  : 'admin-signup'
              );
            }}
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              color: '#4CAF50',
              cursor: 'pointer',
              fontSize: '0.9rem',
            }}
          >
            {mode.startsWith('admin') ? 'Switch to User Login' : 'Login as Admin'}
          </button>
        </div>
      </div>
    </div>
  );
}

