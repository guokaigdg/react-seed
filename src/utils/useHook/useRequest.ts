/*
 * useRequest封装
 * useRequest封装 https://www.xiabingbao.com/post/react/react-hook-userequest.html
 */

import {useState, useEffect} from 'react';
const useRequest = (fetch: any, params: any) => {
    const [loading, setLoading] = useState(true);
    const [result, setResult] = useState(null);
    const [error, setError] = useState<any>(null);

    const request = async () => {
        setLoading(true);
        try {
            const result = await fetch(params);
            const {code, data} = result;
            if (code === 200 && data) {
                setResult(data);
            } else {
                setError(result);
            }
        } catch (error) {
            setError(error);
        }
        setLoading(false);
    };

    useEffect(() => {
        request();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return {
        loading,
        result,
        error
    };
};

export default useRequest;
