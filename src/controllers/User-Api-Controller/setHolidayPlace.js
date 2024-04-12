const axios = require('axios');
 
 async  function setplacetodatabase(req, res) {
    try {
      const locationId = req.body.locationId;
  
      if (locationId) {
        const response = await axios.post('https://travel-advisor.p.rapidapi.com/photos/v2/list', {
          currency: 'USD',
          units: 'km',
          lang: 'en_US',
          locationIdStr: locationId,
          albumId: '',
          galleryConfig: 'ar',
          offset: 0,
          updateToken: '',
        }, {
          headers: {
            'X-RapidAPI-Key': '73609664e8msh5d59619de2e8cc3p1c272cjsn240699753fc6',
            'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com',
            'Content-Type': 'application/json',
          },
        });
  
        res.json(response.data);
      } else {
        res.status(400).json({ error: 'Invalid or missing locationId in the request body' });
      }
    } catch (error) {
      console.error('Error getting photos:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

module.exports=setplacetodatabase;  
  
