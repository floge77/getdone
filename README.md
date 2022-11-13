# GetDone - the most basic ToDo App you've ever seen

## About this project

This is my approach to learn Typescript and VueJS.
I am completely new to Typescript as well as Frontend development.
Therefore the code can be a bit messy and I guess it definitely does not follow best practices.

## How to use

The project consists a frontend and a backend as well as a database.
It is expected to run a postgres docker container before starting the backend.
Check [setupDB.sh](setupDB.sh) for more infos and watch out for the hard-coded password!
After that you can start the backend via `cd backend && npm run start && cd ..`.
Next start the frontend via `cd frontend && npm run dev && cd ..`.
Then you should be able to access the application via [localhost:5173](http://localhost:5173/).

## Technologies used

1. Docker and Postgres for the Database.
2. VueJS with Typescript for the Frontend.
3. Typescript, Express and TypeORM for the backend server and the ORM for our entities to avoid doing manual SQL queries.

## Other

This project is WIP and only a playground.
