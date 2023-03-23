#!/bin/bash 

set -ex

# Nothing has changed, so we should be able to build just
# the layer with the cache quickly so we can extract it
# for github actions to cache.
docker build --target builder -t beley-blog-builder-out:latest .
docker container create --name beley-blog-build-container beley-blog-builder-out:latest

rm -rf public .cache

docker cp beley-blog-build-container:/build/public .
docker cp beley-blog-build-container:/build/.cache .

docker rm beley-blog-build-container
docker rmi beley-blog-builder-out:latest
