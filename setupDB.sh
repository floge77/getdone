#!/bin/bash

resetDB() {
    docker rm -f postgres
    startDB
}

startDB() {
    docker run --name postgres -e POSTGRES_PASSWORD=mysecretpassword -d postgres
}

startDB
