import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Flame } from 'lucide-react';
import API from '../api/axios';

function HabitDetail() {
  const { id } = useParams();
  const [habit, setHabit] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHabit = async () => {
      try {
        const res = await API.get(`/habits/${id}`);
        setHabit(res.data);
      } catch (err) {
        setError('Could not load this habit');
      }
    };
    fetchHabit();
  }, [id]);

  const getLast84Days = () => {
    const days = [];
    for (let i = 83; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      days.push({ date: dateStr, completed: habit?.completedDates?.includes(dateStr) || false });
    }
    return days;
  };

  if (error) return <p className="text-red-400 max-w-2xl mx-auto">{error}</p>;
  if (!habit) return <p className="text-slate-400 max-w-2xl mx-auto">Loading...</p>;

  const days = getLast84Days();
  const totalCompleted = habit.completedDates?.length || 0;

  return (
    <div className="max-w-2xl mx-auto">
      <button
        onClick={() => navigate('/habits')}
        className="flex items-center gap-1 text-slate-400 hover:text-white text-sm mb-6"
      >
        <ArrowLeft size={16} /> Back to My Habits
      </button>

      <h1 className="text-3xl font-bold text-white mb-1">{habit.title}</h1>
      <p className="flex items-center gap-1 text-orange-400 text-sm mb-8">
        <Flame size={16} /> {habit.streak} day current streak · {totalCompleted} total days completed
      </p>

      <div className="bg-slate-800/60 border border-slate-700 rounded-xl p-5">
        <h2 className="text-white font-medium mb-4">Last 12 Weeks</h2>
        <div className="grid grid-cols-12 gap-1.5">
          {days.map((day) => (
            <div
              key={day.date}
              title={`${day.date}${day.completed ? ' — completed' : ''}`}
              className={`aspect-square rounded-sm ${day.completed ? 'bg-indigo-500' : 'bg-slate-700'}`}
            />
          ))}
        </div>
        <div className="flex items-center gap-2 mt-4 text-xs text-slate-500">
          <div className="w-3 h-3 rounded-sm bg-slate-700" />
          <span>No activity</span>
          <div className="w-3 h-3 rounded-sm bg-indigo-500 ml-3" />
          <span>Completed</span>
        </div>
      </div>
    </div>
  );
}

export default HabitDetail;