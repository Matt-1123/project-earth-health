import { useState } from 'react'
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
import ActionPage, { actionLoader } from './components/pages/ActionPage';
import NotFoundPage from './components/pages/NotFoundPage';
import AddCleanupPage from './components/pages/AddCleanup';

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<MainLayout />}>
        <Route index element={<Homepage />} />
        <Route path='/about' element={<AboutPage />} />
        <Route path='/profile' element={<MyProfilePage />} />
        <Route path='/action/:id' element={<ActionPage />} loader={actionLoader} />
        <Route path='/add-cleanup' element={<AddCleanupPage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App
