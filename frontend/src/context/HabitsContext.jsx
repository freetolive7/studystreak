import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import API from '../api/axios';

const HabitsContext = createContext(null);

export function HabitsProvider({ children }) {
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchHabits = useCallback(async () => {
    setLoading(true);
    try {
      const res = await API.get('/habits');
      setHabits(res.data);
      setError('');
    } catch (err) {
      setError('Could not load habits');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchHabits();
  }, [fetchHabits]);

  const addHabit = async (title, category) => {
    await API.post('/habits', { title, category });
    await fetchHabits();
  };

  const completeHabit = async (id) => {
    await API.patch(`/habits/${id}/complete`);
    await fetchHabits();
  };

  const deleteHabit = async (id) => {
    await API.delete(`/habits/${id}`);
    await fetchHabits();
  };

  return (
    <HabitsContext.Provider
      value={{ habits, loading, error, fetchHabits, addHabit, completeHabit, deleteHabit }}
    >
      {children}
    </HabitsContext.Provider>
  );
}

export function useHabits() {
  return useContext(HabitsContext);
}