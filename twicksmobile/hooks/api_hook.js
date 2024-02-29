import { useState, useEffect } from "react";
import { getRequest, getRequestWithAuth } from '../utills/api_client';

export const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        setData(null);
        setLoading(true);
        setError(false);

        getRequest(url).then((res) => {
            setLoading(false);
            setData(res);
        }).catch((err) => {
            setLoading(false);
            setError(true);
        });
    }, [url]);

    return { data, loading, error, setData };
};