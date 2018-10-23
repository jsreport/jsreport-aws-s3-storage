const awsSDK = require('aws-sdk')

module.exports = function (reporter, definition) {
  if (reporter.options.blobStorage.provider !== 'aws-s3-storage') {
    definition.options.enabled = false
    return
  }

  const options = Object.assign({}, definition.options)
  // avoid exposing connection string through /api/extensions
  definition.options = {}

  const s3 = new awsSDK.S3({
    accessKeyId: options.accessKeyId,
    secretAccessKey: options.secretAccessKey
  })
  reporter.blobStorage.registerProvider({
    init: () => {},
    read: (blobName) => {
      const params = {
        Bucket: options.bucket,
        Key: blobName
      }

      return new Promise((resolve, reject) => {
        resolve(s3.getObject(params)
          .createReadStream()
          .on('error', (err) => reject(err)))
      })
    },
    write: (defaultBlobName, buffer, request, response) => {
      const params = {
        Bucket: options.bucket,
        Key: defaultBlobName,
        Body: buffer
      }

      return new Promise((resolve, reject) => {
        s3.upload(params, (err, data) => {
          if (err) {
            return reject(err)
          }

          resolve(defaultBlobName)
        })
      })
    },
    remove: (blobName) => {
      const params = {
        Bucket: options.bucket,
        Key: blobName
      }

      return new Promise((resolve, reject) => {
        s3.deleteObject(params, (err) => {
          if (err) {
            return reject(err)
          }

          resolve()
        })
      })
    }
  })
}
