#!/bin/bash

npm run build
scp -r  dist/* root@datawr.ml:/var/www/html/