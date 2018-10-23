module.exports = {
  name: 'fs-store-aws-s3-persistence',
  main: 'lib/main.js',
  dependencies: ['templates', 'fs-store'],
  optionsSchema: {
    extensions: {
      'fs-store': {
        type: 'object',
        properties: {
          persistence: {
            type: 'object',
            properties: {
              provider: { type: 'string', enum: ['aws-s3'] }
            }
          }
        }
      },
      'fs-store-aws-s3-persistence': {
        type: 'object',
        required: ['accessKeyId', 'secretAccessKey', 'bucket'],
        properties: {
          accessKeyId: { type: 'string' },
          secretAccessKey: { type: 'string' },
          bucket: { type: 'string' },
          s3Options: { type: 'object' }
        }
      }
    }
  }
}
