import React, { useState, useEffect } from 'react';
import { Calendar, Check, AlertCircle } from 'lucide-react';
import { styles } from '../styles/styles';

const ScheduleTest = () => {
  const [courses, setCourses] = useState([]);
  const [formData, setFormData] = useState({
    courseId: '',
    batch: '',
    branch: '',
    year: '',
    scheduledOn: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await fetch('/api/courses');
      const data = await response.json();
      if (response.ok) {
        setCourses(data.courses);
      } else {
        setError('Failed to fetch courses');
      }
    } catch (err) {
      setError('Failed to fetch courses');
      console.error(err);
    }
  };

  const validateForm = () => {
    if (!formData.courseId) {
      setError('Please select a course');
      return false;
    }
    if (!formData.batch) {
      setError('Please enter a batch');
      return false;
    }
    if (!formData.branch) {
      setError('Please enter a branch');
      return false;
    }
    if (!formData.year) {
      setError('Please enter a year');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch('/api/schedule-test', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Test scheduled successfully!');
        setFormData({
          courseId: '',
          batch: '',
          branch: '',
          year: '',
          scheduledOn: ''
        });
      } else {
        setError(data.message || 'Failed to schedule test');
      }
    } catch (err) {
      setError('An error occurred while scheduling the test');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <div style={styles.header}>
          <h1 style={styles.title}>Schedule Test</h1>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {error && (
            <div style={styles.error}>
              <AlertCircle style={{ width: '16px', height: '16px' }} />
              <p>{error}</p>
            </div>
          )}

          {success && (
            <div style={styles.success}>
              <Check style={{ width: '16px', height: '16px' }} />
              <p>{success}</p>
            </div>
          )}

          <div>
            <label style={styles.label}>Course</label>
            <select
              value={formData.courseId}
              onChange={(e) => setFormData(prev => ({ ...prev, courseId: e.target.value }))}
              style={styles.input}
            >
              <option value="">Select a course</option>
              {courses.map(course => (
                <option key={course._id} value={course._id}>
                  {course.title}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label style={styles.label}>Batch</label>
            <input
              type="text"
              value={formData.batch}
              onChange={(e) => setFormData(prev => ({ ...prev, batch: e.target.value }))}
              placeholder="Enter batch"
              style={styles.input}
            />
          </div>

          <div>
            <label style={styles.label}>Branch</label>
            <input
              type="text"
              value={formData.branch}
              onChange={(e) => setFormData(prev => ({ ...prev, branch: e.target.value }))}
              placeholder="Enter branch"
              style={styles.input}
            />
          </div>

          <div>
            <label style={styles.label}>Year</label>
            <input
              type="text"
              value={formData.year}
              onChange={(e) => setFormData(prev => ({ ...prev, year: e.target.value }))}
              placeholder="Enter year"
              style={styles.input}
            />
          </div>

          <div>
            <label style={styles.label}>Schedule Date & Time (Optional)</label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Calendar style={{ width: '16px', height: '16px', color: '#4CAF50' }} />
              <input
                type="datetime-local"
                value={formData.scheduledOn}
                onChange={(e) => setFormData(prev => ({ ...prev, scheduledOn: e.target.value }))}
                style={styles.input}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              ...styles.button,
              opacity: loading ? 0.7 : 1,
              cursor: loading ? 'not-allowed' : 'pointer',
            }}
          >
            {loading ? 'Scheduling...' : 'Schedule Test'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ScheduleTest;

