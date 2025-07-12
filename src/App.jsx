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
import ActionPage from './components/pages/ActionPage';
// import ActionPage, { actionLoader } from './components/pages/ActionPage';
import NotFoundPage from './components/pages/NotFoundPage';
import AddCleanupPage from './components/pages/AddCleanup';
import EditCleanupPage from './components/pages/EditCleanupPage'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios';
import cors from 'cors';

const posts = [
  {id: 1, title: "Post 1"},
  {id: 2, title: "Post 2"}
]

const wait = duration => {
  return new Promise(resolve => setTimeout(resolve, duration))
}

const App = () => {
  const queryClient = useQueryClient();
  
  const actionsQuery = useQuery({
    queryKey: ['actions'],
    // queryFn: () => wait(5000).then(() => [...posts])
    // queryFn: () => Promise.reject("error message")
    queryFn: async () => {
      try {
        const res = await axios.get('/api/cleanups');
        // setActions(res.data);
        console.log(JSON.stringify(res.data))
        return res.data
      } catch (err) {
        console.log('Error fetching data', err);
      } finally {
        // setLoading(false)
        console.log("fetchAllActions complete")
      }
    }
  });
  
  // const actiodnsQuery = useQuery({
  //   queryKey: ["actions"],
  //   // queryFn: () => wait(5000).then(() => [...posts])
  //   // queryFn: () => Promise.reject("error message")
  //   queryFn: () => {
  //     const fetchAllActions = async () => {
        // try {
        //   const res = await axios.get("http://localhost:8800/cleanups");
        //   // setActions(res.data);
        //   console.log(JSON.stringify(res.data))
        //   return res.data
        // } catch (err) {
        //   console.log('Error fetching data', err);
        // } finally {
        //   // setLoading(false)
        //   console.log("fetchAllActions complete")
        // }
  //     };
    
  //     fetchAllActions();
  //   }
  // })

  console.log(`actionsQuery.fetchStatus: ${actionsQuery.fetchStatus}`)
  console.log(`actionsQuery.status: ${actionsQuery.status}`)
  if(actionsQuery.isLoading) return <h1>Loading...</h1>
  if(actionsQuery.isError) return <pre>{JSON.stringify(actionsQuery.error)}</pre>

  // const newActionMutation = useMutation({
  //   mutationFn: () => {
  //     return posts.push({ id: 3, title: "post 3" })
  //   },
  //   onSuccess: () =>  {
  //     queryClient.invalidateQueries(["actions"])
  //   }
  // })
  
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<MainLayout />}>
        <Route index element={<Homepage />} />
        <Route path='/about' element={<AboutPage />} />
        <Route path='/profile' element={<MyProfilePage />} />
        <Route path='/action/:id' element={<ActionPage />} />
        <Route path='/add-cleanup' element={<AddCleanupPage />} />
        <Route path='/edit-cleanup/:id' element={<EditCleanupPage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Route>
    )
  );

  return (
    <div>
      <p>test</p>
      {posts.map((action) => (
        <div key={action.id}>
          <p>{action.title}</p>
        </div>
      ))}
    </div>
  )
  // return <RouterProvider router={router} />;
}

export default App
