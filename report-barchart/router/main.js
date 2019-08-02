const fs = require('fs');
const XLSX = require('read-excel-file/node');

module.exports = function(app){
  app.get('/', (req, res) => {
    let data = XLSX("./public/data/health1.xlsx").then((rows) => {
      console.log('rows', rows)
    })
    console.log(data);
    // res.render('index.html')
    // let worksheet = data.Sheets["체질량 지수"];
    // console.log(worksheet)
    // makeJsonFile(worksheet)

    // function makeJsonFile(data) {
    //   fs.writeFile("./public/data/health.json", data, function(err) {
    //     if(err) {
    //       return console.log(err)
    //     }
    //     console.log('The health file saved successfully')
    //   })
    // }
    res.render('index.html')
  })
}