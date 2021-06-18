declare enum geometryTypes {
    Point = "POINT",
    MultiPoint = "MULTIPOINT",
    LineString = "LINESTRING",
    MultiLineString = "MULTILINESTRING",
    Polygon = "POLYGON",
    MultiPolygon = "MULTIPOLYGON",
    GeometryCollection = "GEOMETRYCOLLECTION"
}
declare enum collectionTypes {
    Feature = "FEATURE",
    FeatureCollection = "FEATURECOLLECTION"
}
interface pointCoordinates {
    lat: number;
    lang: number;
    alt?: number;
}
interface multiPointCoordinates {
    [index: number]: pointCoordinates;
}
interface lineStringCoordinates {
    [index: number]: pointCoordinates;
}
interface multiLineStringCoordinates {
    [index: number]: lineStringCoordinates;
}
interface linearRingCoordinates {
    [index: number]: lineStringCoordinates;
}
interface polygonCoordinates {
    [index: number]: linearRingCoordinates;
}
interface MultiPolygonCoordinates {
    [index: number]: polygonCoordinates;
}
interface feature {
    type: collectionTypes.Feature;
    geometry: {
        type: geometryTypes;
        coordinates: pointCoordinates | multiPointCoordinates | lineStringCoordinates | multiLineStringCoordinates | polygonCoordinates | MultiPolygonCoordinates;
    };
    properties: {
        [index: string]: any;
    };
}
export interface featureCollection {
    type: collectionTypes.FeatureCollection;
    features: feature[];
}
interface Query {
    geometry?: {
        type: string;
    };
    properties?: {
        [index: string]: any;
    };
}
export declare class FeatureCollection {
    data: featureCollection;
    filePath: string;
    constructor(x: featureCollection, filePath: string);
    Find: (feature?: Query | undefined) => feature[];
    FindByProperty: (x: {
        [index: string]: any;
    }) => feature[];
    FindByGeometry: (d: {
        type?: string;
    }) => feature[];
    private remove;
    private findAndremoveByProperty;
    private findAndremoveByGeometry;
    private update;
    private findAndUpdateAll;
    private findAndUpdateByGeometry;
    private findAndUpdateByProperties;
    GetAllFeatures: () => feature[];
    Update(feature: Query, update: Query): void;
    Remove(feature: Query): void;
    Save(filePath?: string): Promise<void>;
}
export declare const createUsingFile: (filePath: string) => Promise<FeatureCollection>;
export declare const createFromObject: (data: featureCollection, filePath: string) => FeatureCollection;
export declare class GeoJSON {
    static createUsingFile: (filePath: string) => Promise<FeatureCollection>;
    static createFromObject: (data: featureCollection, filePath: string) => FeatureCollection;
}
export {};
//# sourceMappingURL=index.d.ts.map