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
    lat: number,
    lang: number,
    alt?: number
}

//  For type "MultiPoint", the "coordinates" member is an array of
//  positions.

interface multiPointCoordinates {
    [index: number]: pointCoordinates
}

//   For type "LineString", the "coordinates" member is an array of two or
//   more positions.

interface lineStringCoordinates {
    [index: number]: pointCoordinates //FIXME:  add strictness for array of two or more positions.
}

//   For type "MultiLineString", the "coordinates" member is an array of
//   LineString coordinate arrays

interface multiLineStringCoordinates {
    [index: number]: lineStringCoordinates
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
interface linearRingCoordinates {
    [index: number]: lineStringCoordinates
}

/*
   o  For type "Polygon", the "coordinates" member MUST be an array of
      linear ring coordinate arrays.

   o  For Polygons with more than one of these rings, the first MUST be
      the exterior ring, and any others MUST be interior rings.  The
      exterior ring bounds the surface, and the interior rings (if
      present) bound holes within the surface.
*/
interface polygonCoordinates {
    [index: number]: linearRingCoordinates
}

/*

   For type "MultiPolygon", the "coordinates" member is an array of
   Polygon coordinate arrays.

*/

interface MultiPolygonCoordinates {
    [index: number]: polygonCoordinates
}



interface feature {
    type: collectionTypes.Feature
    geometry: {
        type: geometryTypes,
        coordinates: pointCoordinates | multiPointCoordinates |
        lineStringCoordinates | multiLineStringCoordinates |
        polygonCoordinates | MultiPolygonCoordinates
    }
    properties: {
        [index: string]: any
    }
}


interface featureCollection {
    type: collectionTypes.FeatureCollection,
    features: feature[];
}

export interface Query {
    geometry?: {
        type: string
    },
    properties?: {
        [index: string]: any
    }
}
export class FeatureCollection {
    private data: featureCollection;
    private filePath : string | undefined

    constructor(x: featureCollection, filePath ?:string) {
        this.data = x;
        this.filePath = filePath
    }

    public Find  (feature?: Query)  {
        if (feature === undefined) {
            return this.data.features
        } else if (feature.geometry?.type === null && feature.properties === null) {
            return this.data.features
        } else if (feature.geometry?.type === null) {
            return this.FindByProperty(feature?.properties || {});
        } else if (feature.properties === null) {
            return this.FindByGeometry(feature?.geometry || {})
        } else {
            return this.data.features.filter(f => {
                if (f.geometry.type !== feature.geometry?.type) {
                    return false;
                } else {
                    for (let [key, value] of Object.entries(feature?.properties || {})) {
                        if (f.properties[key] != value) {
                            return false;
                        }
                    }
                    return true;
                }
            })
        }
    }


    public FindByProperty (x: { [index: string]: any }) {
        return this.data.features.filter(f => {
            for (let [key, value] of Object.entries(x)) {
                if (f.properties[key] != value) {
                    return false;
                }
            }
            return true;
        })
    }

    public FindByGeometry (d: { type?: string }) {
        return this.data.features.filter(f => f.geometry.type === d?.type)
    }

    private remove = (feature: Query) => {
        if (feature.geometry === undefined) {
            return this.findAndremoveByProperty(feature?.properties || {})
        } else if (feature.properties === undefined) {
            return this.findAndremoveByGeometry(feature.geometry);
        } else {
            return this.data.features.filter(f => {
                if (f.geometry.type !== feature.geometry?.type) {
                    return true;
                } else {
                    for (let [key, value] of Object.entries(feature?.properties || {})) {
                        if (f.properties[key] != value) {
                            return true;
                        }
                    }
                    return false;
                }
            })
        }
    }

    private findAndremoveByProperty = (properties: { [index: string]: any }) => {
        return this.data.features.filter(f => {
            for (let [key, value] of Object.entries(properties)) {
                if (f.properties[key] != value) {
                    return true;
                }
            }
            return false;
        })
    }

    private findAndremoveByGeometry = (geometry: { type: string; }) => {
        return this.data.features.filter(f => f.geometry.type !== geometry?.type)
    }

    private update = (update: Query, feature?: Query) => {
        if (feature === undefined) {
            return this.findAndUpdateAll(update || {});
        } else if (feature.geometry === undefined) {
            return this.findAndUpdateByProperties(feature.properties || {}, update || {})
        } else if (feature.properties === undefined) {
            return this.findAndUpdateByGeometry(feature.geometry, update || {})
        }
        return this.findAndUpdateAll(update || {});
    }

    private findAndUpdateAll(update: Query) {
        return this.data.features.map(f => {
            for (const [key, value] of Object.entries(update?.properties || {})) {
                f.properties[key] = value;
            }
            if (update?.geometry?.type) {
                f.geometry.type = update.geometry.type as geometryTypes;
            }
            return f!;
        })
    }

    private findAndUpdateByGeometry(geometry: { type: string; }, update: Query) {
        return this.data.features.map(f => {
            if (f.geometry.type === geometry.type) {
                for (const [key, value] of Object.entries(update?.properties || {})) {
                    f.properties[key] = value;
                }
                if (update?.geometry?.type) {
                    f.geometry.type = update.geometry.type as geometryTypes
                }
            }
            return f!;
        })
    }

    private findAndUpdateByProperties(properties: { [index: string]: any; }, update: Query) {
        return this.data.features.map(f => {
            for (const [key, value] of Object.entries(properties)) {
                if (f.properties[key] !== value) {
                    return f;
                }
                for (const [key, value] of Object.entries(update?.properties || {})) {
                    f.properties[key] = value;
                }
                if (update?.geometry?.type) {
                    f.geometry.type = update.geometry.type as geometryTypes;
                }
            }
            return f
        })
    }

    public GetAllFeatures (){
        return this.data.features
    }
    public Update( update: Query,feature?: Query){
        this.data.features = this.update(update,feature);
    }
    public Remove(feature:Query){
        this.data.features = this.remove(feature)
    }
    public async Save(filePath ?: string){
        const realpath = filePath === undefined ? this.filePath : filePath;
        console.log(realpath);
        try{
            if(realpath){
                await fs.writeFile(realpath,JSON.stringify(this.data))

            } else {
                throw "Pass location where you want to save the file";
            }
        } catch (error){
            throw error;
        }
    }

}

//-----------------------------------------------------Exports below this line-----------------------------


export const createUsingFile = async (filePath: string) => {
    const data = await fs.readFile(filePath, 'utf-8');
    const json = JSON.parse(data);
    return new FeatureCollection(json,filePath)
}

export const createFromObject = (data: featureCollection , filePath ?: string) => {
    return new FeatureCollection(data, filePath);
}


