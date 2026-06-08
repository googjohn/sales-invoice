import { useCallback, useEffect, useRef, useState } from "react";

export function useFetchData(url) {
    const [data, setData] = useState([])
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(true)
    const controller = useRef(null)

    const fetchData = useCallback(async () => {
        if (!url) {
            console.log('Url is not valid.')
            return
        };

        controller.current = new AbortController()
        const signal = controller.current.signal

        try {
            const response = await fetch(url, { signal })

            if (!response.ok) {
                throw new Error(`Failed to fetch. ${response.statusText}`)
            }

            const fetchedData = await response.json();

            setData(fetchedData)
        } catch (error) {
            console.error(error)
            setError(true)
        } finally {
            setError(false)
            setLoading(false)
        }
    }, [url])

    useEffect(() => {
        fetchData();
        () => controller.current.abort();
    }, [fetchData])

    return {
        data,
        error,
        loading,
    }
}

export function useSendData(data, url) {
    const controller = useRef(null)

    const sendData = useCallback(async () => {
        if (!url) {
            console.log('Url not valid.')
            return;
        }

        controller.current = new AbortController();
        const signal = controller.current.signal

        try {
            const request = await fetch(url, {
                method: "POST",
                contentType: "Application/content",
                body: JSON.stringify(data),
                signal: signal
            })

            if (!request.ok) {
                throw new Error(`Failed to send. ${request.statusText}`)
            }

            const text = request.text();
            console.log(text)
            return true;
        } catch (error) {
            console.error(error)
            return false;
        }
    }, [data, url])

    useEffect(() => {
        sendData();
        () => controller.current.abort()
    }, [sendData])

    return;
}

export default function useFetch() {
    const useGetData = (url) => {
        const [data, setData] = useState([])
        const [error, setError] = useState(false)
        const [loading, setLoading] = useState(true)
        const controller = useRef(null)

        const fetchData = useCallback(async () => {
            if (!url) {
                console.log('Url is not valid.')
                return
            };

            controller.current = new AbortController()
            const signal = controller.current.signal

            try {
                const response = await fetch(url, { signal })

                if (!response.ok) {
                    throw new Error(`Failed to fetch. ${response.statusText}`)
                }

                const fetchedData = await response.json();

                setData(fetchedData)
            } catch (error) {
                console.error(error)
                setError(true)
            } finally {
                setError(false)
                setLoading(false)
            }
        }, [url])

        useEffect(() => {
            fetchData();
            () => controller.current.abort();
        }, [fetchData])

        return {
            data,
            error,
            loading,
        }
    }

    const useSendData = (data, url) => {
        const controller = useRef(null)

        const sendData = useCallback(async () => {
            if (!url) {
                console.log('Url not valid.')
                return;
            }

            controller.current = new AbortController();
            const signal = controller.current.signal

            try {
                const request = await fetch(url, {
                    method: "POST",
                    contentType: "Application/content",
                    body: JSON.stringify(data),
                    signal: signal
                })

                if (!request.ok) {
                    throw new Error(`Failed to send. ${request.statusText}`)
                }

                const text = request.text();
                console.log(text)
                return true;
            } catch (error) {
                console.error(error)
                return false;
            }
        }, [data, url])

        useEffect(() => {
            sendData();
            () => controller.current.abort()
        }, [sendData])

        return;
    }

    return { useSendData, useGetData }
}