// Key:
// 3f512a426170f3b1734a0f4d2dbf5048

// Secret:
// 7a23164b892572de

//https://api.flickr.com/services/rest/?method=flickr.people.getPhotos&api_key=4bfa503b17ffb78a357c40b61b07bfb1&user_id=jamessphotography
const axios = require('axios');

axios.get('https://api.flickr.com/services/rest/?method=flickr.people.getPhotos&format=json&api_key=3f512a426170f3b1734a0f4d2dbf5048&nojsoncallback=1&user_id=jamessphotography')
        .then((res) => {
            // For each photo id call:
            // flickr.photos.getSizes
            // Create an img tag with src = to the response image url
            // console.log(res.data.photos.photo);

            for (let i = 0; i < res.data.photos.photo.length; i++) {
                let id = res.data.photos.photo[i].id;
                //console.log(id);
                let url = `https://api.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key=febb2a6247e2bfe3935a3bdd0ceb07fc&photo_id=${id}&format=json&nojsoncallback=1`;
                
                axios.get(url)
                    .then((res) => {
                        console.log(res.data.sizes.size[8].source);
                    })
                    .catch((e) => {
                        console.log(e);
                    })
            }
        })
        .catch((e) => {
            console.log(e);
        });

hbs.registerHelper('getImages', () => {
    axios.get('https://api.flickr.com/services/rest/?method=flickr.people.getPhotos&format=json&api_key=3f512a426170f3b1734a0f4d2dbf5048&nojsoncallback=1&user_id=jamessphotography')
    .then((res) => {
        for (let i = 0; i < res.data.photos.photo.length; i++) {
            let id = res.data.photos.photo[i].id;
            let url = `https://api.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key=febb2a6247e2bfe3935a3bdd0ceb07fc&photo_id=${id}&format=json&nojsoncallback=1`;
            let html;
            let src;
            axios.get(url)
                .then((res) => {
                    html += `<img src= ${src}>`;
                })
                .catch((e) => {
                    console.log(e);
                })

    return html;
    })
    .catch((e) =>{
        console.log(e);
    });
}