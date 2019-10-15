#HRSystem Challenge !
 **The full HR System** web application, that maintain various functionalities .

## Contents

- [Features](#features)
- [Getting started](#getting-started)
- API
  - [Methods](#api)
  - [Options](#options)
  - [Validation errors](#validation-errors)
- [Plugins](#plugins)
- [Related packages](#related-packages)
- [Tests](#tests)

## Features

- Login/Register Authentication system
- Add/Edit/Delete/index Employees
- Add/Edit/Delete/index Benefits
- Search Enigne
- Roles/Permissions as for employee and HR Role

 # Getting started
- install package.json (npm install) , this should install all packages required
- create your .env file as similar to .env.example
- Using Sqlite with Sequalize with [Sync] method , Tables are being generated Automatically
- Write in terminal (node server.js) to run the project server 
- open browser with localhost:3000 as 3000 the default port


# API
- /signup post
    - body {
        	"Email":"admin@sys.com",
            "Password":"123456",
            "Name":"admin",
            "ManagerID":2,
            "DepartmentID":1,
            "Phone":"1234597878",
            "Address":"First Address Line__ST",
            "IsAdmin":1
    }
- /login post
    -body {
        	"Email":"admin@sys.com",
	        "Password":"123456"
    }
- /addEmployee post
    -body {
            "Email":"nada@sys.com",
            "Password":"123456",
            "Name":"nada",
            "ManagerID":2,
            "DepartmentID":1,
            "Phone":"1234597878",
            "Address":"Hopa Address__SR"
    }
- /updateEmployee post 
    -body {
        "Name" : Samira,
        "Phone":"12346789"
    }
- /deleteEmployee/:id get
- /addBenefits post
    -body{
        "Title":"Offer",
        "Description":"good offer as Senior"
    }
- /updateBenefits post
    -body {
        "Description":"good offer as Junior"
    }
- /deleteBenefits/:id get
- searchForBenefits post
    -body {
        "SearchTerm" : "offer"
    }
- /getAllEmployees get
- /getEmployeeByID/:id get
- /addDepartment post
    -body {
        "Name" : "Software Development"
    }

## Tests

> npm test

 ## .ENV FILE

.env file should conatin the following data:

> BASE_URL=http://localhost:3000	

> PORT = 3000

> databasestorage = 'CompanySystem'

> JWT_SECRET ='top_secret'