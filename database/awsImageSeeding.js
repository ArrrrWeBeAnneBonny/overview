const AWS = require('aws-sdk');
const faker = require('faker');
const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');

const { AWSAccessKeyId, AWSSecretKey } = require('./aws.config.js');
AWS.config.update({
  accessKeyId: AWSAccessKeyId,
  secretAccessKey: AWSSecretKey,
  region: 'us-west-2'
});

const Bucket = 'fec-overview';
const s3Bucket = new AWS.S3({
  params: { Bucket }
});
const s3Url = 'https://fec-overview.s3-us-west-2.amazonaws.com/'

const imageToS3 = (image, i) => {
  const pathName = 'ownerPics/' + i.toString() + '.jpg';
  const data = {
    Key: pathName,
    Body: image,
    ContentType: 'image/jpeg',
    ACL: 'public-read'
  };
  return new Promise((resolve, reject) => {
    s3Bucket.putObject(data, err => {
      err ? reject(err) : resolve(s3Url + pathName)
    })
  })
};

const seedPhotos = async () => {
  for (let i = 1; i < 100; i++) {
    const image = faker.image.avatar();
    await download(image, i)
      .then(result => {
        // console.log('Success! photo at: ', result);
        const imageFile = fs.readFileSync(result);
        return imageToS3(imageFile, i);
      })
      .then(result => {
        console.log('Success! photo at: ', result);
      })
      .catch(error => {
        console.log('Error in Seeding!');
        console.log(error);
      })
  }
};

const dlPath = path.join(__dirname + '/photos');

const download = async (imageUrl, i) => {
  const response = await fetch(imageUrl);
  const buffer = await response.buffer();
  const dlPathName = dlPath + '/' + i.toString() + '.jpg';
  return new Promise((resolve, reject) => {
    fs.writeFile(dlPathName, buffer, err => {
      err ? reject(err) : resolve(dlPathName);
    });
  });
}

seedPhotos();