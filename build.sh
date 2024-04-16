#!/bin/bash

# Build docker
docker system prune -a
docker rm minhdra/aiacademy_web -f
docker rmi minhdra/aiacademy_web -f
docker build . --no-cache -t minhdra/aiacademy_web --platform linux/amd64
# docker run -d -p 8090:80 --name minhdra/aiacademy_web minhdra/aiacademy_web
docker push minhdra/aiacademy_web:latest