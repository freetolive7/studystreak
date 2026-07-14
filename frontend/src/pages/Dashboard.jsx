import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';

function Dashboard() {
  const [habits, setHabits] = useState([]);
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fetchHabits = async () => {
    try {
      const res = await API.get('/habits');
      setHabits(res.data);
    } catch (err) {
      setError('Could not load habits');
    }
  };

  useEffect(() => {
    fetchHabits();
  }, []);

  const handleAddHabit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    try {
      await API.post('/habits', { title });
      setTitle('');
      fetchHabits();
    } catch (err) {
      setError('Could not add habit');
    }
  };

  const handleComplete = async (id) => {
    try {
      await API.patch(`/habits/${id}/complete`);
      fetchHabits();
    } catch (err) {
      setError(err.response?.data?.message || 'Could not update habit');
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/habits/${id}`);
      fetchHabits();
    } catch (err) {
      setError('Could not delete habit');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div style={{ maxWidth: 600, margin: '40px auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h2>My Habits</h2>
        <button onClick={handleLogout}>Logout</button>
      </div>

      <form onSubmit={handleAddHabit}>
        <input
          type="text"
          placeholder="New habit (e.g. DSA practice)"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {habits.map((habit) => (
          <li
            key={habit._id}
            style={{
              border: '1px solid #444',
              borderRadius: 8,
              padding: 12,
              marginTop: 10,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div>
              <strong>{habit.title}</strong>
              <p style={{ margin: 0 }}>🔥 Streak: {habit.streak}</p>
            </div>
            <div>
              <button onClick={() => handleComplete(habit._id)}>Mark Done</button>
              <button onClick={() => handleDelete(habit._id)} style={{ marginLeft: 8 }}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;