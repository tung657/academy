#!/bin/bash

# Build docker
docker system prune -a
docker rm aia -f
docker rmi aia -f
docker build . --no-cache -t aia
docker run -d -p 8090:80 --name aia aia