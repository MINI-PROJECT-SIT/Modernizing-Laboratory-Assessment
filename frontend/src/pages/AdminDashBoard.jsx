import React from 'react';
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

export function AdminDashBoard() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%)',
      fontFamily: 'Arial, sans-serif',
    }}>
      <Header userRole="Teacher" />
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
          Laboratory Assessment Platform Overview
        </h1>
        
        <Card title="Key Responsibilities">
          <p style={{ marginBottom: '15px', lineHeight: '1.6' }}>
            As an administrator, your role is crucial in managing and overseeing the laboratory assessment process. Here are your main responsibilities:
          </p>
          <ul style={{ paddingLeft: '0', listStyleType: 'none' }}>
            <ListItem>Create and customize lab tests tailored to your curriculum</ListItem>
            <ListItem>Set up automated test cases for efficient evaluation</ListItem>
            <ListItem>Review and grade student submissions</ListItem>
            <ListItem>Provide constructive feedback to enhance student learning</ListItem>
            <ListItem>Monitor overall class performance and identify areas for improvement</ListItem>
          </ul>
        </Card>

        <Card title="Getting Started">
          <p style={{ marginBottom: '15px', lineHeight: '1.6' }}>
            To begin using the platform effectively, follow these steps:
          </p>
          <ol style={{ paddingLeft: '20px', lineHeight: '1.6' }}>
            <li style={{ marginBottom: '10px', animation: 'slideIn 0.5s ease-out' }}>Familiarize yourself with the platform's features and interface</li>
            <li style={{ marginBottom: '10px', animation: 'slideIn 0.6s ease-out' }}>Create your first lab test by defining questions and test cases</li>
            <li style={{ marginBottom: '10px', animation: 'slideIn 0.7s ease-out' }}>Assign the test to your students and set a deadline</li>
            <li style={{ marginBottom: '10px', animation: 'slideIn 0.8s ease-out' }}>Monitor submissions and provide timely feedback</li>
            <li style={{ marginBottom: '10px', animation: 'slideIn 0.9s ease-out' }}>Analyze results and adjust your teaching strategy accordingly</li>
          </ol>
        </Card>

        <Card title="Best Practices">
          <ul style={{ paddingLeft: '0', listStyleType: 'none' }}>
            <ListItem>Regularly update test cases to cover new scenarios</ListItem>
            <ListItem>Provide clear instructions and expectations for each test</ListItem>
            <ListItem>Encourage students to use the platform's features, such as the online text editor</ListItem>
            <ListItem>Balance automated grading with manual review for comprehensive assessment</ListItem>
            <ListItem>Use the analytics tools to track progress and identify struggling students</ListItem>
          </ul>
        </Card>

        <Card title="Platform Features">
          <p style={{ marginBottom: '15px', lineHeight: '1.6' }}>
            Our platform offers several features to streamline your assessment process:
          </p>
          <ul style={{ paddingLeft: '0', listStyleType: 'none' }}>
            <ListItem>Intuitive test creation interface with support for various question types</ListItem>
            <ListItem>Automated test case evaluation for immediate results</ListItem>
            <ListItem>Customizable grading rubrics for consistent assessment</ListItem>
            <ListItem>Detailed analytics dashboard for tracking student and class performance</ListItem>
            <ListItem>Integrated communication tools for providing feedback and answering queries</ListItem>
          </ul>
        </Card>

        <Card title="Important Reminders">
          <ul style={{ paddingLeft: '0', listStyleType: 'none' }}>
            <ListItem>Regularly backup your test data and student submissions</ListItem>
            <ListItem>Keep your login credentials secure and change them periodically</ListItem>
            <ListItem>Stay updated with the latest platform features and updates</ListItem>
            <ListItem>Encourage academic integrity by using plagiarism detection tools</ListItem>
            <ListItem>Provide clear guidelines to students about the assessment process and expectations</ListItem>
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