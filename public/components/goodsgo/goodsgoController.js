/**
 * Created by simvolice on 05.06.2017 19:22
 */



angular.module('app').controller('GoodsgoCtrl', function ($scope, $cookies, $mdDialog, $http, $mdToast) {





  this.selected = [];




  this.openDlg = function (ev) {
    $mdDialog.show({
      controller: DialogController,
      templateUrl: 'components/goodsgo/dialog.tmpl.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true,
      fullscreen: true // Only for -xs, -sm breakpoints.
    });
  };

  this.delete = function (id, val) {
    console.log(id, val);
  };


  this.addBtn = function () {
    this.data.push({"_id":289,"title": null,"createAt": new Date()});
  };


  this.data = [


      {"_id":1,"title":"Flossie","createAt":"9/9/2016"},
    {"_id":2,"title":"Angel","createAt":"12/1/2016"},
    {"_id":3,"title":"Raddie","createAt":"12/22/2016"},
    {"_id":4,"title":"Starr","createAt":"8/24/2016"},
    {"_id":5,"title":"Rosa","createAt":"9/28/2016"},
    {"_id":6,"title":"Harwilll","createAt":"7/6/2016"},
    {"_id":7,"title":"Waly","createAt":"11/5/2016"},
    {"_id":8,"title":"Bevvy","createAt":"7/5/2016"},
    {"_id":9,"title":"Chantalle","createAt":"4/3/2017"},
    {"_id":10,"title":"Cherin","createAt":"7/19/2016"},
    {"_id":11,"title":"Lynda","createAt":"5/24/2017"},
    {"_id":12,"title":"Elspeth","createAt":"9/16/2016"},
    {"_id":13,"title":"Hilda","createAt":"5/24/2017"},
    {"_id":14,"title":"Christabella","createAt":"11/28/2016"},
    {"_id":15,"title":"Peirce","createAt":"6/9/2016"},
    {"_id":16,"title":"Jarrod","createAt":"9/12/2016"},
    {"_id":17,"title":"Riki","createAt":"1/2/2017"},
    {"_id":18,"title":"Cherilyn","createAt":"3/3/2017"},
    {"_id":19,"title":"Carmencita","createAt":"1/16/2017"},
    {"_id":20,"title":"Romeo","createAt":"12/7/2016"},
    {"_id":21,"title":"Fraze","createAt":"12/9/2016"},
    {"_id":22,"title":"Anneliese","createAt":"8/17/2016"},
    {"_id":23,"title":"Brigg","createAt":"6/6/2017"},
    {"_id":24,"title":"Sanson","createAt":"9/19/2016"},
    {"_id":25,"title":"Elka","createAt":"1/14/2017"},
    {"_id":26,"title":"Sarine","createAt":"9/3/2016"},
    {"_id":27,"title":"Hilliard","createAt":"8/31/2016"},
    {"_id":28,"title":"Derward","createAt":"1/4/2017"},
    {"_id":29,"title":"Millard","createAt":"1/20/2017"},
    {"_id":30,"title":"Guglielma","createAt":"4/8/2017"},
    {"_id":31,"title":"Errick","createAt":"8/26/2016"},
    {"_id":32,"title":"Harli","createAt":"7/15/2016"},
    {"_id":33,"title":"Herby","createAt":"7/22/2016"},
    {"_id":34,"title":"Peter","createAt":"10/17/2016"},
    {"_id":35,"title":"Delaney","createAt":"5/16/2017"},
    {"_id":36,"title":"Chandler","createAt":"8/25/2016"},
    {"_id":37,"title":"Sherry","createAt":"4/3/2017"},
    {"_id":38,"title":"Toby","createAt":"7/28/2016"},
    {"_id":39,"title":"Say","createAt":"10/17/2016"},
    {"_id":40,"title":"Darell","createAt":"2/12/2017"},
    {"_id":41,"title":"Maximilianus","createAt":"3/31/2017"},
    {"_id":42,"title":"Aile","createAt":"5/13/2017"},
    {"_id":43,"title":"Dyann","createAt":"6/27/2016"},
    {"_id":44,"title":"Arman","createAt":"1/29/2017"},
    {"_id":45,"title":"Georgy","createAt":"11/6/2016"},
    {"_id":46,"title":"Allys","createAt":"3/20/2017"},
    {"_id":47,"title":"Sloan","createAt":"12/25/2016"},
    {"_id":48,"title":"Harwilll","createAt":"12/5/2016"},
    {"_id":49,"title":"Rosette","createAt":"12/20/2016"},
    {"_id":50,"title":"Raffaello","createAt":"12/25/2016"},
    {"_id":51,"title":"Danyette","createAt":"7/21/2016"},
    {"_id":52,"title":"Orsola","createAt":"10/15/2016"},
    {"_id":53,"title":"Rosita","createAt":"10/27/2016"},
    {"_id":54,"title":"Bar","createAt":"11/3/2016"},
    {"_id":55,"title":"Ranice","createAt":"1/25/2017"},
    {"_id":56,"title":"Rainer","createAt":"6/5/2017"},
    {"_id":57,"title":"Ingrid","createAt":"2/23/2017"},
    {"_id":58,"title":"Brianna","createAt":"5/31/2017"},
    {"_id":59,"title":"Craig","createAt":"10/20/2016"},
    {"_id":60,"title":"Ursulina","createAt":"6/30/2016"},
    {"_id":61,"title":"Ronny","createAt":"11/18/2016"},
    {"_id":62,"title":"Ann","createAt":"12/27/2016"},
    {"_id":63,"title":"Margi","createAt":"4/2/2017"},
    {"_id":64,"title":"Angy","createAt":"2/11/2017"},
    {"_id":65,"title":"Cassandra","createAt":"2/28/2017"},
    {"_id":66,"title":"Reggie","createAt":"7/18/2016"},
    {"_id":67,"title":"Romona","createAt":"3/29/2017"},
    {"_id":68,"title":"Alejandro","createAt":"7/24/2016"},
    {"_id":69,"title":"Sofie","createAt":"11/1/2016"},
    {"_id":70,"title":"Cele","createAt":"7/4/2016"},
    {"_id":71,"title":"Gilbertine","createAt":"7/2/2016"},
    {"_id":72,"title":"Anthia","createAt":"4/13/2017"},
    {"_id":73,"title":"Annie","createAt":"10/22/2016"},
    {"_id":74,"title":"Edwin","createAt":"8/2/2016"},
    {"_id":75,"title":"Elfrieda","createAt":"7/9/2016"},
    {"_id":76,"title":"Hayward","createAt":"6/10/2016"},
    {"_id":77,"title":"Abdul","createAt":"5/31/2017"},
    {"_id":78,"title":"Robinetta","createAt":"7/20/2016"},
    {"_id":79,"title":"Mirelle","createAt":"5/24/2017"},
    {"_id":80,"title":"Olenka","createAt":"6/13/2016"},
    {"_id":81,"title":"Kissee","createAt":"1/5/2017"},
    {"_id":82,"title":"Lambert","createAt":"9/1/2016"},
    {"_id":83,"title":"Britney","createAt":"7/31/2016"},
    {"_id":84,"title":"Karl","createAt":"12/7/2016"},
    {"_id":85,"title":"Hadrian","createAt":"12/30/2016"},
    {"_id":86,"title":"Desdemona","createAt":"9/19/2016"},
    {"_id":87,"title":"Leanna","createAt":"1/17/2017"},
    {"_id":88,"title":"Shanta","createAt":"3/6/2017"},
    {"_id":89,"title":"Vidovic","createAt":"7/14/2016"},
    {"_id":90,"title":"Alexine","createAt":"10/2/2016"},
    {"_id":91,"title":"Mylo","createAt":"11/23/2016"},
    {"_id":92,"title":"Tiler","createAt":"1/24/2017"},
    {"_id":93,"title":"Cleavland","createAt":"10/24/2016"},
    {"_id":94,"title":"Miranda","createAt":"6/10/2016"},
    {"_id":95,"title":"Louise","createAt":"5/14/2017"},
    {"_id":96,"title":"Kakalina","createAt":"6/29/2016"},
    {"_id":97,"title":"Page","createAt":"9/30/2016"},
    {"_id":98,"title":"Saloma","createAt":"5/9/2017"},
    {"_id":99,"title":"Melisande","createAt":"6/15/2016"},
    {"_id":100,"title":"Christoffer","createAt":"4/25/2017"},
    {"_id":101,"title":"Dyann","createAt":"11/5/2016"},
    {"_id":102,"title":"Antons","createAt":"9/21/2016"},
    {"_id":103,"title":"Silvia","createAt":"7/31/2016"},
    {"_id":104,"title":"Hatty","createAt":"12/27/2016"},
    {"_id":105,"title":"Lina","createAt":"9/10/2016"},
    {"_id":106,"title":"Ceil","createAt":"6/23/2016"},
    {"_id":107,"title":"Lisbeth","createAt":"5/16/2017"},
    {"_id":108,"title":"Ania","createAt":"2/12/2017"},
    {"_id":109,"title":"Sebastien","createAt":"10/5/2016"},
    {"_id":110,"title":"Tabbie","createAt":"1/25/2017"},
    {"_id":111,"title":"Robinett","createAt":"9/5/2016"},
    {"_id":112,"title":"Morry","createAt":"1/11/2017"},
    {"_id":113,"title":"Erin","createAt":"3/8/2017"},
    {"_id":114,"title":"Ezra","createAt":"3/22/2017"},
    {"_id":115,"title":"Marianna","createAt":"1/11/2017"},
    {"_id":116,"title":"Nickola","createAt":"7/3/2016"},
    {"_id":117,"title":"Sven","createAt":"10/14/2016"},
    {"_id":118,"title":"Guthrie","createAt":"5/22/2017"},
    {"_id":119,"title":"Syd","createAt":"11/12/2016"},
    {"_id":120,"title":"Victor","createAt":"6/4/2017"},
    {"_id":121,"title":"Kellina","createAt":"8/8/2016"},
    {"_id":122,"title":"Gayle","createAt":"5/4/2017"},
    {"_id":123,"title":"Ludvig","createAt":"7/22/2016"},
    {"_id":124,"title":"Joel","createAt":"7/17/2016"},
    {"_id":125,"title":"Raff","createAt":"9/2/2016"},
    {"_id":126,"title":"Jaymee","createAt":"4/12/2017"},
    {"_id":127,"title":"Anton","createAt":"5/6/2017"},
    {"_id":128,"title":"Kerri","createAt":"10/14/2016"},
    {"_id":129,"title":"Curcio","createAt":"4/3/2017"},
    {"_id":130,"title":"Daron","createAt":"8/25/2016"},
    {"_id":131,"title":"Amerigo","createAt":"11/27/2016"},
    {"_id":132,"title":"Fergus","createAt":"7/13/2016"},
    {"_id":133,"title":"Anallese","createAt":"6/8/2016"},
    {"_id":134,"title":"Arty","createAt":"3/11/2017"},
    {"_id":135,"title":"Hilary","createAt":"4/7/2017"},
    {"_id":136,"title":"Marja","createAt":"8/23/2016"},
    {"_id":137,"title":"Jami","createAt":"1/3/2017"},
    {"_id":138,"title":"Queenie","createAt":"9/12/2016"},
    {"_id":139,"title":"Joete","createAt":"5/1/2017"},
    {"_id":140,"title":"Milicent","createAt":"2/26/2017"},
    {"_id":141,"title":"Inna","createAt":"10/4/2016"},
    {"_id":142,"title":"Janot","createAt":"8/15/2016"},
    {"_id":143,"title":"Suzi","createAt":"2/28/2017"},
    {"_id":144,"title":"Jeanie","createAt":"8/20/2016"},
    {"_id":145,"title":"Kain","createAt":"1/28/2017"},
    {"_id":146,"title":"Leroi","createAt":"10/25/2016"},
    {"_id":147,"title":"Rosabelle","createAt":"12/7/2016"},
    {"_id":148,"title":"Bancroft","createAt":"10/31/2016"},
    {"_id":149,"title":"Osbourne","createAt":"1/12/2017"},
    {"_id":150,"title":"Thekla","createAt":"4/2/2017"},
    {"_id":151,"title":"Jessamine","createAt":"6/24/2016"},
    {"_id":152,"title":"Alva","createAt":"1/28/2017"},
    {"_id":153,"title":"Clementina","createAt":"10/29/2016"},
    {"_id":154,"title":"Shae","createAt":"12/28/2016"},
    {"_id":155,"title":"Mamie","createAt":"1/26/2017"},
    {"_id":156,"title":"Brigitta","createAt":"1/28/2017"},
    {"_id":157,"title":"Andras","createAt":"8/17/2016"},
    {"_id":158,"title":"Aubrie","createAt":"12/12/2016"},
    {"_id":159,"title":"Martelle","createAt":"6/21/2016"},
    {"_id":160,"title":"Ulrike","createAt":"10/25/2016"},
    {"_id":161,"title":"Tamqrah","createAt":"7/17/2016"},
    {"_id":162,"title":"Cassaundra","createAt":"2/14/2017"},
    {"_id":163,"title":"Genevra","createAt":"5/5/2017"},
    {"_id":164,"title":"Rutter","createAt":"8/26/2016"},
    {"_id":165,"title":"Sutherland","createAt":"7/20/2016"},
    {"_id":166,"title":"Lanie","createAt":"1/22/2017"},
    {"_id":167,"title":"Troy","createAt":"12/13/2016"},
    {"_id":168,"title":"Chrysa","createAt":"6/4/2017"},
    {"_id":169,"title":"Gregorio","createAt":"11/11/2016"},
    {"_id":170,"title":"Amelie","createAt":"7/3/2016"},
    {"_id":171,"title":"Frayda","createAt":"8/8/2016"},
    {"_id":172,"title":"Allyson","createAt":"3/12/2017"},
    {"_id":173,"title":"Quinn","createAt":"1/12/2017"},
    {"_id":174,"title":"Gaylor","createAt":"4/5/2017"},
    {"_id":175,"title":"Peadar","createAt":"2/1/2017"},
    {"_id":176,"title":"Shelly","createAt":"4/22/2017"},
    {"_id":177,"title":"Jarib","createAt":"9/26/2016"},
    {"_id":178,"title":"Eleanore","createAt":"5/9/2017"},
    {"_id":179,"title":"Goddard","createAt":"2/7/2017"},
    {"_id":180,"title":"Windy","createAt":"3/2/2017"},
    {"_id":181,"title":"Junina","createAt":"9/10/2016"},
    {"_id":182,"title":"Boris","createAt":"12/4/2016"},
    {"_id":183,"title":"Celestia","createAt":"8/8/2016"},
    {"_id":184,"title":"Bronson","createAt":"3/24/2017"},
    {"_id":185,"title":"Lauralee","createAt":"9/26/2016"},
    {"_id":186,"title":"Sile","createAt":"6/11/2016"},
    {"_id":187,"title":"Gabriella","createAt":"7/10/2016"},
    {"_id":188,"title":"Morly","createAt":"10/1/2016"},
    {"_id":189,"title":"Laurel","createAt":"11/2/2016"},
    {"_id":190,"title":"Daffie","createAt":"2/5/2017"},
    {"_id":191,"title":"Gratiana","createAt":"11/6/2016"},
    {"_id":192,"title":"Jacquie","createAt":"2/11/2017"},
    {"_id":193,"title":"Evey","createAt":"5/18/2017"},
    {"_id":194,"title":"Cassie","createAt":"1/15/2017"},
    {"_id":195,"title":"Lamar","createAt":"7/18/2016"},
    {"_id":196,"title":"Olenolin","createAt":"1/12/2017"},
    {"_id":197,"title":"Harwell","createAt":"3/22/2017"},
    {"_id":198,"title":"Kyrstin","createAt":"2/20/2017"},
    {"_id":199,"title":"Nicolle","createAt":"1/2/2017"},
    {"_id":200,"title":"Lurline","createAt":"10/23/2016"},
    {"_id":201,"title":"Colene","createAt":"4/12/2017"},
    {"_id":202,"title":"Doug","createAt":"8/21/2016"},
    {"_id":203,"title":"Agathe","createAt":"3/1/2017"},
    {"_id":204,"title":"Demetrius","createAt":"4/24/2017"},
    {"_id":205,"title":"Jefferson","createAt":"5/4/2017"},
    {"_id":206,"title":"Brendan","createAt":"9/16/2016"},
    {"_id":207,"title":"Tomasina","createAt":"3/9/2017"},
    {"_id":208,"title":"Ezequiel","createAt":"8/4/2016"},
    {"_id":209,"title":"Curt","createAt":"3/2/2017"},
    {"_id":210,"title":"Freeland","createAt":"7/7/2016"},
    {"_id":211,"title":"Charles","createAt":"9/26/2016"},
    {"_id":212,"title":"Eldon","createAt":"9/24/2016"},
    {"_id":213,"title":"Budd","createAt":"6/15/2016"},
    {"_id":214,"title":"Joachim","createAt":"11/7/2016"},
    {"_id":215,"title":"Goober","createAt":"11/3/2016"},
    {"_id":216,"title":"Alana","createAt":"7/2/2016"},
    {"_id":217,"title":"Lennie","createAt":"8/31/2016"},
    {"_id":218,"title":"Creight","createAt":"2/12/2017"},
    {"_id":219,"title":"Torre","createAt":"12/10/2016"},
    {"_id":220,"title":"Tiff","createAt":"12/11/2016"},
    {"_id":221,"title":"Aubrie","createAt":"1/13/2017"},
    {"_id":222,"title":"Chrystel","createAt":"11/27/2016"},
    {"_id":223,"title":"Clarie","createAt":"11/15/2016"},
    {"_id":224,"title":"Patricia","createAt":"5/4/2017"},
    {"_id":225,"title":"Eyde","createAt":"11/19/2016"},
    {"_id":226,"title":"La verne","createAt":"12/14/2016"},
    {"_id":227,"title":"Auria","createAt":"1/6/2017"},
    {"_id":228,"title":"Rori","createAt":"9/28/2016"},
    {"_id":229,"title":"Clara","createAt":"8/12/2016"},
    {"_id":230,"title":"Lonee","createAt":"4/5/2017"},
    {"_id":231,"title":"Gladi","createAt":"8/29/2016"},
    {"_id":232,"title":"Anson","createAt":"9/3/2016"},
    {"_id":233,"title":"Hubie","createAt":"2/3/2017"},
    {"_id":234,"title":"Tomaso","createAt":"2/11/2017"},
    {"_id":235,"title":"Alika","createAt":"7/18/2016"},
    {"_id":236,"title":"Tulley","createAt":"4/3/2017"},
    {"_id":237,"title":"Maighdiln","createAt":"5/26/2017"},
    {"_id":238,"title":"Aymer","createAt":"12/15/2016"},
    {"_id":239,"title":"Adelina","createAt":"4/7/2017"},
    {"_id":240,"title":"Lisle","createAt":"11/27/2016"},
    {"_id":241,"title":"Berrie","createAt":"10/28/2016"},
    {"_id":242,"title":"Koo","createAt":"12/17/2016"},
    {"_id":243,"title":"Carmine","createAt":"9/5/2016"},
    {"_id":244,"title":"Lowell","createAt":"9/28/2016"},
    {"_id":245,"title":"Bathsheba","createAt":"4/13/2017"},
    {"_id":246,"title":"Sheff","createAt":"11/5/2016"},
    {"_id":247,"title":"Alyse","createAt":"10/5/2016"},
    {"_id":248,"title":"Gale","createAt":"11/22/2016"},
    {"_id":249,"title":"Lila","createAt":"7/28/2016"},
    {"_id":250,"title":"Dory","createAt":"7/14/2016"},
    {"_id":251,"title":"Yalonda","createAt":"10/31/2016"},
    {"_id":252,"title":"Evangelia","createAt":"4/2/2017"},
    {"_id":253,"title":"Rochelle","createAt":"12/29/2016"},
    {"_id":254,"title":"Gino","createAt":"9/7/2016"},
    {"_id":255,"title":"Mattias","createAt":"12/11/2016"},
    {"_id":256,"title":"Ardis","createAt":"10/20/2016"},
    {"_id":257,"title":"Silvain","createAt":"9/5/2016"},
    {"_id":258,"title":"Amil","createAt":"9/28/2016"},
    {"_id":259,"title":"Leda","createAt":"9/20/2016"},
    {"_id":260,"title":"Lynnet","createAt":"7/7/2016"},
    {"_id":261,"title":"Emeline","createAt":"2/11/2017"},
    {"_id":262,"title":"Marietta","createAt":"2/15/2017"},
    {"_id":263,"title":"Basia","createAt":"12/15/2016"},
    {"_id":264,"title":"Reggis","createAt":"4/16/2017"},
    {"_id":265,"title":"Chevy","createAt":"7/27/2016"},
    {"_id":266,"title":"Olenolin","createAt":"2/11/2017"},
    {"_id":267,"title":"Cristi","createAt":"1/22/2017"},
    {"_id":268,"title":"Kendra","createAt":"11/28/2016"},
    {"_id":269,"title":"Patton","createAt":"2/16/2017"},
    {"_id":270,"title":"Eugenie","createAt":"1/3/2017"},
    {"_id":271,"title":"Jeanine","createAt":"11/20/2016"},
    {"_id":272,"title":"Nissy","createAt":"7/20/2016"},
    {"_id":273,"title":"Bernita","createAt":"5/16/2017"},
    {"_id":274,"title":"Florina","createAt":"11/16/2016"},
    {"_id":275,"title":"Sancho","createAt":"8/20/2016"},
    {"_id":276,"title":"Crichton","createAt":"11/18/2016"},
    {"_id":277,"title":"Holly","createAt":"1/2/2017"},
    {"_id":278,"title":"Vilhelmina","createAt":"5/2/2017"},
    {"_id":279,"title":"Verine","createAt":"3/4/2017"},
    {"_id":280,"title":"Roxy","createAt":"2/5/2017"},
    {"_id":281,"title":"Georgi","createAt":"12/5/2016"},
    {"_id":282,"title":"Irwinn","createAt":"2/19/2017"},
    {"_id":283,"title":"Daron","createAt":"10/28/2016"},
    {"_id":284,"title":"Claudina","createAt":"3/19/2017"},
    {"_id":285,"title":"Jilly","createAt":"10/2/2016"},
    {"_id":286,"title":"Katherine","createAt":"11/24/2016"},
    {"_id":287,"title":"Den","createAt":"1/15/2017"},
    {"_id":288,"title":"Chevalier","createAt":"9/3/2016"},


    ];





  function DialogController($scope, $mdDialog) {


    $scope.cancel = function () {
      $mdDialog.hide();
    };

    $(document).ready(function(){

      var calculateSize = function () {
        var offset = $('#hot').offset();
        availableWidth = Math.max($(window).width() - 250,600);
        availableHeight = Math.max($(window).height() - 250, 400);
      };

      function fixdata(data) {
        var o = "", l = 0, w = 10240;
        for(; l<data.byteLength/w; ++l)
          o+=String.fromCharCode.apply(null,new Uint8Array(data.slice(l*w,l*w+w)));
        o+=String.fromCharCode.apply(null, new Uint8Array(data.slice(o.length)));
        return o;
      }


      function to_json(workbook) {

        if(workbook.SSF) XLSX.SSF.load_table(workbook.SSF);
        var result = {};
        workbook.SheetNames.forEach(function(sheetName) {
          var roa = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], {header:1});
          if(roa.length > 0) result[sheetName] = roa;



        });
        return result;
      }


      var xhr = new XMLHttpRequest();
      xhr.open('GET', 'http://localhost:3000/assets/doc/40727962.xls', true);
      xhr.responseType = 'arraybuffer';
      xhr.onload = function(e) {
        if (this.status == 200) {
          var data = this.response;




          var wb, arr;

          var readtype = {type : 'base64' };

            arr = fixdata(data);
            data = btoa(arr);




          try {

            wb = XLSX.read(data, readtype);


            var json = to_json(wb);





            console.log(json);

            calculateSize();
            $("#hot").handsontable({
             data: json.pn,
             startRows: 5,
             startCols: 3,
             stretchH: 'all',
             rowHeaders: true,
             colHeaders: true,
              width: 1280,
              height: 470,

             });



          }

          catch(e) {

            console.log(e);

          }




        }
      };
      xhr.send();








    });











  }







});