import { useState, useEffect } from 'react'
import axios from 'axios'
import CleanupFeedItem from './CleanupFeedItem'
import Spinner from './Spinner'

const Feed = () => {
  const [actions, setActions] = useState([])
  const [loading, setLoading] = useState(true);

  // fetch data when component renders
  useEffect(() => {
    const fetchAllActions = async () => {
      try {
        const res = await axios.get("http://localhost:8800/cleanups");
        setActions(res.data);
      } catch (err) {
        console.log('Error fetching data', err);
      } finally {
        setLoading(false)
      }
    };
    fetchAllActions();
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
