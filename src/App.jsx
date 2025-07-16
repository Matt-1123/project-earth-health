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
import { getActions } from './api/actions'

const posts = [
  {id: 1, title: "Post 1"},
  {id: 2, title: "Post 2"}
]

const wait = duration => {
  return new Promise(resolve => setTimeout(resolve, duration))
}

const App = () => {  
  // const actionsQuery = useQuery({
  //   queryKey: ['actions'],
  //   staleTime: 5000,
  //   refetchInterval: 10000,
  //   // queryFn: () => wait(5000).then(() => [...posts])
  //   // queryFn: () => Promise.reject("error message")
  //   queryFn: getActions
  // });

  // console.log(`actionsQuery.fetchStatus: ${actionsQuery.fetchStatus}`)
  // console.log(`actionsQuery.status: ${actionsQuery.status}`)
  // if(actionsQuery.isLoading) return <h1>Loading...</h1>
  // if(actionsQuery.isError) return <pre>{JSON.stringify(actionsQuery.error)}</pre>

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

  // return (
  //   <div>
  //     <p>test</p>
  //     {posts.map((action) => (
  //       <div key={action.id}>
  //         <p>{action.title}</p>
  //       </div>
  //     ))}
  //   </div>
  // )
  
  return <RouterProvider router={router} />;
}

export default App
