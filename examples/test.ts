import * as fs from "fs/promises";
import { FeatureCollection, geoJSON } from '../index';

// async function init(){
//     const data = await fs.readFile("/home/osama/Desktop/Geojson/data/sample1.geojson","utf-8");
//     // console.log (data)
//     let data1 = {name : "Osama"}
//     let x = JSON.parse(data); 
//     let l = new FeatureCollection(x);
//     console.log(l.findFeatureByProperty({
//         name : "Osama"
//     }));
// }

// async function Block_AA_I(){
//     const data = await fs.readFile("/home/osama/Desktop/Geojson/Closed Area Feature Layers/Block_AA_I.geojson","utf-8");
//     let x = JSON.parse(data); 
//     let l = new FeatureCollection(x);
//     console.log(l.findFeatureByProperty({
//         Id : 1,
//         Block_ID: '30'
//     }));
// }

async function xyz () {
    const x = await geoJSON.createByFile("/home/osama/Desktop/Geojson/Closed Area Feature Layers/Block_AA_I.geojson");
    let t = x.findFeatureByProperty({'Id':1})
    console.log(t.length);
}

xyz().catch(console.error);

// Block_AA_I().then(console.log).catch(console.error);