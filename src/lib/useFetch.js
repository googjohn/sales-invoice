import { useCallback, useEffect, useRef, useState } from "react";

export function useFetchData() {
    const [data, setData] = useState([])
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(true)
    const controller = useRef(null)

    const fetchData = async (url) => {
        setLoading(true)
        setError(false)

        if (!url) {
            console.log('Url is not valid.')
            return
        };

        controller.current?.abort()
        controller.current = new AbortController()
        const signal = controller.current.signal

        try {
            const response = await fetch(url, { signal })

            if (!response.ok) {
                throw new Error(`Failed to fetch. ${response.statusText}`)
            }

            const result = await response.json();

            setData(result)

            return result

        } catch (error) {
            if (error.name === 'AbortError') return;

            console.error(error)
            setError(true)
        } finally {
            setLoading(false)
        }
    }

    const abortController = () => {
        controller.current?.abort()
    }

    return {
        data,
        error,
        loading,
        abortController,
        fetchData,
    }
}

export function useSendData() {
    const controller = useRef(null)

    const sendData = async (data, url) => {
        if (!url) {
            console.log('Url not valid.')
            return;
        }
        controller.current?.abort();
        controller.current = new AbortController();
        const signal = controller.current.signal

        try {
            const request = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
                signal: signal
            })

            if (!request.ok) {
                const textError = await request.text()
                console.log(textError)

                throw new Error(
                    `Failed to send. ${request.status} ${request.statusText}`
                )
            }

            const text = await request.text();
            console.log(text)
            return true;
        } catch (error) {
            if (error.name === 'AbortError') return;
            console.error(error)
            return false;
        }
    }

    const abortController = () => controller.current?.abort()

    return {
        sendData,
        abortController
    }
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
            return () => controller.current.abort();
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
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                    signal: signal
                })

                if (!request.ok) {
                    throw new Error(`Failed to send. ${request.statusText}`)
                }

                const text = await request.text();
                console.log(text)
                return true;
            } catch (error) {
                console.error(error)
                return false;
            }
        }, [data, url])

        useEffect(() => {
            sendData();
            return () => controller.current.abort()
        }, [sendData])

        return;
    }

    return { useSendData, useGetData }
}