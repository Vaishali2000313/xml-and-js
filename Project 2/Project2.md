## Main Idea
The index.html file is also used to load data from the data.json file. The index.html file has a form and a number of filters for screening data and displaying it in a table.

## Logic Implemented
1. The function getAllContractors accepts several parameters and filters the data based on them.
2. The contractorId parameter is passed to the getContractorById function, which returns a contractor with the specified Id.

## Framework
The controller and data folders are located in the api folder.
The functions that implement the login are in the controller folder.
The data file from which the data is retrieved is located in the data folder.
The main.js file is in charge of loading data from the controllers.
