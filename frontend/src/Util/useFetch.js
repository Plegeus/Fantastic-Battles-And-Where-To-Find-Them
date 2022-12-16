import { useEffect, useState } from "react"

const useFetch = (url) => {
    const [FetchedData, setFetchedData] = useState();
    const [IsLoading, setIsLoading] = useState(true);
    const [Error, setError] = useState();

    useEffect(() => {
        fetch(url)
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