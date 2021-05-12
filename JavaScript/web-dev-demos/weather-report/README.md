# Weather Report toy

Once you've got a local copy of this ~package / react-app, (and if you have
NodeJS and NPM set up) you can run `npm install` in the shell to prepare to run
the code.  Then execute `npm start` and a browser window should open to
[http://localhost:3000](http://localhost:3000) and the toy should load.

Back in the shell, you can press Control-C to end the hosting of the toy.

See README_original.md for more information.


## Notes on uploading a build version for hosting demos

Here are some notes to myself.  To host a react-app demo:
1. Edit the `package.json` file: add `"homepage": "./"`, so part of the file
contents go...  
   * from:  
     `"name": "package-name",`  
     `"version": "0.1.0",`  
     `"private": true,`
   * to:  
     `"name": "package-name",`  
     `"version": "0.1.0",`  
     `"homepage": "./",`  
     `"private": true,`

2. Create a `build` folder/version:
    * Run `npm run build` in the shell, in the react-app top `package-name` folder.

3. Compress the `build` folder:
   * `tar -zcvf package-name.tar.gz build`
   * To uncompress: `tar -zxvf package-name.tar.gz`
   * To view table of contents: `tar -tvf package-name.tar.gz`

4. Upload the `package-name.tar.gz` file to the host server (eg, in
`public_html/demos`) and extract / uncompress it there, renaming the `build`
folder linking to it appropriately.