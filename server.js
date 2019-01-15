const express = require('express');
const hbs = require('hbs');
const axios = require('axios');

const port = process.env.PORT || 3000;

let app = express();
let images = "";
let urls = [];

hbs.registerPartials(__dirname + '/views/partials');

app.set('view-engine', 'hbs');

app.use(express.static(__dirname + '/public'));

app.get('/', async (req, res) => {
    await axios.get('https://api.flickr.com/services/rest/?method=flickr.people.getPhotos&api_key=3f512a426170f3b1734a0f4d2dbf5048&user_id=jamessphotography&extras=url_l&per_page=999&format=json&nojsoncallback=1')
        .then((res) => {
            images += `<div class="left">`;
            for (let i = 0; i < res.data.photos.photo.length; i+=2) {
                let src = res.data.photos.photo[i].url_l;
                images += `<img src="${src}">`;
            }
            images += `</div>`;
            images += `<div class="right">`;
            for (let i = 1; i < res.data.photos.photo.length; i+=2) {
                let src = res.data.photos.photo[i].url_l;
                images += `<img src="${src}">`;
            }
            images += `</div>`;
        })
        .catch((e) => {
            console.log(e);
        })
    res.render('home.hbs', {images});
    images = "";
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