const express = require('express');
const noblox = require('noblox.js');

const app = express();
const port = 3000;

async function getThumbnail(id) {
    let thumbnail = await noblox.getPlayerThumbnail(id, 420, "png", true, "Headshot");
    return thumbnail[0].imageUrl;
}

app.get('/thumbnail', async (req, res) => {
    const id = req.query.id;
    if (!id) {
        return res.status(400).send('Player ID is required');
    }
    
    try {
        const imageUrl = await getThumbnail(id);
        res.send(imageUrl);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
