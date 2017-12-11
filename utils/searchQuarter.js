/**
 * Created by simvolice on 11.12.2017 13:16
 */



function searchQuarter(allQuarter ,month) {

    for (let itemQuarters of allQuarter) {

        if (itemQuarters.codeName.includes(month)){


            return itemQuarters.name;


        }



    }


}



module.exports = searchQuarter;