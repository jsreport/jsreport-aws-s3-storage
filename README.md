
# jsreport-aws-s3-storage
[![NPM Version](http://img.shields.io/npm/v/jsreport-aws-s3-storage.svg?style=flat-square)](https://npmjs.com/package/jsreport-aws-s3-storage)
[![Build Status](https://travis-ci.org/jsreport/jsreport-aws-s3-storage.png?branch=master)](https://travis-ci.org/jsreport/jsreport-aws-s3-storage)

> jsreport extension adding support for storing blobs in aws s3

Some of the jsreport extensions requires a blob storage for storing binary objects. This implementation stores these objects like output reports inside cost effective aws s3.

## Installation

> npm install jsreport-aws-s3-storage

## Configuration

Required options are:
- `accessKeyId`
- `secretAccessKey`
- `bucket`

Optionally you can set
- `s3Options`: azure blob storage container, this defaults to jsreport

```js
{
	"blobStorage": {  
		"provider": "aws-s3-storage"
	},
	"extensions": {
		"aws-s3-storage": {
			"accessKeyId": "...",
			"secretAccessKey": "...",
			"bucket": "...",
			"s3Options": {...}
		}
	}
}
```
## jsreport-core
```js
var jsreport = require('jsreport-core')({ blobStorage: { provider: 'aws-s3-storage' } })
jsreport.use(require('jsreport-aws-s3-storage')({...}))
```
