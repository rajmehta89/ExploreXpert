const axios = require('axios');

async function getImage(req, res) {
    const apiKey = 'Qfnx1uZLbnlR4QD63bEwiLqJbPITeNktj9M05wVZ0B8NBxEYNlBVDjhN';
    const placeName = req.query.placeName || 'surat';

    try {
        const response = await axios.get(`https://api.pexels.com/v1/search?query=${placeName}&per_page=1`, {
            headers: {
                'Authorization': apiKey,
            },
        });

        const photo = response.data.photos[0];
        const imageUrl = photo ? photo.src.large : '';

        console.log('Image URL:', imageUrl);
        res.json({ imageUrl });
    } catch (error) {
        console.error('Error fetching image:', error);
        res.status(500).send('Internal Server Error');
    }
}

module.exports = getImage;



