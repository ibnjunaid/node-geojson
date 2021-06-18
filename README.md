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
    //  Update all features matching query
    // by adding update doc to each feature.
    geodata.Update(update : Query, query : Query)

    //  Update all features in the FeatureCollection, when only update is passed 
    geodata.Update(update : Query)


```

```js
    geodata.Remove()
```

```js
    geodata.Save()
```


```js
    // GetAllFeatures return all features 
    // in the collection
    geodata.GetAllFeatures()
```

<!-- ## Example Usage -->
