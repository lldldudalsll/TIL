const fs = require('fs');
const lineReader = require('line-reader');

module.exports = function(app) {
  app.get('/', function(req, res) {

    let count = 0;
    const str = [];
    lineReader.eachLine('./data/gene.txt', function(line, last) {
      console.log(line)
      if(count === 0) { // column
        // str.menu = filterFirstLine(line)
      } else { // except column
        str['item' + count] = filterItems(line)
      }

      count ++; // increase number of line

      if(last) {
        console.log(' === parsing is done ! === ');
        console.log(str)
        makeFile(JSON.stringify(str)); // Save string format, Not object
      }
    });

    // function to save file
    function makeFile() {
      fs.writeFile("./data/gene.json", str, function(err) {
        if(err) {
          return console.log(err)
        }

        console.log('The file is saved successfully')
      });
    }

    // 컬럼 부분 json 으로 컨버팅
    function filterFirstLine(line) {
      const arr = line.split('\t');
      console.log('arr list', arr)
      return arr;
    }

    function filterItems(line) {
      const arr = line.split('\t');
      const gene = {};
      if(arr.length === 6) {
        gene.geneName = arr[0],
        gene.reference = arr[1],
        gene.strand = arr[2],
        gene.start = arr[3],
        gene.end = arr[4],
        gene.target = arr[5]
      }
      console.log(gene)
      return gene
    }
    
    res.send(gene)
  });


  app.get('/about',function(req, res) {
    res.render('about.html');
  });
  
}