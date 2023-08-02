const express = require('express');
const axios = require('axios');

const app = express();
const port = 5000; // Replace this with your desired port number

app.get('/api/latest', async (req, res) => {
  try {
    const apiResponse = await axios.get('http://data.fixer.io/api/latest', {
      params: {
        access_key: 'YOUR_API_KEY_HERE', // Replace with your actual API key
      },
    });
    res.json(apiResponse.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data from the API.' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
