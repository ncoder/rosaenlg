const assert = require('assert');
const rosaenlgServerToolkit = require('rosaenlg-server-toolkit');
const rosaenlgWithComp = require('../../lib/rosaenlg_tiny_fr_FR_lambda_comp');
const crypto = require('crypto');
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
const render = require('../../dist/render/renderFrench');

describe('render', function () {
  describe('nominal', function () {
    let s3instance;
    let templateSha1;
    const testFolder = 'test-fake-s3-render';

    const s3client = new aws.S3({
      accessKeyId: 'S3RVER',
      secretAccessKey: 'S3RVER',
      s3ForcePathStyle: true,
      endpoint: s3endpoint,
    });

    before(function (done) {
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
            const parsedTemplate = JSON.parse(data);
            const comp = rosaenlgServerToolkit.compToPackagedTemplateComp(
              parsedTemplate.src,
              rosaenlgWithComp.compileFileClient,
              rosaenlgWithComp.getRosaeNlgVersion,
              'tests-lambda',
            );
            parsedTemplate.comp = comp;

            templateSha1 = crypto.createHash('sha1').update(JSON.stringify(parsedTemplate.src)).digest('hex');

            s3client.upload(
              {
                Bucket: bucketName,
                Key: 'DEFAULT_USER/chanson.json',
                Body: JSON.stringify(parsedTemplate),
              },
              (err) => {
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

    after(function (done) {
      s3client.deleteObject(
        {
          Bucket: bucketName,
          Key: 'DEFAULT_USER/chanson.json',
        },
        (err) => {
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

    describe('render', function () {
      it(`should render`, function (done) {
        render.handler(
          {
            headers: {
              'X-RapidAPI-Proxy-Secret': 'IS_TESTING',
            },
            pathParameters: {
              templateId: 'chanson',
              templateSha1: templateSha1,
            },
            body: JSON.stringify({
              language: 'fr_FR',
              chanson: { auteur: 'Édith Piaf', nom: 'Non, je ne regrette rien du tout' },
            }),
          },
          {},
          (err, result) => {
            assert(!err);
            assert(result != null);
            //console.log(result);
            assert.equal(result.statusCode, '200');
            assert(
              JSON.parse(result.body).renderedText.indexOf(
                `<p>Il chantera "Non, je ne regrette rien du tout" d\'Édith Piaf</p>`,
              ) > -1,
            );
            done();
          },
        );
      });
    });
  });
});