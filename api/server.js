import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors())

app.get('/', (req, res) => {
    console.log('Hello from server')
    res.status(200)
        .send('Hello from server')
})

app.get('/api/add', async (req, res) => {
    const data = JSON.stringify(req.body)

    try {
        const url = 'http://192.168.8.1:8081/api/v1/action/add'

        const response = await fetch(url, {
            method: 'POST',
            contentType: 'Application/json',
            body: data
        })

        if (!response.ok) {
            throw new Error(`Failed to fetch. ${response.statusText}`)
        }

        const text = response.text()
        console.log(text)

        res.status(200)
            .send(text)

    } catch (err) {
        console.error(err);
        res.status(500)
            .send('Failed to fetch')
    }
})

const PORT = 1992
app.listen(PORT, () => {
    console.log(`Server is running, listening to port ${PORT}`)
})