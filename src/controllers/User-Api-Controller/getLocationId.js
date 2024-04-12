const axios = require('axios');

 async function getlocationid (req, res)  {
    const { placeName } = req.query;
  
    try {
      const response = await axios.get('https://travel-advisor.p.rapidapi.com/locations/v2/auto-complete', {
        params: {
          query: placeName,
        },
        headers: {
          'X-RapidAPI-Key': '73609664e8msh5d59619de2e8cc3p1c272cjsn240699753fc6',
          'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com',
        },
      });
  
      if (response.data && response.data.data && response.data.data.length > 0) {
        const locationId = response.data.data[0].result_object.location_id;
        res.json({ locationId });
      } else {
        res.status(404).json({ error: 'Location ID not found' });
      }
    } catch (error) {
      console.error('Error getting location ID:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
module.exports=getlocationid;