import { useState, useEffect } from 'react'
import axios from 'axios'
import CleanupFeedItem from './CleanupFeedItem'
import Spinner from './Spinner'
import { useQuery } from "@tanstack/react-query"
import { getActions } from '../api/actions'
// import { useFetchActions } from '../state/useFetchActions.js'

const Feed = ({ actions }) => {  
  const { data, isLoading, isError, error, fetchStatus, status } = useQuery({
    queryKey: ['actions'],
    staleTime: 5000,
    refetchInterval: 10000,
    // queryFn: () => wait(5000).then(() => [...posts])
    // queryFn: () => Promise.reject("error message")
    queryFn: getActions
  });

  console.log(`Feed.jsx actions prop: ${JSON.stringify(actions)}`)

  console.log(`actionsQuery.fetchStatus: ${fetchStatus}`)
  console.log(`actionsQuery.status: ${status}`)

  // fetch data when component renders
  // useEffect(() => {
  //   const fetchAllActions = async () => {
  //     try {
  //       const res = await axios.get("http://localhost:8800/cleanups");
  //       setActions(res.data);
  //     } catch (err) {
  //       console.log('Error fetching data', err);
  //     } finally {
  //       setLoading(false)
  //     }
  //   };
  //   fetchAllActions();
  // }, []);

  return (
    <>
      {isLoading && <Spinner loading={isLoading} /> }
      {isError && <p>Error: {error.message}</p>}
      {data && (
        data.map((action) => (
          <CleanupFeedItem key={action.id} action={action} />
        ))
      )}
    </>
  )
}

export default Feed
