import useSWR from 'swr';

const fetcher = (url) => fetch(url).then((res) => res.json());

const result = (url) => {
    const {data, error} = useSWR(url, fetcher);

    return {
        data,
        isLoading: !data && !error,
        isError: error,
    };
};

export default result;
