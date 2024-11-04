const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
const port = 3000; // Change this to your desired port

app.use(express.json()); // Middleware to parse JSON requests

app.post('/api/chat', async (req, res) => {
    const userInput = req.body.input; // Get user input from request body
    const apiKey = process.env.API_KEY; // Get API key from environment variables
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`;

    try {
        const response = await axios.post(apiUrl, {
            contents: [{ parts: [{ text: userInput }] }]
        });

        const data = response.data;
        if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts) {
            res.json({ message: data.candidates[0].content.parts[0].text });
        } else {
            res.status(500).json({ error: 'Unexpected response format' });
        }
    } catch (error) {
        console.error("Error fetching AI response:", error);
        res.status(500).json({ error: 'Failed to get response from the API' });
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
