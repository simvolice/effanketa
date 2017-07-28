/**
 * Created by simvolice on 27.02.2017 22:09
 */

function isNegative(n) {
  return ((n = +n) || 1 / n) < 0;
}


module.exports = {

    checkProps: (propName) => {




        if (propName === null) {



          return false;


        } else if (propName === undefined) {


          return false;


        } else if (propName === '') {


          return false;


        } else if (propName === {}) {


          return false;


        } else if (propName === []) {


          return false;


        } else if (propName >= Number.MAX_SAFE_INTEGER) {


          return false;


        }  else if (isNegative(propName)) {


          return false;


        } else {


          return true;


        }




    },



    checkReqBody: (req) => {




      let ArrValue = Object.values(req.body);
      let ArrResult = [];


      for (let i of ArrValue) {
        if (module.exports.checkProps(i)) {

          ArrResult.push(true);

        } else {

          ArrResult.push(false);


        }
      }




      if (ArrResult.includes(false)) {

        return false;

      } else {

        return true;

      }








    }













};