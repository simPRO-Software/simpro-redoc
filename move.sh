#!/bin/bash

npm run bundle:standalone
rm ~/repos/developer.simprogroup.com/apidoc/assets/js/redoc.standalone.js
mv bundles/redoc.standalone.js ~/repos/developer.simprogroup.com/apidoc/assets/js/
