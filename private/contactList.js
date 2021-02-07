"use strict";

const fs = require("fs");
const filename = "./public/json/formdata.json";
const httpStatus = require("http-status-codes");        // http sc

exports.printContacts = function(res, obj) {

    fs.readFile(filename, (err, JSONcontent) => { //Read file - get our content
        if (err) {
            throw err;
            
        } 
        else 
        {
            let content = "text/html; charset=utf-8";
            res.writeHead(httpStatus.OK, {          // yes, write header
                "Content-Type": content
            });

            let html = `<!doctype html> 
            <html>
            <head>
                <meta charset="utf-8"/>
                <title>Contact list</title>
            </head>
            <body> `;

            obj = JSON.parse(JSONcontent); //get and objectify JSON content
            for (let i = 0; i < obj.length; i++) { //our array with objects            
                for(let key in obj[i]) { //for each property 
                    let p =  `<p><b>${key}</b>: ${obj[i][key]}</p>`;
                    html += p; 
                }
            }

            html += `</body> </html>`; 
            res.write(html);
            res.end();
        }
        
    });
}