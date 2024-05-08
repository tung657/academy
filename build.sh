#!/bin/bash

# Build docker
docker system prune -a
docker rm aiacademy_web -f
docker rmi minhdra/aiacademy_web -f
docker build . --no-cache -t minhdra/aiacademy_web
# For linux
# docker run -d -p 8090:80 -v /uploads/:/folder/in/container -v uploads:/app/uploads --name aiacademy_web minhdra/aiacademy_web
# For macos
# docker run -d -p 8090:80 -v uploads:/folder/in/container -v uploads:/app/uploads --name aiacademy_web minhdra/aiacademy_web
docker push minhdra/aiacademy_web:latest