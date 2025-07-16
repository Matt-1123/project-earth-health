import { getActions } from "../api/actions";
import { useQuery } from "@tanstack/react-query"; 

// export const useActions = useQuery({
//     queryKey: ['actions'],
//     staleTime: 5000,
//     refetchInterval: 10000,
//     queryFn: getActions
// });

export function useFetchActions() {
    const [actions, setActions] = useState([])
}
