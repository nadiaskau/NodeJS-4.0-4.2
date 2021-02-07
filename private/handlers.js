'use strict';
/*
 * handlers.js
 * Requesthandlers to be called by the router mechanism
 */
const fs = require("fs");                               // file system access
const filename = "./public/json/formdata.json"
const httpStatus = require("http-status-codes");        // http sc
const lib = require("../private/libWebUtil");           // home grown utilities
const experimental = require("../private/myTemplater"); // highly experimental template
const querystring = require("querystring");
const printContacts = require("../private/contactList"); //printring JSON file to HTML
const date = require("../private/date");                 //get current date

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
const getAndServe = async function (res, path, content) {   // asynchronous
    await fs.readFile(path, function(err, data) {           // awaits async read
        if (err) {
            console.log(`Not found file: ${path}`);
        } else {
            res.writeHead(httpStatus.OK, {          // yes, write header
                "Content-Type": content
            });
            console.log(`served routed file: ${path}.`);
            res.write(data);
            res.end();
        }
    });
}

module.exports = {
    home(req, res) {
        let path = req.url;
        if (path === "/" || path === "/start") {
            path = "/index";
        }
        path = "views" + path + ".html";
        let content = "text/html; charset=utf-8";
        getAndServe(res, path, content);
    },
    js(req, res) {
        let path = "public/javascripts" + req.url;
        let content = "application/javascript; charset=utf-8";
        getAndServe(res, path, content);
    },
    css(req, res) {
        let path = "public/stylesheets" + req.url;
        let content = "text/css; charset=utf-8";
        getAndServe(res, path, content);
    },
    png(req, res) {
        let path = "public/images" + req.url;
        let content = "image/png";
        getAndServe(res, path, content);
    },
    ico(req, res) {
        let path = "public" + req.url;
        let content = "image/x-icon";
        getAndServe(res, path, content);
    },

    notfound(req, res) {
        console.log(`Handler 'notfound' was called for route ${req.url}`);
        res.end();
    },

    receiveData(req, res, data) {
        
        let obj = lib.makeWebArrays(req, data);         // home made GET and POST objects
        res.writeHead(httpStatus.OK, {                  // yes, write relevant header
            "Content-Type": "text/html; charset=utf-8"
        });
        res.write(experimental.receipt(obj));           // home made templating for native node*/

        let body = []; //empty array
        data += date.currentDate(); //adding current date to querystring
        data = querystring.parse(data); //parsing querystring into key value pairs
        
        fs.readFile(filename, (err, JSONcontent) => { //Read existing file
            if (err) {
                throw err;
                
            }
            if(JSONcontent.length !== 0){ //if content file is not empty
                body = JSON.parse(JSONcontent); //get content from file and objectify 
            }

            body.push(data); //pushing the new data into body array (our content)
            body = JSON.stringify(body); //stringify
            fs.writeFile(filename, body, (err) => { //writing our file with updated content
                if(err) {
                    throw err;
                }
            });
        
        });

        res.end(); 
    },

    contactList(req, res, data) {

        printContacts.printContacts(res);

    }
}