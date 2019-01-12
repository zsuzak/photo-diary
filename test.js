// Key:
// 3f512a426170f3b1734a0f4d2dbf5048

// Secret:
// 7a23164b892572de

//https://api.flickr.com/services/rest/?method=flickr.people.getPhotos&api_key=4bfa503b17ffb78a357c40b61b07bfb1&user_id=jamessphotography
const axios = require('axios');

axios.get('https://api.flickr.com/services/rest/?method=flickr.people.getPhotos&format=json&api_key=4bfa503b17ffb78a357c40b61b07bfb1&nojsoncallback=1&user_id=jamessphotography')
        .then((res) => {
            console.log(res.data.photos);
        })
        .catch((e) => {
            console.log(e);
        });