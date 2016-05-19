var fs = require('fs-extra');
var q = require('q');
var path = require('path');
var request = require('request');
var getRAMLWithExamples = require('./libs/add-examples');

var converter = function (swaggerFiles, outputFolder) {
    var deferred = q.defer();
    var promises = [];
    if (arguments.length < 2 || swaggerFiles == null || outputFolder == null) {
        deferred.reject(new Error('Converter requires two parameters. At least one file path or array of paths to convert and one output folder path.'));
    } else {
        if (typeof swaggerFiles === 'string') {
            swaggerFiles = [swaggerFiles];
        }

        swaggerFiles.forEach(function (filepath) {
            var deferred = q.defer();
            var filename = path.basename(filepath, '.yaml');
            fs.readFile(filepath, 'utf8', function (err, data) {
                if (err) {
                    deferred.reject(new Error('Something went wrong on reading ' + filepath + ' file.'));
                } else {
                    request
                        .post({
                            url: 'https://apitransformer.com/api/transform?output=raml08',
                            body: data
                        }, function (err, ramlJSON, ramlYAML) {
                            var newFilePath = outputFolder + '/' + filename + '.raml';
                            if (err) {
                                deferred.reject(new Error('Something went wrong on creating ' + filename + '.raml file.'));
                            } else {
                                fs.outputFile(newFilePath, ramlYAML, function (err) {
                                    if (err) {
                                        deferred.reject(new Error('Something went wrong on creating ' + filename + '.raml file.'));
                                    } else {
                                        getRAMLWithExamples(filepath, newFilePath)
                                            .then(function (ramlYAMLWithExamples) {
                                                console.log(ramlYAMLWithExamples);
                                                fs.outputFile(newFilePath, ramlYAMLWithExamples, function (err) {
                                                    if(err) {
                                                        deferred.reject(err);
                                                    } else {
                                                        deferred.resolve(newFilePath);
                                                    }
                                                });
                                            });
                                    }
                                });
                            }

                        });
                }
            });
            promises.push(deferred.promise);
        });

        q.all(promises)
            .then(
                function () {
                    deferred.resolve(arguments);
                },
                function (error) {
                    deferred.reject(error);
                }
            );
    }
    

    return deferred.promise;
};

module.exports = converter;




