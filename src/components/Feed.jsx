import { useState, useEffect } from 'react'
import CleanupFeedItem from './CleanupFeedItem'

const Feed = () => {
  const [cleanups, setCleanups] = useState([])
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCleanups = async () => {
      // const apiUrl = '/api/cleanups';
      const apiUrl = 'http://localhost:5000/cleanups/'
      
      try {
        const res = await fetch(apiUrl);
        const data = await res.json();
        setCleanups(data);
      } catch (error) {
        console.log('Error fetching data', error);
      } finally {
        setLoading(false);
      }
    };

    console.log(JSON.stringify(cleanups))
    fetchCleanups();
  }, []);

  return (
    <>
      {loading ? (<h2>Loading...</h2>) : (
        cleanups.map((cleanup) => (
          <CleanupFeedItem key={cleanup.id} action={cleanup} />
        ))
      )}
    </>
  )
}

export default Feed
