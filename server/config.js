module.exports = {
  dev: {
    overview: 'http://localhost:3003',
    reviews: 'http://localhost:3001',
    booking: 'http://localhost:3002',
    photogallery: 'http://localhost:3004'
  },
  production: {
    overview: 'http://ec2-34-220-195-161.us-west-2.compute.amazonaws.com/',
    reviews: 'http://localhost:3001',
    booking: 'http://localhost:3002',
    photogallery: 'http://localhost:3004'
  },
  allowedOrigins: [
    'http://localhost:3000',
    'http://localhost:5500',
    'https://fec-overview.s3-us-west-2.amazonaws.com',
    'http://ec2-34-220-195-161.us-west-2.compute.amazonaws.com/',
    'http://34.220.195.161:3000/',
    'http://34.220.195.161:80/',
    'http://34.220.195.161/'
  ]
}