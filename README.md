# Introduction

This is a simple movie database app built with Vue.js and Node.js. It allows users to search for movies and add them to their watchlist. Users can also add their own movies to the database.



## How to start

- Split the terminal, `cd` one terminal to `client/` and the other to `server/`
- Run `npm i` in each directory to download dependencies
- In client side `npm run serve` and in server `npm run dev`

## How to Set Up and Connect to a MongoDB Database

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
3. Select your cluster and then click on `COMPASS` for a visual interface.
4. Download and install MongoDB Compass, which will help you visualize and manage your databases.
5. In Compass, click on `New Connection` and paste the connection string provided by Atlas, which will be in the format: `mongodb+srv://USERNAME:PASSWORD@cluster0.waojuth.mongodb.net/`
6. Replace `USERNAME` and `PASSWORD` with your cluster's username and password, then click `Connect.`
7. Once connected, click on `Databases` and then `Create database.`

### Step 4: Create Your First Database Collection
1. Name your database and create your first collection called `posts.`
2. To add another collection, click the `+` sign and name the new collection `users.`

### Step 5: Update .env File
1. Copy the connection string provided by MongoDB Atlas.
2. The connection string will look like this: `mongodb+srv://USERNAME:PASSWORD@cluster0.waojuth.mongodb.net/DATABASENAME?retryWrites=true&w=majority`
3. Make sure to replace `USERNAME,` `PASSWORD,` and `DATABASENAME` with your actual details.
4. Add this connection string to your `.env` file, ensuring the `DATABASENAME` is positioned before the `?` in the string.
