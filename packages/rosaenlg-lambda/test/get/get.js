const assert = require('assert');
const fs = require('fs');
const S3rver = require('s3rver');
const aws = require('aws-sdk');

process.env.IS_TESTING = '1';

const bucketName = 'test-bucket';
const hostname = 'localhost';
const s3port = 4569;
const s3endpoint = `http://${hostname}:${s3port}`;

// config of the lambda BEFORE including it
process.env.S3_BUCKET = bucketName;
process.env.S3_ENDPOINT = s3endpoint;
process.env.S3_ACCESSKEYID = 'S3RVER';
process.env.S3_SECRETACCESSKEY = 'S3RVER';
const get = require('../../dist/get');

describe('get', function() {
  describe('nominal', function() {
    let s3instance;
    const testFolder = 'test-fake-s3-get';

    const s3client = new aws.S3({
      accessKeyId: 'S3RVER',
      secretAccessKey: 'S3RVER',
      s3ForcePathStyle: true,
      endpoint: s3endpoint,
    });

    before(function(done) {
      fs.mkdir(testFolder, () => {
        s3instance = new S3rver({
          port: s3port,
          hostname: hostname,
          silent: false,
          directory: `./${testFolder}`,
          configureBuckets: [
            {
              name: bucketName,
            },
          ],
        }).run(() => {
          fs.readFile('./test/templates/chanson.json', 'utf8', (_err, data) => {
            s3client.upload(
              {
                Bucket: bucketName,
                Key: 'DEFAULT_USER/chanson.json',
                Body: data,
              },
              err => {
                if (err) {
                  console.log(err);
                }
                done();
              },
            );
          });
        });
      });
    });

    after(function(done) {
      s3client.deleteObject(
        {
          Bucket: bucketName,
          Key: 'DEFAULT_USER/chanson.json',
        },
        err => {
          if (err) {
            console.log(err);
          }
          s3instance.close(() => {
            fs.rmdir(`${testFolder}/${bucketName}`, () => {
              fs.rmdir(testFolder, done);
            });
          });
        },
      );
    });

    describe('get', function() {
      it(`should get`, function(done) {
        get.handler(
          {
            headers: {
              'X-RapidAPI-Proxy-Secret': 'IS_TESTING',
            },
            pathParameters: {
              templateId: 'chanson',
            },
          },
          {},
          (err, result) => {
            assert(!err);
            assert(result != null);
            // console.log(result);
            assert.equal(result.statusCode, '200');
            const parsed = JSON.parse(result.body);
            assert(parsed.templateSha1 != null);
            assert(parsed.templateContent != null);
            assert.equal(parsed.templateContent.templateId, 'chanson');
            done();
          },
        );
      });
      it(`should NOT get`, function(done) {
        get.handler(
          {
            headers: {
              'X-RapidAPI-Proxy-Secret': 'IS_TESTING',
            },
            pathParameters: {
              templateId: 'chanson_toto',
            },
          },
          {},
          (err, result) => {
            assert(!err);
            assert(result != null);
            // console.log(result);
            assert.equal(result.statusCode, '404');
            done();
          },
        );
      });
    });
  });
});