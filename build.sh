#!/bin/bash

# Build docker
docker rm next-pattern -f
docker build . --no-cache -t next-pattern
docker run -d -p 3011:80 --name next-pattern