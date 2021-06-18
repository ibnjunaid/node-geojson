import * as fs from "fs/promises";
import { FeatureCollection, createUsingFile, } from '../src/index';

async function xyz () {
    const y : FeatureCollection = await createUsingFile("/home/osama/Desktop/Geojson/data/sample1.geojson")
    console.log(y.GetAllFeatures().length);
    y.Remove({geometry:{type:"Point"}})
    await y.Save("/home/osama/Desktop/Geojson/data/sample3.geojson")
    // console.log(y.GetAllFeatures().length,y.GetAllFeatures().length)
}

xyz().catch(console.error);
