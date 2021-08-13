# Movies App #
This is a Fullstack Application developed with MongoDB, Express, React, and Nodejs using the [MovieDB API](https://developers.themoviedb.org/3).

## View Live Application ##
[Live Demo is hosted on Heroku](https://movies-app-mern.herokuapp.com/)  
Please allow some time for the server to wake up from sleep.
  

## Prerequisites ##
### Install Node JS
https://nodejs.org/en/

### Obtain API Keys ###
1. Go to the [MovieDB website](https://developers.themoviedb.org/3) and register for a free API key.
2. Go to the [auth0 website](https://auth0.com/docs/quickstart/spa/react#configure-auth0) and register for a free account.

## Setup / Instalation ##
Download the project and open the root directory.
Run the following commands to install the required packages

```bash
npm install

cd client
npm install
```

You must also set the environment variables for both the frontend and backend.
1. Create a `.env` file in `/` and set the following variables

   ```bash
   API_KEY = your MovieDB API key
   MONGODB_URI = your mongoDB connection string
   PORT = your server port here
   ```

   
2. Create a `.env` file in `/client` and set the following variables

   ```bash
   REACT_APP_AUTH0_DOMAIN = your auth0 domain
   REACT_APP_AUTH0_CLIENT_ID = your auth0 clientID
   REACT_APP_SERVER_URL = server url (eg: http://localhost:4000)
   ```

## Running the App ##
1. Start the React App by navigating to `/` and running `npm start`
2. Start the Server by navigating to `/client` and running `npm start`
3. The app can now be seen by naviagating to http://localhost:3000

## Running the Production Build
1. Add the following line to the `.env` file found in `/`

   ```bash
   NODE_ENV=production
   ```

2. Navigate to `/client` and run `npm run build`

This will make the Express server serve the production build of our React app to the user.  
To run the app, simply run navigate to `/` and run `npm start`.  
The production build will now be running on the server address (default: http://localhost:4000).  
