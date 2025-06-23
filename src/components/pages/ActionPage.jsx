import { useParams, useLoaderData, useNavigate } from 'react-router-dom';

const ActionPage = () => {

  const { id } = useParams();
  const action = useLoaderData();
  
  console.log("action: " + JSON.stringify(action))

  return (    
    <>
      <h1>{action.title}</h1>
    </>
  )
}


const actionLoader = async ({ params }) => {
  const res = await fetch(`/api/actions/${params.id}`);
  const data = await res.json();
  return data;
};

export { ActionPage as default, actionLoader };
