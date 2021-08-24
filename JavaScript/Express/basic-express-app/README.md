# Basic Express App

## Warning from GitHub

Dependabot alerts
* constantinople  
  critical severity  
  Jul 08, 2021 by GitHub  
  JavaScript/Express/basic-express-app/package-lock.json  
* clean-css  
  low severity  
  Jul 08, 2021 by GitHub  
  JavaScript/Express/basic-express-app/package-lock.json

Dependabot alerts surface known security vulnerabilities in some dependency
manifest files. Dependabot security updates automatically keep your application
up-to-date by updating dependencies in response to these alerts. Dependabot
version updates can also help keep dependencies updated.


## Creation

This app was created in a shell by first creating a directory called
`basic-express-app` and then entering the directory and executing
`npx express-generator`.  To install the dependencies, run `npm install`.

At that point, to run the express server (that serves this basic express app),
execute `npm start` (which is defined in the `package.json` file to be an alias
of `node ./bin/www`).  Then you can open a web browser and enter the URI
`http://localhost:3000/`.  That should display a page served by the app that
reads "Express / Welcome to Express".
