# node-geojson
perform CRUD operations on geoJSON data using node

## Installation 
For node, use npm: `$ npm install node-geojson`

## Getting Started 
```js
    const geoJSON = require('node-geojson');  
 ```
 > <code style="background:black; color: yellow;padding: 3px;  ">createUsingFile</code> function reads a geoJSON file and returns a promise which resolves to an Object of  <code style="background:black; color: green;padding: 3px;  ">FeatureCollection</code> class.
```js 
    async function main(){
        const geodata = await geoJSON.createUsingFile("path/to/geoJSON/file");
    }
```
 > <code style="background:black; color: yellow;padding: 3px;  ">createFromObject</code> function  takes a valid  geoJSON Object along with an optional filePath where we may  want to save the file and returns an Object of <code style="background:black; color: green;padding: 3px;  ">FeatureCollection</code>  class.
```js 
    function main(){

        const geodata = geoJSON.createFromObject(jsonObject,"path/to/save the file");
        
        //optional filePath to manipulate data in memory for front-end applications 
        // without filesystem
        const inMemorygeodata = geoJSON.createFromObject(jsonObject); 

    }
```

<span style="color:yellow ;padding: 4px"> interface </span> <code style="background:black; color: green;padding: 3px;"> Query </code>

> ### Defines the structure of Query and Update Object that need to be passed to the methods 
```ts 
{
    geometry?: {
        type: string
    },
    properties?: {
        [index: string]: any
    }
}
```

<span style="color:yellow ;padding: 4px"> class </span> <code style="background:black; color: green;padding: 3px;"> FeatureCollection </code>

> Objects of FeatureCollections provide following methods to operate on the geojson.

```js 
    // Returns  features that matches the Query q
    FeatureCollection.Find(q?:Query) 

    // When called without any parameter, returns all features in the collection
    FeatureCollection.Find() 
```
```js
    // Return features having geometry 
    // specified in the parameter 
    const geometry = {type:"Point"}

    FeatureCollection.FindByGeometry(geometry)
```

```js 
    // Return features having properties 
    // specified in the parameter 
    const property = {
        name : "pengooX",
        Id : 123
    }
    
    FeatureCollection.FindByProperty(property)
```

```js 
    const update =  {
        properties : {
        color : red,
        category : 'Quarantine zone'
    }};
    const query = {
        properties : {
            locality : "XYZ"
        }
    }
    //  Update features matching query
    // by adding properties from update Object to each feature.
    geodata.Update(update : Query, query : Query)

    //  Update all features in the FeatureCollection, when only update is passed 
    geodata.Update(update : Query)


```

```js
    //  Remove features matching query
    geodata.Remove(query : Query)
```
> Methods automatically donot write the data to disk. To write data to disk call  ```Save``` method,  optionally passing the path where you want save the file.
If no path is specified and ```FeatureCollection``` was created using ```createUsingFile``` function, then data is written to the same file
In case of ```FeatureCollection``` created using ```createFromObject```, the filePath is mandatory if you want to call ```Save``` else Save will fail

```js
    //Save the file to the specified path
    FeatureCollection.Save("path/where/i/want/to/save")
    
    // for createUsingFile
    // overwrite to same path from which it was created 
    FeatureCollection.Save()
```


```js
    // GetAllFeatures return all features 
    // in the collection
    FeatureCollection.GetAllFeatures()
```

<!-- ## Example Usage -->
