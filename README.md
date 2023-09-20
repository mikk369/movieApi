# movieApi

## Project structure:

I used vue frontend and nodjes express backend so user can sign up, login,
add movies, delete movies, update movies, search movies.

## How to start

- Clone app to computer:

```
  git clone https://github.com/mikk369/movieApi.git
  cd to movieApi folder
  Make npm install to get dependencies

- .env template:

  DATABASE =
  PORT =
  USERNAME =
  PASSWORD =

  JWT_SECRET=
  JWT_EXPIRES_IN=
  JWT_COOKIE_EXPIRES_IN=


```

- Split terminal and run "npm run serve" to start client side
  and "npm run dev" to run server.

  ## Project

  Made 3 separate localstorages 2 separate arrays for liked movies , one that comes from API
  and other for user added and third for movie search.

- Problems , page needs to be refreshed sometimes to load the movies from array

- When refreshing the previous movie array is displayed
