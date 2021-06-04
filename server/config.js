module.exports = {
  dev: {
    overview: 'http://localhost:3003',
    reviews: 'http://localhost:3001',
    booking: 'http://localhost:3002',
    photogallery: 'http://localhost:3004'
  },
  production: {
    overview: 'http://ec2-54-191-115-120.us-west-2.compute.amazonaws.com/',
    reviews: 'http://localhost:3001',
    booking: 'http://localhost:3002',
    photogallery: 'http://localhost:3004'
  },
  allowedOrigins: [
    'http://localhost:3000',
    'http://localhost:5500',
    'https://fec-overview.s3-us-west-2.amazonaws.com',
    'http://ec2-54-191-115-120.us-west-2.compute.amazonaws.com/',
    'http://54.191.115.120:3000/',
    'http://54.191.115.120:80/',
    'http://54.191.115.120/'
  ],
  mongoUri: {
    dev: 'mongodb://localhost:27017/FEC',
    production: 'mongodb://mango_fec:27017/FEC'
  }
}