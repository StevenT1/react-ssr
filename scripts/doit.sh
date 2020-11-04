#!/usr/bin/env bash 

webpack --config build/webpack.client.js
webpack --config build/webpack.server.js
cd dist && nodemon app.js