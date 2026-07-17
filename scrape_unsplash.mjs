import https from 'https';

https.get('https://unsplash.com/s/photos/black-man-sunglasses-blue-background', (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    const matches = data.match(/images\.unsplash\.com\/photo-[a-zA-Z0-9\-]+/g);
    if (matches) {
      console.log(Array.from(new Set(matches)).slice(0, 10).join('\n'));
    } else {
      console.log('no matches');
    }
  });
}).on('error', (e) => {
  console.log('error fetching', e);
});
