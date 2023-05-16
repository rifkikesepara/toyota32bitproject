# Building the App

### Running the server

To run this app, firstly you should execute the mock server to fetch data to the application.

In order to run the mock server you should be in the right file directory

> cd .../toyota-32bit-project/api

`.../toyota-32bit-project/api>` then you must install the dependencies with the command down below

> npm install

the you can run the server using this command:

> npm start

### Running the application

After running the mock server you will be able to run your application properly. To run the application you should be in the file directory

> cd .../toyota-32bit-project/client

`.../toyota-32bit-project/client>` as before you must install the dependencies before launching the application, use this commend:

> npm install

After that you will be able to launch the program:

> npm start

If you do this steps properly you will be okay. You can enjoy the application :)

### Changing the API that app uses

If you want to use your own backend server for this application there is a json file called **api.json** you can change the url value whatever your server uses. After changing the api url app will adapt immediately.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000/terminals](http://localhost:3000/terminals) to view it in your browser.
The page will reload when you make changes.\

You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.
The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!
See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**
If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.
Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
