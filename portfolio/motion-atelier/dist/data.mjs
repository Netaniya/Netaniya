export const VEHICLES=Object.freeze([
 {id:'gt-01',name:'GT 01',kind:'grandTourer',image:'gt-blue-cinematic.webp',battery:92,consumption:16.8,power:280,seats:5,zero100:4.8,chargeKw:140,price:7950000,tag:'distance',color:'#0759b6'},
 {id:'cross-02',name:'CROSS 02',kind:'crossover',image:'cross-silver.webp',battery:106,consumption:19.6,power:300,seats:5,zero100:5.2,chargeKw:150,price:8350000,tag:'family',color:'#9ea9b6'},
 {id:'sport-03',name:'SPORT 03',kind:'sportCoupe',image:'sport-red.webp',battery:82,consumption:18.9,power:390,seats:2,zero100:3.5,chargeKw:150,price:10950000,tag:'performance',color:'#b52821'}
]);
export const PAINTS=[{id:'ocean',price:0,color:'#0759b6',filter:'none'},{id:'silver',price:95000,color:'#aab3bd',filter:'saturate(.04) brightness(1.28)'},{id:'ruby',price:145000,color:'#a82030',filter:'hue-rotate(122deg) saturate(.85)'},{id:'graphite',price:120000,color:'#343b42',filter:'saturate(.1) brightness(.65)'}];
export const WHEELS=[{id:'aero',price:0,extraConsumption:0},{id:'sport',price:180000,extraConsumption:1.1}];
export const INTERIORS=[{id:'light',price:0},{id:'dark',price:120000}];
export const CITIES=[
 {id:'munich',lat:48.1372,lon:11.5756},{id:'berlin',lat:52.5200,lon:13.4050},{id:'hamburg',lat:53.5511,lon:9.9937},{id:'frankfurt',lat:50.1109,lon:8.6821},{id:'stuttgart',lat:48.7758,lon:9.1829},{id:'vienna',lat:48.2082,lon:16.3738},{id:'salzburg',lat:47.8095,lon:13.0550},{id:'zurich',lat:47.3769,lon:8.5417},{id:'milan',lat:45.4642,lon:9.1900},{id:'prague',lat:50.0755,lon:14.4378},{id:'paris',lat:48.8566,lon:2.3522},{id:'amsterdam',lat:52.3676,lon:4.9041}
];
export const LANGS=['de','en','ru','uk'];
export const LOCALES={de:'de-DE',en:'en-GB',ru:'ru-RU',uk:'uk-UA'};
export const ROUTES=['/','/collection/','/finder/','/configure/','/journey/','/garage/','/about/',...VEHICLES.map(v=>'/models/'+v.id+'/')];
