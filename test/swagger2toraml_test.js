'use strict';

var grunt = require('grunt');
var path = require('path');
var cwd = process.cwd();
var fs = require('fs');
var converter = require('../');

exports.swagger2toraml = {
    noArguments: function (test) {
        test.expect(2);
        converter()
            .then(
                function () {

                },
                function (error) {
                    test.ok(error instanceof Error, 'Check that returns an error');
                    test.ok(error.message === 'Converter requires two parameters. At least one file path or array of paths to convert and one output folder path.', 'Check that the message is what says that at least two parameters are required.');
                    test.done();
                });
    },
    onlyFileArgumentString: function (test) {
        var yaml1FilePath = path.join(cwd, 'test', 'data', 'service-api.yaml');
        test.expect(2);
        converter(yaml1FilePath)
            .then(
                function () {

                },
                function (error) {
                    test.ok(error instanceof Error, 'Check that returns an error');
                    test.ok(error.message === 'Converter requires two parameters. At least one file path or array of paths to convert and one output folder path.', 'Check that the message is what says that at least two parameters are required.');
                    test.done();
                }
            );

    },
    onlyFileArgumentArray: function (test) {
        var yaml1FilePath = path.join(cwd, 'test', 'data', 'service-api.yaml');
        test.expect(2);
        converter([yaml1FilePath])
            .then(
                function () {

                },
                function (error) {
                    test.ok(error instanceof Error, 'Check that returns an error');
                    test.ok(error.message === 'Converter requires two parameters. At least one file path or array of paths to convert and one output folder path.', 'Check that the message is what says that at least two parameters are required.');
                    test.done();
                }
            );

    },
    onlyFileArgumentNULL: function (test) {
        test.expect(2);
        converter(null)
            .then(
                function () {

                },
                function (error) {
                    test.ok(error instanceof Error, 'Check that returns an error');
                    test.ok(error.message === 'Converter requires two parameters. At least one file path or array of paths to convert and one output folder path.', 'Check that the message is what says that at least two parameters are required.');
                    test.done();
                }
            );

    },
    fileArgumentNULLWithValidOutput: function (test) {
        var validOutputPath = path.join(cwd, 'test', 'generated');
        test.expect(2);
        converter(null, validOutputPath)
            .then(
                function () {

                },
                function (error) {
                    test.ok(error instanceof Error, 'Check that returns an error');
                    test.ok(error.message === 'Converter requires two parameters. At least one file path or array of paths to convert and one output folder path.', 'Check that the message is what says that at least two parameters are required.');
                    test.done();
                }
            );

    },
    fileArgumentUNDEFINEDWithValidOutput: function (test) {
        var validOutputPath = path.join(cwd, 'test', 'generated');
        test.expect(2);
        converter(undefined, validOutputPath)
            .then(
                function () {

                },
                function (error) {
                    test.ok(error instanceof Error, 'Check that returns an error');
                    test.ok(error.message === 'Converter requires two parameters. At least one file path or array of paths to convert and one output folder path.', 'Check that the message is what says that at least two parameters are required.');
                    test.done();
                }
            );

    },
    fileArgumentStringWithValidOutput: function (test) {
        var yaml1FilePath = path.join(cwd, 'test', 'data', 'service-api.yaml');
        var validOutputPath = path.join(cwd, 'test', 'generated');
        var generatedFilePath = path.join(validOutputPath, 'service-api.raml');
        test.expect(3);
        converter(yaml1FilePath, validOutputPath)
            .then(
                function (all) {
                    var paths;
                    test.ok(all.length === 1, 'Check that one element has been processed');
                    paths = all[0];
                    paths.forEach(function (filepath){
                        test.ok(filepath.indexOf('service-api.raml') !== -1, 'Check that the new path contains a raml file');
                        fs.readFile(filepath, 'utf8', function (err, data) {
                            fs.readFile(generatedFilePath, 'utf8', function (err, data2) {
                                test.ok(data === data2, 'Check that both files the generated and the expected are the same.');
                                test.done();
                            });
                        });
                    });
                }
            );

    },
    fileArgumentArrayOnePathWithValidOutput: function (test) {
        var yaml1FilePath = path.join(cwd, 'test', 'data', 'service-api.yaml');
        var filePaths = [yaml1FilePath];
        var validOutputPath = path.join(cwd, 'test', 'generated');
        var generatedFilePath = path.join(validOutputPath, 'service-api.raml');
        test.expect(4);
        converter(filePaths, validOutputPath)
            .then(
                function (all) {
                    var paths;
                    test.ok(all.length === 1, 'Check that one element has been processed');
                    paths = all[0];
                    test.ok(paths.length === 1, 'Check that only one path is returned');
                    paths.forEach(function (filepath){
                        test.ok(filepath.indexOf('service-api.raml') !== -1, 'Check that the new path contains a raml file');
                        fs.readFile(filepath, 'utf8', function (err, data) {
                            fs.readFile(generatedFilePath, 'utf8', function (err, data2) {
                                test.ok(data === data2, 'Check that both files the generated and the expected are the same.');
                                test.done();
                            });
                        });
                    });
                }
            );

    },
    fileArgumentArrayTwoPathsWithValidOutput: function (test) {
        var yaml1FilePath = path.join(cwd, 'test', 'data', 'service-api.yaml');
        var yaml2FilePath = path.join(cwd, 'test', 'data', 'other-api.yaml');
        var filePaths = [yaml1FilePath, yaml2FilePath];
        var validOutputPath = path.join(cwd, 'test', 'generated');
        var expectedFilePath1 = path.join(cwd, 'test', 'expected', 'service-api.raml');
        var expectedFilePath2 = path.join(cwd, 'test', 'expected', 'other-api.raml');
        var expectedPaths = [expectedFilePath1, expectedFilePath2];
        test.expect(4);
        converter(filePaths, validOutputPath)
            .then(
                function (all) {
                    var paths;
                    test.ok(all.length === 1, 'Check that one element has been processed');
                    paths = all[0];
                    test.ok(paths.length === 2, 'Check that only one path is returned');
                    paths.forEach(function (filepath, index){
                        var expectedPath = expectedPaths[index];
                        var data = fs.readFileSync(filepath, 'utf8');
                        var data2 = fs.readFileSync(expectedPath, 'utf8');
                        test.ok(data === data2, 'Check that both files the generated and the expected are the same.');
                    });
                    test.done();
                }
            );

    }
};