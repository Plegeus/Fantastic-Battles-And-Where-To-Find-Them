import { useEffect, useState } from "react"

const useFetch = (url, request) => {
    const [FetchedData, setFetchedData] = useState();
    const [IsLoading, setIsLoading] = useState(true);
    const [Error, setError] = useState();

    // A custom hook which will refetch each time the given url is different.
    // We also store a loading state and the possible error to display for the user, to let the user know that something is either still loading or something went wrong

    useEffect(() => {
        fetch(url, request)
            .then(res => {
                if (!res.ok) {
                    throw Error("Could not fetch the data");
                }
                return res.json();
            })
            .then(data => {
                setFetchedData(data);
                setIsLoading(false);
                setError(null);
            })
            .catch(err => {
                setIsLoading(false);
                setError(err.message);
            })
    }, [url]);

    return { FetchedData, IsLoading, Error }

}

export default useFetch


