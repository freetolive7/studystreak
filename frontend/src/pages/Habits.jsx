import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Flame, Trash2, Plus, Check } from 'lucide-react';
import { useHabits } from '../context/HabitsContext';

const categories = ['Coding', 'Competitive Programming', 'GitHub', 'Projects'];

function Habits() {
  const { habits, loading, error, addHabit, completeHabit, deleteHabit } = useHabits();
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Coding');
  const [filter, setFilter] = useState('All');
  const [adding, setAdding] = useState(false);
  const today = new Date().toISOString().split('T')[0];

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    setAdding(true);
    try {
      await addHabit(title, category);
      setTitle('');
    } finally {
      setAdding(false);
    }
  };

  const filtered = filter === 'All' ? habits : habits.filter((h) => (h.category || 'Coding') === filter);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
        <div>
          <p className="text-slate-500 text-xs font-semibold tracking-widest uppercase">Daily Systems</p>
          <h1 className="text-3xl font-bold text-white mt-1">My Habits</h1>
          <p className="text-slate-400 text-sm mt-2">Stay consistent, build your streak, and make progress visible.</p>
        </div>
        <div className="text-slate-400 text-sm border border-slate-700 rounded-full px-4 py-2 bg-slate-800/50 w-fit">
          {habits.length} habits
        </div>
      </div>

      <form
        onSubmit={handleAdd}
        className="grid sm:grid-cols-[1fr_200px_auto] gap-3 bg-slate-800/50 border border-slate-700 rounded-2xl p-4 mb-5"
      >
        <div>
          <label className="block text-xs text-slate-400 mb-1.5">Habit name</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="New habit, e.g. Solve 2 LeetCode problems"
            className="w-full h-11 px-3 rounded-lg bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-xs text-slate-400 mb-1.5">Focus area</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full h-11 px-3 rounded-lg bg-slate-900 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          disabled={adding}
          className="h-11 self-end flex items-center gap-1 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-medium px-4 rounded-lg transition-colors"
        >
          <Plus size={18} /> Add
        </button>
      </form>

      <div className="flex gap-2 overflow-x-auto pb-4 mb-2">
        {['All', ...categories].map((c) => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            className={`whitespace-nowrap text-sm px-4 py-2 rounded-full border transition-colors ${
              filter === c ? 'bg-indigo-600/20 border-indigo-500 text-white' : 'border-slate-700 text-slate-400'
            }`}
          >
            {c === 'All' ? 'All habits' : c}
          </button>
        ))}
      </div>

      {error && (
        <p className="text-red-400 text-sm bg-red-950/40 border border-red-900 rounded-lg px-3 py-2 mb-4">{error}</p>
      )}

      {loading ? (
        <div className="text-center text-slate-500 py-16 border border-dashed border-slate-700 rounded-xl">
          Loading...
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center text-slate-500 py-16 border border-dashed border-slate-700 rounded-xl">
          No habits in this category yet.
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((habit) => {
            const doneToday = habit.lastCompletedDate === today;
            return (
              <div
                key={habit._id}
                className="flex items-center justify-between bg-slate-800/60 border border-slate-700 rounded-xl px-5 py-4"
              >
                <Link to={`/habits/${habit._id}`} className="min-w-0 group">
                  <p className="text-white font-medium group-hover:text-indigo-400 transition-colors truncate">
                    {habit.title}
                  </p>
                  <div className="flex items-center gap-3 mt-1.5">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300">
                      {habit.category || 'Coding'}
                    </span>
                    <span className="flex items-center gap-1 text-orange-400 text-xs">
                      <Flame size={13} /> {habit.streak} day streak
                    </span>
                  </div>
                </Link>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => completeHabit(habit._id)}
                    disabled={doneToday}
                    className={`flex items-center gap-1 text-sm font-medium px-3 py-2 rounded-lg transition-colors ${
                      doneToday
                        ? 'bg-emerald-900/50 text-emerald-400 cursor-default'
                        : 'bg-emerald-600 hover:bg-emerald-500 text-white'
                    }`}
                  >
                    <Check size={16} /> {doneToday ? 'Done' : 'Mark done'}
                  </button>
                  <button
                    onClick={() => deleteHabit(habit._id)}
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
  );
}

export default Habits;