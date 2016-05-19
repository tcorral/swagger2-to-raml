var yaml = require('js-yaml');
var fs = require('fs-extra');
var q = require('q');

function getRAMLWithExamples(swaggerFilePath, ramlFilePath) {
    var deferred = q.defer();
    var docSwagger = yaml.safeLoad(fs.readFileSync(swaggerFilePath, 'utf8'));
    var docRAML = yaml.safeLoad(fs.readFileSync(ramlFilePath, 'utf8'));
    var paths = docSwagger.paths;

    var pathKey;
    var pathBits;
    var path;
    var typeResponse;
    var definition;
    var ramlObj;
    var responses;
    var responseKey;
    var response;

    for (pathKey in paths) {
        if (paths.hasOwnProperty(pathKey)) {
            path = paths[pathKey];
            if (pathKey.indexOf('/', 1) !== -1) {
                pathBits = pathKey.split('/');
                pathBits.shift();
                pathBits.forEach(function (_path) {
                    ramlObj = (ramlObj || docRAML)[_path];
                });
            } else {
                ramlObj = docRAML[pathKey];
            }
            if(!ramlObj) {
                continue;
            }

            for (typeResponse in path) {
                if (path.hasOwnProperty(typeResponse)) {
                    definition = path[typeResponse];
                    responses = definition.responses;
                    if(!ramlObj[typeResponse]) {
                        continue;
                    }
                    for (responseKey in responses) {
                        if (responses.hasOwnProperty(responseKey)) {
                            response = responses[responseKey];
                            if (response.examples) {
                                if(ramlObj[typeResponse].responses[responseKey].body) {
                                    ramlObj[typeResponse].responses[responseKey].body['application/json'].example = JSON.stringify(response.examples['application/json'], null, 4);
                                } else if(!ramlObj[typeResponse].responses[responseKey].body) {
                                    ramlObj[typeResponse].responses[responseKey].body = {
                                        'application/json': {
                                            example: JSON.stringify(response.examples['application/json'], null, 4)
                                        }
                                    };
                                }
                            }
                        }
                    }
                }
            }
            pathBits = null;
        }
    }

    docRAML.version = docSwagger.basePath.replace('/', '');
    deferred.resolve('#%RAML 0.8\n' + yaml.safeDump(docRAML));
    return deferred.promise;
    
}

module.exports = getRAMLWithExamples;