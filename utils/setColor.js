/**
 * Created by simvolice on 14.11.2017 16:00
 */



module.exports = {


    setColorOnStatus: async (statusName) => {


        const inWorkStatus = "green";
        const oneWeekBefore = "yellow";
        const finishStatus = "rgba(0, 0, 0, 0.8)";
        const deadlineStatus = "red";



        if (statusName === "В работе") {

            return inWorkStatus;

        } else if (statusName === "Завершен") {


            return finishStatus;


        } else if (statusName === "deadlineStatus") {

            return deadlineStatus;


        } else if (statusName === "oneWeekBefore") {



            return oneWeekBefore;



        } else {


            return "white";

        }







    }










};