# node-geojson
Perform CRUD operations on geoJSON data using node

## Installation 
For node, use npm: `$ npm install node-geojson`

## Getting Started

```js
    const geoJSON = require('node-geojson');  

    async function main(){
        const geodata = await geoJSON.createUsingFile("path/to/geoJSON/file");
        
        // Optional filePath to manipulate data in memory for front-end applications 
        // without filesystem
        const inMemorygeodata = geoJSON.createFromObject(jsonObject); 
    }
```

## Documentation

### Instantiate 
 > <code>createUsingFile</code> function reads a geoJSON file and returns a promise which resolves to an Object of  <code>FeatureCollection</code> class.

 > <code>createFromObject</code> function takes a valid geoJSON Object along with an optional filePath where we may want to save the file, and returns an Object of <code>FeatureCollection</code>  class.



### FeatureCollection : class 


#### Methods
> Instance of FeatureCollection provide following methods to operate on the geojson.

##### Add
```js 
    // Add a new feature of interface feature to features Array
    FeatureCollection.Add(f) 
```

##### Find
```js 

    // Returns  features that matches the Query q
    FeatureCollection.Find(q?:Query) 

    // When called without any parameter, returns all features in the collection
    FeatureCollection.Find() 
```
##### FindByGeometry

```js
    /* 
        Return features matching geometry 
        specified in the parameter 
    */
    const geometry = {type:"Point"}

    FeatureCollection.FindByGeometry(geometry)
```
##### FindByProperty

```js 
    // Return features matching properties 
    // specified in the parameter 
    const property = {
        name : "pengooX",
        Id : 123
    }
    
    FeatureCollection.FindByProperty(property)
```
##### Update

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
    FeatureCollection.Update(update : Query, query : Query)

    //  Update all features in the FeatureCollection, when only update is passed 
    FeatureCollection.Update(update : Query)


```
##### Remove

```js
    //  Remove features matching query
    FeatureCollection.Remove(query : Query)
```
> Methods automatically donot write the data to disk. To write data to disk call  ```Save``` method,  optionally passing the path where you want to save the file.
If no path is specified and ```FeatureCollection``` was created using ```createUsingFile``` function, then data is overwritten to the same file
In case of ```FeatureCollection``` created using ```createFromObject```, the filePath is mandatory if you want to call ```Save```  without path it will fail.

##### Save

```js
    //Save the file to the specified path
    FeatureCollection.Save("path/where/i/want/to/save")
    
    // for createUsingFile
    // overwrite to same path from which it was created 
    FeatureCollection.Save()
```
##### GetAllFeatures
>  GetAllFeatures return all features in the collection

```js
    FeatureCollection.GetAllFeatures()
```


### Interface
> All functions take parameter of the following form satisfying the ```Query``` interface
```ts
const param = {
    geometry: {
        type: 'Point'
    },
    properties: {
        name : "PengooX",
        color : ' red'
        // ... many more
    }
}
```

## Example Usage
