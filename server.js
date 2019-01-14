// Key:
// 3f512a426170f3b1734a0f4d2dbf5048

// Secret:
// 7a23164b892572de

const express = require('express');
const hbs = require('hbs');
const axios = require('axios');

const port = process.env.PORT || 3000;

let app = express();
let html;
let urls = [];

hbs.registerHelper('getImages', () => new Promise((resolve, reject) => {
    axios.get('https://api.flickr.com/services/rest/?method=flickr.people.getPhotos&format=json&api_key=3f512a426170f3b1734a0f4d2dbf5048&nojsoncallback=1&user_id=jamessphotography')
    .then((res) => {
        for (let i = 0; i < res.data.photos.photo.length; i++) {
            let id = res.data.photos.photo[i].id;
            let url = `https://api.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key=febb2a6247e2bfe3935a3bdd0ceb07fc&photo_id=${id}&format=json&nojsoncallback=1`;
            
            // create arr of urls
            urls.push(url);
            
        }
        // return arr of urls
       return urls;
    })
    .then((urls) => {
       const moddedUrls = urls.map((url) => {
           return axios.get(url)
               .then((res) => {
                   let src = res.data.sizes.size[8].source;
                   html += `<img src= "${src}">`;
               })
               .catch((e) => {
                   console.log(e);
               })
       });

       return Promise.all(moddedUrls);
    })
    .then((res) => {
        console.log(html)
       resolve(html);
    })
    .catch((e) => {
        console.log(e);
    });
}));

hbs.registerPartials(__dirname + '/views/partials');

app.set('view-engine', 'hbs');

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
     res.render('home.hbs');
});

app.get('/about', (req, res) => {
     res.render('about.hbs');
});

app.get('*', (req, res) => {
	res.redirect('/');
});

app.listen(port, () => {
	console.log(`Server is up on port ${port}`);
});

