import https from 'https';

https.get('https://unsplash.com/napi/search/photos?query=black%20man%20smile%20blue%20background&per_page=5', (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    try {
      const json = JSON.parse(data);
      json.results.forEach(r => {
        console.log(r.id, r.alt_description);
      });
    } catch(e) {
      console.log('error parsing');
    }
  });
}).on('error', (e) => {
  console.log('error fetching', e);
});
