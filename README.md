# Introduction

This is a simple movie database app built with Vue.js and Node.js. It allows users to search for movies and add them to their watchlist. Users can also add their own movies to the database.

# Initial Setup

## Set up MongoDB Atlas

### Step 1: Create a MongoDB Account
1. Visit the MongoDB website: [https://www.mongodb.com/](https://www.mongodb.com/).
2. Click the `Try Free` button located in the top right corner.
3. Complete the registration form by entering your name, email address, and password.
4. Click `Get started free` to create your MongoDB Atlas account.
5. Check your email for a verification message and click the verification link to confirm your account.

### Step 2: Create a New Cluster
1. After verifying your email, log in to MongoDB Atlas.
2. Click on `Create deployment.`
3. For a free version, choose the `FREE` option on the right. Set the provider to AWS, select the `Stockholm` region, and name your cluster.
4. You will need a username and password for your cluster. Enter these details and click `Create user.`
5. If your current IP address isn't listed, add it to the allowed IPs.
6. Click `Next` and then `Close.`

### Step 3: Obtain Your Database Connection String
1. Once your cluster is ready, click the `CONNECT` button.
2. In the `Connect to your application` section, choose `Drivers.`
3. Copy the connection string and paste it to server/.env. You don't need to replace the `<PASSWORD>` placeholder.


## Set up the terminal and install dependencies
1. Split the terminal: `cd` one terminal to `client/` and the other to `server/`.
2. Run `npm i` in each directory to install the dependencies.

## Fill in the .env file
1. After the dependencies are installed, locate and open the `.env` file in `server/`. 
2. Update it by copying the connection string provided by MongoDB Atlas to MONGO_CONNECTION_STRING
3. Get your MongoDB user's password from under Security and Database Access in MongoDB Atlas and paste it to MONGO_PASSWORD
4. Invent a name to your database and paste it to MONGO_DB_NAME

# Running the app
1. In the client directory, run `npm run serve`.
2. In the server directory, run `npm run dev`.
3. Open [http://localhost:8080/](http://localhost:8080/) in your browser.
