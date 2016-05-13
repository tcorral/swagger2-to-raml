# swagger2-to-raml
This tool has been created to convert Swagger 2 YAML specs to RAML 0.8.

## Installation

### Node 

Dependencies:

* node >= 0.10
* npm >= 2.0.0

```bash
npm install swagger2toraml --save
```

## Usage

S22RAML usage is very simple, it just needs a path or a set of paths of Swagger 2 YAML files and one folder path to save 
the RAML files.

### Single file

```js
var converter = require('swagger2-to-raml');
S22RAML('./path/to/swagger2/yaml/file.yaml', './raml');
``` 

### Array of files

```js
var converter = require('swagger2-to-raml');
S22RAML([ 
		'./path/to/swagger2/yaml/files/first.yaml', 
		'./path/to/swagger2/yaml/files/second.yaml'
	], './raml');
``` 

To get more information I recommend to read the use cases in tests.

## Tests

To run the tests with NodeUnit:

```bash
npm install
npm test
```

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Check that it still works: `npm test`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## History

0.1.0 - First release.

## License

The MIT License (MIT)

Copyright (c) 2015 Tomás Corral

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.