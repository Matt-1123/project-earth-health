import { createContext, useState, useEffect, useContext } from 'react';

const ActionsContext = createContext();

export function ActionsProvider({ children }) {
  const [actions, setActions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchActions = async () => {
      try {
        const res = await fetch('/api/cleanups');
        if (!res.ok) throw new Error('Failed to fetch actions');
        const data = await res.json();
        setActions(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchActions();
  }, []);

  useEffect(() => {
    localStorage.setItem('actions', JSON.stringify(actions));
  }, [actions]);

  return (
    <ActionsContext.Provider value={{ actions, loading, error }}>
      {children}
    </ActionsContext.Provider>
  );
}

export function useActions() {
  return useContext(ActionsContext);
}