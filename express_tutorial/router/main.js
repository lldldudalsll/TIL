const fs = require('fs');
const lineReader = require('line-reader');
const d3 = require('d3');
const content = fs.readFileSync('./public/data/gene.json');

module.exports = function(app) {
  app.get('/', function(req, res) {

    let geneCount = 0;
    const str1 = [];
    // make gene.json
    lineReader.eachLine('./public/data/gene.txt', function(line, last) {
      // console.log(line)
      // if(count === 0) { // column
      //   // str1.menu = filterGeneFirstLine(line)
      //   str1[count] = filterGeneItems(line)
      // }
      str1[geneCount] = filterGeneItems(line);
      geneCount ++; // increase number of line

      if(last) {
        console.log(' === gene parsing is done ! === ');
        str1.shift();
        makeGeneFile(JSON.stringify(str1)); // Save string format, Not object
      }
    });

    // function to save file
    function makeGeneFile(str) {
      fs.writeFile("./public/data/gene.json", str, function(err) {
        if(err) {
          return console.log(err)
        }

        console.log('The gene file is saved successfully')
      });
    }

    // 컬럼 부분 json 으로 컨버팅
    function filterGeneFirstLine(line) {
      const arr = line.split('\t');
      console.log('arr list', arr)
      return arr;
    }

    function filterGeneItems(line) {
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
      return gene
    }

    let fusionCount = 0;
    const str2 = [];
    // make fusion.json
    lineReader.eachLine('./public/data/fusion.txt', function(line, last) {
      // console.log(line)
      str2[fusionCount] = filterFusionItems(line);
      fusionCount ++; // increase number of line

      if(last) {
        console.log(' === fusion parsing is done ! === ');
        str2.shift();
        makeFusionFile(JSON.stringify(str2)); // Save string format, Not object
      }
    });

    // function to save file
    function makeFusionFile(str) {
      fs.writeFile("./public/data/fusion.json", str, function(err) {
        if(err) {
          return console.log(err)
        }

        console.log('The Fusion file is saved successfully')
      });
    }

    // 컬럼 부분 json 으로 컨버팅
    function filterFusionFirstLine(line) {
      const arr = line.split('\t');
      console.log('arr list', arr)
      return arr;
    }

    function filterFusionItems(line) {
      const arr = line.split('\t');
      const fusion = {};
      if(arr.length === 22) {
        fusion.fusionName = arr[0],
        fusion.junctionReadCount = arr[1],
        fusion.spanningFragCount = arr[2],
        fusion.leftBreakPoint = arr[3],
        fusion.rightBreakpoint = arr[4],
        fusion.left_tx_exon = arr[5],
        fusion.right_tx_exon = arr[6],
        fusion.prot_fusion_type = arr[7],
        fusion.spliceType = arr[8],
        fusion.largeAnchorSupport = arr[9],
        fusion.leftBreakDinuc = arr[10],
        fusion.RightBreakDinuc = arr[11],
        fusion.annots = arr[12],
        fusion.cds_left_id = arr[13],
        fusion.cds_left_range = arr[14],
        fusion.cds_right_id = arr[15],
        fusion.cds_right_range = arr[16],
        fusion.fusion_model = arr[17],
        fusion.fusion_cds = arr[18],
        fusion.fusion_transl = arr[19],
        fusion.pfam_left = arr[20],
        fusion.pfam_right = arr[21]
      }
      // console.log(fusion)
      return fusion
    }
    
    res.render('index.html')
  });


  app.get('/circos',function(req, res) {

    res.render('circos', {
      title: 'Circos'
    })

  });
  
}