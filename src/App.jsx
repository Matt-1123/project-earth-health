import { useState, useEffect } from 'react'
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom';
import MainLayout from './components/layouts/MainLayout';
import Homepage from './components/pages/Homepage';
import AboutPage from './components/pages/AboutPage'
import MyProfilePage from './components/pages/MyProfilePage';
import ActionPage from './components/pages/ActionPage';
// import ActionPage, { actionLoader } from './components/pages/ActionPage';
import NotFoundPage from './components/pages/NotFoundPage';
import AddCleanupPage from './components/pages/AddCleanup';
import EditCleanupPage from './components/pages/EditCleanupPage'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getActions } from './api/actions'
import axios from 'axios';

const App = () => {  
  const [actions, setActions] = useState(() => {
    // const actions = JSON.parse(localStorage.getItem('actions'));
    // return actions || [];
    return [];
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllActions = async () => {
      try {
        const res = await axios.get("http://localhost:8800/cleanups");
        // const res = await getActions();
        // getActions();
        console.log('Fetched actions:', res.data);
        setActions(res.data);
      } catch (err) {
        console.log('Error fetching data', err);
      } finally {
        setLoading(false)
      }
    };
    fetchAllActions();
  }, []);

  useEffect(() => {
    localStorage.setItem('actions', JSON.stringify(actions));
  }, [actions]);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<MainLayout />}>
        <Route index element={<Homepage actions={actions} loading={loading}/>} />
        <Route path='/about' element={<AboutPage />} />
        <Route path='/profile' element={<MyProfilePage />} />
        <Route path='/action/:id' element={<ActionPage />} />
        <Route path='/add-cleanup' element={<AddCleanupPage />} />
        <Route path='/edit-cleanup/:id' element={<EditCleanupPage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Route>
    )
  );
  
  return <RouterProvider router={router} />;
}

export default App
