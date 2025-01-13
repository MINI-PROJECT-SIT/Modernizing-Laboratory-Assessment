import React, { useState } from 'react';
import { Header } from "../components/Header";

const Card = ({ title, children }) => (
  <div style={{
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    padding: '20px',
    marginBottom: '20px',
    backgroundColor: 'white',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s ease',
    animation: 'fadeIn 0.5s ease-out',
  }}>
    <h3 style={{ fontSize: '1.5rem', marginBottom: '15px', color: '#27ae60' }}>{title}</h3>
    {children}
  </div>
);

const ListItem = ({ children }) => (
  <li style={{
    marginBottom: '10px',
    paddingLeft: '20px',
    position: 'relative',
    animation: 'slideIn 0.5s ease-out',
  }}>
    <span style={{
      position: 'absolute',
      left: '0',
      top: '50%',
      transform: 'translateY(-50%)',
      width: '6px',
      height: '6px',
      backgroundColor: '#27ae60',
      borderRadius: '50%',
    }}></span>
    {children}
  </li>
);

export function UserDashBoard() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%)',
      fontFamily: 'Arial, sans-serif',
    }}>
      <Header userRole="Student" />
      <main style={{
        maxWidth: '800px',
        margin: '0 auto',
        padding: '40px 20px',
      }}>
        <h1 style={{
          fontSize: '2.5rem',
          textAlign: 'center',
          marginBottom: '40px',
          color: '#2c3e50',
          animation: 'fadeInDown 0.7s ease-out',
        }}>
          Welcome to Your Laboratory Assessment Portal
        </h1>
        
        <Card title="Getting Started">
          <p style={{ marginBottom: '15px', lineHeight: '1.6' }}>
            Welcome to the Modernized Laboratory Assessment platform. Here's what you need to know to get started:
          </p>
          <ul style={{ paddingLeft: '0', listStyleType: 'none' }}>
            <ListItem>Access your assigned lab tests from the Scheduled tests section</ListItem>
            <ListItem>Use the online text editor to write and submit your code</ListItem>
            <ListItem>Receive immediate feedback through automated test cases</ListItem>
            <ListItem>You have one chance to revise your answers after initial submission</ListItem>
            <ListItem>Review your past submissions and teacher feedback in the submissions section</ListItem>
          </ul>
        </Card>

        <Card title="How to Take a Test">
          <ol style={{ paddingLeft: '20px', lineHeight: '1.6' }}>
            <li style={{ marginBottom: '10px', animation: 'slideIn 0.5s ease-out' }}>Select an available test from your Scheduled Page</li>
            <li style={{ marginBottom: '10px', animation: 'slideIn 0.6s ease-out' }}>Read all instructions carefully before starting</li>
            <li style={{ marginBottom: '10px', animation: 'slideIn 0.7s ease-out' }}>Write your code in the provided online text editor</li>
            <li style={{ marginBottom: '10px', animation: 'slideIn 0.8s ease-out' }}>Run your code against the provided test cases</li>
            <li style={{ marginBottom: '10px', animation: 'slideIn 0.9s ease-out' }}>Submit your final answer before the deadline</li>
            <li style={{ marginBottom: '10px', animation: 'slideIn 1s ease-out' }}>Review feedback and make improvements if allowed</li>
          </ol>
        </Card>

        <Card title="Tips for Success">
          <ul style={{ paddingLeft: '0', listStyleType: 'none' }}>
            <ListItem>Familiarize yourself with the online text editor features</ListItem>
            <ListItem>Test your code thoroughly before final submission</ListItem>
            <ListItem>Pay close attention to the automated feedback</ListItem>
            <ListItem>Reach out to your instructor if you need clarification</ListItem>
            <ListItem>Review your past submissions to learn from previous mistakes</ListItem>
          </ul>
        </Card>

        <Card title="Important Reminders">
          <ul style={{ paddingLeft: '0', listStyleType: 'none' }}>
            <ListItem>Adhere to the academic integrity policy at all times</ListItem>
            <ListItem>Submit your work before the specified deadlines</ListItem>
            <ListItem>Regularly check for new assignments and feedback</ListItem>
            <ListItem>Keep your login credentials secure and confidential</ListItem>
          </ul>
        </Card>
      </main>
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}

