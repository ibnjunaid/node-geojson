import * as fs from 'fs/promises';

async function readGeoJson(fullpath: string){
    try {
        const serializedObject = await fs.readFile(fullpath,'utf-8');
        const geoJSON = JSON.parse(serializedObject);
        return geoJSON
    } catch (error:any) {
        console.log('error occured while reading and parsing geoJSON');
        throw error;
    }
}

//ReadGeoJson return an geoJSON Object wrapped in a promise

readGeoJson("/home/osama/Desktop/Geojson/Point Feature Layers/Bulk_Meter_Location_AA_I.geojson")
    .then(console.log)
    .catch(console.error);
