const fs = require('fs');
const XLSX = require('xlsx');

module.exports = function(app){
  app.get('/', (req, res) => {
    let data = XLSX.readFile("./public/data/health1.xlsx")
    // console.log(data);
    // res.render('index.html')
    let worksheet = data.Sheets["체질량 지수"];
    console.log(worksheet)
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