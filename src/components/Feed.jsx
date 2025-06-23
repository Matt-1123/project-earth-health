import { useState, useEffect } from 'react'
import CleanupFeedItem from './CleanupFeedItem'
import Spinner from './Spinner'

const Feed = () => {
  const [actions, setActions] = useState([])
  const [loading, setLoading] = useState(true);

  // fetch data when component renders
  useEffect(() => {
    const fetchActions = async () => {
      const apiUrl = '/api/actions';
      
      try {
        const res = await fetch(apiUrl);
        const data = await res.json();
        setActions(data);
      } catch (error) {
        console.log('Error fetching data', error);
      } finally {
        setLoading(false);
      }
    };

    console.log(JSON.stringify(actions))
    fetchActions();
  }, []);

  return (
    <>
      {loading ? (<Spinner loading={loading}/>) : (
        actions.map((action) => (
          <CleanupFeedItem key={action.id} action={action} />
        ))
      )}
    </>
  )
}

export default Feed
