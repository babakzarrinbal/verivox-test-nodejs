# VeriVox  Development test
## instruction
  - clone repository 
  - run "npm install" on package root folder
  - run "npm start" to start the server
  - run "npm test" for simple test usecase
  -
  - ! all endpoints will result in json objects
  - ! you can define env variables in ./config/env.js file
  - ! data is stored statically in ./storage/staticdata.json file
  - ! you can change the datasources and adapters in ./adapter folder
  - ! simple tests where implemented to show the use case

!!! this App is just a simple implementation of the test so issues like database connection , CRUD impelementation , data validation ,  advance error prevention , etc... is overlooked
  
## Available api endpoints
  - "/": lists all products 
  - "/{consumption}": lists all products with annual consumption 
  - (you can set query params for [sortby:[tariffName,annualCost], sortorder:[asc,dec]] default is the asending order of annualCost)
  - (for simple view you can set query params view=html)
  
  - "/products/{id}": will return product info by id:[1,2],
  - "/products/{id}/annualcost/{consumption}" : will return product info with annual cost for certain product

