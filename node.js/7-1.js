let request = require('request');
let cheerio = require('cheerio');
let fs = require('fs');

// https://comic.naver.com/webtoon/detail.nhn?titleId=570503&no=270&weekday=thu
// titleId_no_??.jpg -> 570503_244_1.jpg

const downloadImage = (path, url, titleId, no, retryCount) => {
  request(
    {
      url: url, 
      headers: { 'referer': `https://comic.naver.com/webtoon/detail.nhn?titleId=${titleId}&no=${no}&weekday=wed`},
      encoding: null
    }, (err, res, body) => {
      if(err && --retryCount >= 0) {
        console.log(`재시도 ${titleId} ${no} ${retryCount}`)
        downloadImage(path, url, titleId, no, retryCount)
        return;
      }
    // console.log('error', err);
    // console.log('statusCode', res && res.statusCode);
    // console.log(body)
    fs.writeFile(path + '\\' + `${titleId}_${no}_${(url.split('_IMAG01_')[1])}`, body, null, (err) => {
      if (err) throw err;
      console.log('The file has been saved!');
    });
  })
}

const getImageUrls = (titleId, no, nidAut, nidSes) => {
  let j = request.jar();
  let cookie1 = request.cookie(`NID_AUT=${nidAut}`);
  let cookie2 = request.cookie(`NID_SES=${nidSes}`);
  let url = 'https://comic.naver.com';
  j.setCookie(cookie1, url);
  j.setCookie(cookie2, url);

  request({url: `https://comic.naver.com/webtoon/detail.nhn?titleId=${titleId}&no=${no}&weekday=wed`, jar: j}, (err, res, body) => {
    const $ = cheerio.load(body);
    for (let i = 1; i < $('.wt_viewer img').length; i++) {
      downloadImage('download', $('.wt_viewer img')[i].attribs.src, titleId, no, 5)
    }
  });
}

for (let i = 131, j = 0; i <= 131; i++, j++) {
  setTimeout(() => {
    getImageUrls(670143, i, '', '')
  }, j * 1000);
}