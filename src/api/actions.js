import axios from "axios"

export const getActions = async () => {
    try {
        const res = await axios.get('/api/cleanups');
        return res.data
    } catch (err) {
        console.log('Error fetching data', err);
    } finally {
        console.log("queryFn for all actions complete")
    }
}

export const getAction = async (id) => {
    try {
        const res = await axios.get(`/api/cleanups/${id}`);
        console.log(`getAction data: ${JSON.stringify(res.data)}`)
        return res.data[0]
    } catch (err) {
        console.log('Error fetching data', err);
    } finally {
        console.log("fetch individual action complete")
    }
}

export const postCleanup = async (cleanup) => {
    // try {
    //     await axios.post('/api/cleanups', cleanup);
    //     console.log('posted cleanup')
    //     return true;
    // } catch (err) {
    //     console.log('Error posting data', err);
    // }
    
    const response = await fetch('/api/cleanups', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cleanup),
    });
    if (!response.ok) {
        console.error('Failed to add cleanup');
    }
    return;    
}