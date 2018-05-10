#!/bin/bash

npm run build
rm dist/assets/*/*.*.*.map
scp -r  dist/* root@datawr.ml:/var/www/html/