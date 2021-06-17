import * as fs from "fs/promises";

enum geometryTypes {
    Point = "POINT", 
    MultiPoint = "MULTIPOINT", 
    LineString = "LINESTRING",
    MultiLineString = "MULTILINESTRING", 
    Polygon = "POLYGON", 
    MultiPolygon = "MULTIPOLYGON",
    GeometryCollection = "GEOMETRYCOLLECTION"
}

enum collectionTypes {
    Feature = "FEATURE",
    FeatureCollection = "FEATURECOLLECTION"
}

//   For type "Point", the "coordinates" member is a single position.

interface pointCoordinates {
    lat : number,
    lang : number,
    alt ?: number
}

//  For type "MultiPoint", the "coordinates" member is an array of
//  positions.

interface multiPointCoordinates {
    [index : number] : pointCoordinates
}

//   For type "LineString", the "coordinates" member is an array of two or
//   more positions.

interface lineStringCoordinates{
    [index : number] : pointCoordinates //FIXME:  add strictness for array of two or more positions.
}

//   For type "MultiLineString", the "coordinates" member is an array of
//   LineString coordinate arrays

interface multiLineStringCoordinates{
    [index : number] : lineStringCoordinates
}

/*
    *  A linear ring is a closed LineString with four or more positions.

    *  The first and last positions are equivalent, and they MUST contain
        identical values; their representation SHOULD also be identical.

    *  A linear ring is the boundary of a surface or the boundary of a
        hole in a surface.

    *  A linear ring MUST follow the right-hand rule with respect to the
        area it bounds, i.e., exterior rings are counterclockwise, and
        holes are clockwise.
*/
//TODO: make linar ring coordinates to satisfy above conditions
interface linearRingCoordinates{
    [index : number] : lineStringCoordinates
}

/*
   o  For type "Polygon", the "coordinates" member MUST be an array of
      linear ring coordinate arrays.

   o  For Polygons with more than one of these rings, the first MUST be
      the exterior ring, and any others MUST be interior rings.  The
      exterior ring bounds the surface, and the interior rings (if
      present) bound holes within the surface.
*/
interface polygonCoordinates{
    [index : number] :  linearRingCoordinates
}

/*

   For type "MultiPolygon", the "coordinates" member is an array of
   Polygon coordinate arrays.

*/

interface MultiPolygonCoordinates{
    [index : number] : polygonCoordinates
}



interface feature{
    type : collectionTypes.Feature
    geometry : {
        type : geometryTypes,
        coordinates : pointCoordinates | multiPointCoordinates |
        lineStringCoordinates | multiLineStringCoordinates |
        polygonCoordinates | MultiPolygonCoordinates
    }
    properties : {
        [index:string] : any
    }
}


export interface featureCollection{
    type : collectionTypes.FeatureCollection,    
    features : Array<feature>; // Make features an Array of all possible types
}

export class FeatureCollection {
    data : featureCollection;
    constructor(x: featureCollection){
        this.data = x;
    }
    findFeatureByProperty = ( x : {[index:string]:any}) => {
        return this.data.features.filter(f => {
            for (let [key,value] of Object.entries(x)){
                if(f.properties[key] != value){
                    return false;
                }
            }
            return true;
        })
    }
    // Find and Add properties
    // 
}
export class geoJSON {
    static createByFile  = async (filePath : string) =>{
        const data = await fs.readFile(filePath,'utf-8');
        const json = JSON.parse(data);
        return new FeatureCollection(json)
    }
}