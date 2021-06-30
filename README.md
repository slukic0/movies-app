# Movies App #
This is a Fullstack Application developed using the MongoDB, Express, React, and Nodejs using the [MovieDB API](https://developers.themoviedb.org/3).

## Prerequisites ##
### Install Node JS
https://nodejs.org/en/

### Obtain API Keys ###
1. Go to the [MovieDB website](https://developers.themoviedb.org/3) and register for a free API key.
2. Go to the [auhh0 website](https://auth0.com/docs/quickstart/spa/react#configure-auth0) and register for a free API key.

## Setup / Instalation ##
Download the project and open the root directory.
Run the following commands to install the required packages

```bash
npm install
cd server
npm install
```

You must also set the environment variables for both the frontend and backend
1. Create a `.env` file in `./` and set the following variables
   ```bash
   REACT_APP_AUTH0_DOMAIN = your auth0 domain
   REACT_APP_AUTH0_CLIENT_ID = your auth0 clientID
   ```
2. Create a `.env` file in `./server` and set the following variables
   ```
   API_KEY = your MovieDB API key
   ```

## Running the App ##
1. Start the React App by navigating to `./` and running `npm start`
2. Start the React App by navigating to `./server` and running `node server.js`
