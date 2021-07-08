# Basic Express App


## Creation

This app was created in a shell by first creating a directory called
`basic-express-app` and then entering the directory and executing
`npx express-generator`.  To install the dependencies, run `npm install`.

At that point, to run the express server (that serves this basic express app),
execute `npm start` (which is defined in the `package.json` file to be an alias
of `node ./bin/www`).  Then you can open a web browser and enter the URI
`http://localhost:3000/`.  That should display a page served by the app that
reads "Express / Welcome to Express".
