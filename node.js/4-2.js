let request = require('request');

request('https://comic.naver.com/webtoon/detail.nhn?titleId=570503&no=270&weekday=thu', (err, res, body) => {
  console.log('error : ', err);
  console.log('response : ', res);
  console.log('body : ', body)
})