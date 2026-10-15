// Real photographed models; all numeric values below are illustrative application fixtures, not manufacturer specifications.
export const VEHICLES=Object.freeze([
  {
    "id": "gt-01",
    "name": "Tesla Model S",
    "kind": "grandTourer",
    "image": "real-model-s.webp",
    "imageWidth": 1280,
    "imageHeight": 960,
    "battery": 100,
    "consumption": 18.2,
    "power": 350,
    "seats": 5,
    "zero100": 4.0,
    "chargeKw": 140,
    "price": 8900000,
    "tag": "distance",
    "color": "#e7e7e2"
  },
  {
    "id": "cross-02",
    "name": "Tesla Model Y",
    "kind": "crossover",
    "image": "real-model-y.webp",
    "imageWidth": 1280,
    "imageHeight": 749,
    "battery": 78,
    "consumption": 16.4,
    "power": 250,
    "seats": 5,
    "zero100": 5.9,
    "chargeKw": 140,
    "price": 4600000,
    "tag": "family",
    "color": "#636d73"
  },
  {
    "id": "sport-03",
    "name": "Tesla Cybertruck",
    "kind": "pickup",
    "image": "real-cybertruck.webp",
    "imageWidth": 1600,
    "imageHeight": 949,
    "battery": 123,
    "consumption": 25.2,
    "power": 450,
    "seats": 5,
    "zero100": 4.4,
    "chargeKw": 180,
    "price": 11500000,
    "tag": "performance",
    "color": "#b1b7bc"
  }
]);
export const PHOTO_CREDITS=[
  {
    "filename": "real-model-s.webp",
    "realmodel": "Tesla Model S Long Range (2021)",
    "originalsourceURL": "https://commons.wikimedia.org/wiki/File:2021_Tesla_Model_S_P2_Long_Range_front_right_view.jpg",
    "author": "Dllu",
    "license": "CC BY-SA 4.0",
    "licenseURL": "https://creativecommons.org/licenses/by-sa/4.0/",
    "sourceimageURL": "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b6/2021_Tesla_Model_S_P2_Long_Range_front_right_view.jpg/1280px-2021_Tesla_Model_S_P2_Long_Range_front_right_view.jpg",
    "modifications": "format conversion and resizing only"
  },
  {
    "filename": "real-model-y.webp",
    "realmodel": "Tesla Model Y (2020)",
    "originalsourceURL": "https://commons.wikimedia.org/wiki/File:2020_Tesla_Model_Y,_front_8.1.20.jpg",
    "author": "Kevauto",
    "license": "CC BY-SA 4.0",
    "licenseURL": "https://creativecommons.org/licenses/by-sa/4.0/",
    "sourceimageURL": "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b0/2020_Tesla_Model_Y%2C_front_8.1.20.jpg/1280px-2020_Tesla_Model_Y%2C_front_8.1.20.jpg",
    "modifications": "format conversion and resizing only"
  },
  {
    "filename": "real-cybertruck.webp",
    "realmodel": "Tesla Cybertruck Foundation Series (2024)",
    "originalsourceURL": "https://commons.wikimedia.org/wiki/File:2024_Tesla_Cybertruck_Foundation_Series,_front_left_(Greenwich).jpg",
    "author": "Mr.choppers",
    "license": "CC BY-SA 3.0",
    "licenseURL": "https://creativecommons.org/licenses/by-sa/3.0/",
    "sourceimageURL": "https://upload.wikimedia.org/wikipedia/commons/9/95/2024_Tesla_Cybertruck_Foundation_Series%2C_front_left_%28Greenwich%29.jpg",
    "modifications": "format conversion and resizing only"
  },
  {
    "filename": "real-road.webp",
    "realmodel": "Tesla Model S on a countryside road",
    "originalsourceURL": "https://unsplash.com/photos/a-blue-car-driving-down-a-country-road-2uOBdYu1LMM",
    "author": "Mirko Fabian",
    "license": "Unsplash License",
    "licenseURL": "https://unsplash.com/license",
    "modifications": "format conversion and resizing only"
  }
];
export const PAINTS=[{id:'ocean',price:0,color:'#0759b6',filter:'none'},{id:'silver',price:95000,color:'#aab3bd',filter:'saturate(.04) brightness(1.28)'},{id:'ruby',price:145000,color:'#a82030',filter:'hue-rotate(122deg) saturate(.85)'},{id:'graphite',price:120000,color:'#343b42',filter:'saturate(.1) brightness(.65)'}];
export const WHEELS=[{id:'aero',price:0,extraConsumption:0},{id:'sport',price:180000,extraConsumption:1.1}];
export const INTERIORS=[{id:'light',price:0},{id:'dark',price:120000}];
export const CITIES=[
 {id:'munich',lat:48.1372,lon:11.5756},{id:'berlin',lat:52.5200,lon:13.4050},{id:'hamburg',lat:53.5511,lon:9.9937},{id:'frankfurt',lat:50.1109,lon:8.6821},{id:'stuttgart',lat:48.7758,lon:9.1829},{id:'vienna',lat:48.2082,lon:16.3738},{id:'salzburg',lat:47.8095,lon:13.0550},{id:'zurich',lat:47.3769,lon:8.5417},{id:'milan',lat:45.4642,lon:9.1900},{id:'prague',lat:50.0755,lon:14.4378},{id:'paris',lat:48.8566,lon:2.3522},{id:'amsterdam',lat:52.3676,lon:4.9041}
];
export const LANGS=['de','en','ru','uk'];
export const LOCALES={de:'de-DE',en:'en-GB',ru:'ru-RU',uk:'uk-UA'};
export const ROUTES=['/','/collection/','/finder/','/configure/','/journey/','/garage/','/about/',...VEHICLES.map(v=>'/models/'+v.id+'/')];

export const INTRO_CLIP=Object.freeze({
 src:'/assets/arrival-drive.mp4',
 poster:'/assets/arrival-poster.jpg',
 title:'Tesla Loveday: Energy — Alpine driving excerpt',
 author:'Atellani LLC',
 sourceURL:'https://commons.wikimedia.org/wiki/File:Tesla_Loveday-_%22Energy%22.webm',
 license:'CC BY 3.0',
 licenseURL:'https://creativecommons.org/licenses/by/3.0/',
 modifications:'Excerpt 40.6–43.3 s; slowed to 50% with frame interpolation; audio removed; resized and re-encoded for the web'
});

export const INTRO_MUSIC=Object.freeze({src:'/assets/intro-music.mp3',title:'Dream Culture',author:'Kevin MacLeod (incompetech.com)',sourceURL:'https://www.incompetech.com/music/royalty-free/index.html?isrc=USUAN1300046',license:'CC BY 4.0',licenseURL:'https://creativecommons.org/licenses/by/4.0/'});
