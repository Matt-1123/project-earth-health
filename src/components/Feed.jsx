import CleanupFeedItem from './CleanupFeedItem'
import Spinner from './Spinner'
import { useActions } from '../context/ActionsContext'

const Feed = () => {  
  const { actions, loading, error } = useActions();
  
  return (
    <>
      {loading && <Spinner loading={loading} /> }
      {error && <p>Error: {error.message}</p>}
      {actions && (
        actions.map((action) => (
          <CleanupFeedItem key={action.id} action={action} />
        ))
      )}
    </>
  )
}

export default Feed
