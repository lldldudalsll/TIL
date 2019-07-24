let request = require('request');

request('http://google.com', (err, res, body) => {
  console.log('error : ', err);
  console.log('response : ', res);
  console.log('body : ', body)
})