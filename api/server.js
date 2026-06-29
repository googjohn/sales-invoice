import express from 'express';
import cors from 'cors';

const app = express();
app.use(express.json())
app.use(cors())

app.get('/api', (req, res) => {
    console.log('Hello from server')
    res.status(200)
        .json({
            message: 'Hello from server/api'
        })
})

// only used for testing backend to backend
app.get('/api/getall', async (req, res) => {
    try {
        const url = 'http://168.144.33.28:8081/api/v1/action/getall'
        const response = await fetch(url)

        if (!response.ok) {
            throw new Error(`Failed to fetch, ${response.statusText}`);
        }

        const result = await response.json();

        res.status(200)
            .json({
                success: true,
                data: result
            })

    } catch (err) {
        console.error(err)
        res.status(err.statusCode ?? 500)
            .json({
                success: false,
                error: err.message
            })
    }
})
app.post('/api/add', async (req, res) => {
    console.log(JSON.stringify(req.body, null, 2))
    try {
        const url = 'http://168.144.33.28:8081/api/v1/action/add'

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json',
            },
            body: JSON.stringify(req.body)
        })

        if (!response.ok) {
            throw new Error(`Failed to fetch. ${response.statusText}`)
        }

        const text = await response.text();
        console.log('Third party response: ', text);

        res.status(200)
            .send(text);

    } catch (err) {
        console.error(err);
        res.status(err.statusCode ?? 500)
            .json({
                error: err.message
            });
    }
})

const PORT = 1992
app.listen(PORT, () => {
    console.log(`Server is running, listening to port ${PORT}`)
})
