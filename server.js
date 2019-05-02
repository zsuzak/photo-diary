const express = require('express');
const hbs = require('hbs');
const axios = require('axios');

const port = process.env.PORT || 3000;

let app = express();
hbs.registerPartials(__dirname + '/views/partials');
app.set('view-engine', 'hbs');
app.use(express.static(__dirname + '/public'));

let images = "";
let urls = [];

app.get('/', async (req, res) => {
    await axios.get('https://api.flickr.com/services/rest/?method=flickr.people.getPhotos&api_key=3f512a426170f3b1734a0f4d2dbf5048&user_id=161576192@N05&extras=url_l%2C+date_taken&per_page=999&format=json&nojsoncallback=1')
        .then((res) => {
            let pics = res.data.photos.photo.sort((a,b) => {
                return (a.datetaken > b.datetaken) ? -1 : ((a.datetaken < b.datetaken) ? 1 : 0);
            });
            
            for (let i = 0; i < pics.length; i++) {
                let src = pics[i].url_l;
                let date_taken = pics[i].datetaken;
                let printDate = date_taken.substring(0,10);
                images += `<img src="${src}" onclick="filterToggle()"">`;
                images += `<p>${printDate}</p>`;
            }
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