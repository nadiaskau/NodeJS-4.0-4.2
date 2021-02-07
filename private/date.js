//Inspiration from https://www.w3resource.com/javascript-exercises/javascript-date-exercise-2.php

exports.currentDate = function() {
    date = new Date(); 
    let day = date.getDate(); 
    let month = date.getMonth() + 1; //since January is 0
    let year = date.getFullYear();

    if(day < 10){
        day = '0' + day; //putting zero in front of day
    }
    if(month < 10){
        month = '0' + month; //putting zero in front of month
    }

    return (day + '-' + month + '-' + year);
}