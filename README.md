# movieApi

## Project structure:

I used vue frontend and nodjes express backend so user can sign up, login,
add movies, delete movies, update movies, search movies.

## How to start

- Clone app to computer:

```
  git clone https://github.com/mikk369/movieApi.git
  cd to movieApi folder
  - Split terminal, cd one terminal to client and other to server
  then make npm i on each to get dependencies.
  - In client side "npm run serve" and in server "npm run dev "

- .env template:

  DATABASE =
  PORT =
  USERNAME =
  PASSWORD =

  JWT_SECRET=
  JWT_EXPIRES_IN=
  JWT_COOKIE_EXPIRES_IN=

```

## How to Create a MongoDB Account and Connect to a MongoDB Database

Step 1: Create a MongoDB Account
Go to the MongoDB website: https://www.mongodb.com/.

Click on the "Try Free" button in the top right corner.

Fill out the registration form with your information, including your name, email address, and password.

Click the "Get started free" button to create your MongoDB Atlas account.

You will receive a verification email. Open your email and click the verification link to verify your account.

Step 2: Create a New Cluster
Once you've verified your account, log in to MongoDB Atlas.

After logging in, click Create deployment.

Choose right side FREE version, can leave default options or provider AWS, region Stockholm and name your cluster.

Use username and password, need them in .env file, enter user and the random password and click create user.

Next add my curent IP address if its not already added.

Clic Next and close.

Step 3: Get Your Database Connection String
After your cluster is created, click on the "CONNECT" button.

Under "Connect to your application" choose Drivers

choose you cluster in browser and click Connect , choose COMPASS

download compass to your computer, copy the connection string

Click new connection from left top side, and copy your connection string

mongodb+srv://USERNAME:PASSWORD@cluster0.waoutjh.mongodb.net/

string should look like this and replace the fields with your data, click connect

from top side choose Databases and create database:

![Alt text](image-1.png)

add your database name and first collection name posts

next click the + sign to create collection:

![Alt text](image.png)

collection name: users

need to add the username, password and connection string to .env file

copy the connection string to .env file

mongodb+srv://USERNAME:PASSWORD@cluster0.waoutjh.mongodb.net/DATABASENAME?retryWrites=true&w=majority

your DATABASE name has to be before the ? sign
