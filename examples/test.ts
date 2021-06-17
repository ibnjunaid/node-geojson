import * as fs from "fs/promises";
import { FeatureCollection, createUsingFile, GeoJSON } from '../index';

async function xyz () {
    const x = await GeoJSON.createUsingFile("/home/osama/Desktop/Geojson/data/sample1.geojson")
    const y = await GeoJSON.createUsingFile("/home/osama/Desktop/Geojson/data/sample1.geojson")
    y.Remove({geometry:{type:"Point"}})
    await y.Save("test.geoJSON")
    console.log(x.data.features.length,y.data.features.length)
}

xyz().catch(console.error);
