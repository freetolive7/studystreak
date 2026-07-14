import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Flame, Trash2, LogOut, Plus, Check } from 'lucide-react';
import API from '../api/axios';

function Dashboard() {
  const [habits, setHabits] = useState([]);
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');
  const [adding, setAdding] = useState(false);
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
    setAdding(true);
    try {
      await API.post('/habits', { title });
      setTitle('');
      fetchHabits();
    } catch (err) {
      setError('Could not add habit');
    } finally {
      setAdding(false);
    }
  };

  const handleComplete = async (id) => {
    try {
      await API.patch(`/habits/${id}/complete`);
      fetchHabits();
      setError('');
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

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 px-4 py-10">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">My Habits</h1>
            <p className="text-slate-400 text-sm">Stay consistent, build your streak</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-slate-300 hover:text-white text-sm border border-slate-700 hover:border-slate-500 rounded-lg px-3 py-2 transition-colors"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>

        <form onSubmit={handleAddHabit} className="flex gap-2 mb-6">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="New habit, e.g. DSA practice"
            className="flex-1 px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="submit"
            disabled={adding}
            className="flex items-center gap-1 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-medium px-4 py-2 rounded-lg transition-colors"
          >
            <Plus size={18} /> Add
          </button>
        </form>

        {error && (
          <p className="text-red-400 text-sm bg-red-950/40 border border-red-900 rounded-lg px-3 py-2 mb-4">
            {error}
          </p>
        )}

        {habits.length === 0 ? (
          <div className="text-center text-slate-500 py-16 border border-dashed border-slate-700 rounded-xl">
            No habits yet — add your first one above.
          </div>
        ) : (
          <div className="space-y-3">
            {habits.map((habit) => {
              const doneToday = habit.lastCompletedDate === today;
              return (
                <div
                  key={habit._id}
                  className="flex items-center justify-between bg-slate-800/60 border border-slate-700 rounded-xl px-5 py-4"
                >
                  <div>
                    <p className="text-white font-medium">{habit.title}</p>
                    <p className="flex items-center gap-1 text-orange-400 text-sm mt-1">
                      <Flame size={16} /> {habit.streak} day streak
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleComplete(habit._id)}
                      disabled={doneToday}
                      className={`flex items-center gap-1 text-sm font-medium px-3 py-2 rounded-lg transition-colors ${
                        doneToday
                          ? 'bg-emerald-900/50 text-emerald-400 cursor-default'
                          : 'bg-emerald-600 hover:bg-emerald-500 text-white'
                      }`}
                    >
                      <Check size={16} /> {doneToday ? 'Done today' : 'Mark done'}
                    </button>
                    <button
                      onClick={() => handleDelete(habit._id)}
                      className="text-slate-400 hover:text-red-400 p-2 rounded-lg hover:bg-slate-700 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;