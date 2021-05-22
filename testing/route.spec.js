const axios = require('axios');

jest.mock('axios');
describe('routes', () => {
  test('should pull up specific infor for campId routes', async () => {
    const site0 = {
      name: 'Twisselman\’s Glamping by the Pond',
      location: {
        name: 'Twisselman Ranch',
        address: '7645 Cattle Dr, Santa Margarita, CA 93453',
        numberOfSites: 5
      },
      owner: {
        name: 'Anne B.',
        imageUrl: 'html link here'
      }
    };
    const response0 = { data: site0 };
    axios.get.mockResolvedValue(response0);
    axios.get('/overview?campId=0')
      .then(resp => expect(resp.data).toEqual(site0));

    const site1 = { "name": "Sleek Dwarf Hotot Blues", "location": { "name": "Glen of Imaal Terrier Pine", "address": "120 Laurel Street Patchogue, NY 11772", "numberOfSites": 5 }, "owner": { "name": "Clarabelle M.", "imageUrl": "https://cdn.fakercloud.com/avatars/naitanamoreno_128.jpg" } };

    const response1 = { data: site1 };
    axios.get.mockResolvedValue(response1);
    axios.get('/overview?campId=0')
      .then(resp => expect(resp.data).toEqual(site1));

  });
});

