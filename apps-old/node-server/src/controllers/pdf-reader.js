"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var md5 = require("md5");
var fs = require('fs');
var http = require('http');
var https = require('https');
var rimraf = require('rimraf');
var constants_1 = require("../constants");
var exec = require('child_process').exec;
var downloadFile = function (src, dest, onComplete) {
    var file = fs.createWriteStream(dest);
    var request = https.get(src, function (response) {
        response.pipe(file);
        file.on('finish', function () {
            if (onComplete) {
                onComplete();
            }
        });
    });
};
var convertPDF2PNG = function (filePDF, filePNG, onComplete) {
    // var cmd = `convert -density 96 ${filePDF} ${filePNG} | wc -l`;
    console.log('public', process.cwd() + '/public');
    var publicDir = process.cwd() + "\\public";
    // var cmd = `"C:\\Program Files (x86)\\gs\\gs9.22\\bin\\gs" -q -dQUIET -dSAFER -dBATCH -dNOPAUSE -dNOPROMPT -dMaxBitmap=500000000 -dAlignToPixels=0 -dGridFitTT=2 "-sDEVICE=pngalpha" -dTextAlphaBits=4 -dGraphicsAlphaBits=4 "-r100x100" -sOutputFile="${publicDir}\\Pic-%d.png" "${publicDir}\\food.pdf"`;
    // LOW Quality
    // var cmd = `${Constants.GS_PATH} -q -dQUIET -dSAFER -dBATCH -dNOPAUSE -dNOPROMPT -dMaxBitmap=500000000 -dAlignToPixels=0 -dGridFitTT=2 "-sDEVICE=pngalpha" -dTextAlphaBits=4 -dGraphicsAlphaBits=4 "-r100x100" -sOutputFile="${filePNG}" "${filePDF}"`;
    // HIGH Quality
    var cmd = constants_1.Constants.GS_PATH + " -dNOPAUSE -q -r300 -sPAPERSIZE=a4 -dTextAlphaBits=4 -dGraphicsAlphaBits=4 -dUseTrimBox -sDEVICE=png16m -dBATCH -sOutputFile=\"" + filePNG + "\" -c \"30000000 setvmthreshold\" -f \"" + filePDF + "\"";
    console.log('cmd', cmd);
    exec(cmd, onComplete);
};
var sendPNGRespoonse = function (filePNGDir, res) {
    var pages = new Array();
    fs.readdirSync(filePNGDir).forEach(function (file) {
        var path = filePNGDir + "/" + file;
        path = constants_1.Constants.BASE_URL + path.substr(path.indexOf('/pdfs/'), path.length - 1);
        pages.push({
            name: file,
            image: path
        });
    });
    pages = pages.sort(function (a, b) {
        return (Number(a.name.match(/(\d+)/g)[0]) - Number((b.name.match(/(\d+)/g)[0])));
    });
    res.send({
        status: 'success',
        pages: pages
    });
};
var sendErrResponse = function (res) {
    res.send({ status: 'error' });
};
exports.readPDF = function (req, res) {
    // console.log('request', req.query.file);
    // var pdfPath = 'https://apps.datassential.com/snap/api/GetFoodBytes?id=250';
    // var pdfPath = 'food1.pdf';
    // // var pdfPath = req.params[0];
    // var pageNumber = 1;
    // var PDFImage = require("pdf-image").PDFImage;
    // var pdfImage = new PDFImage(pdfPath);
    // pdfImage.convertPage(pageNumber).then(function (imagePath) {
    //   res.sendFile(imagePath);
    // }, function (err) {
    //   res.send(err);
    // });
    var url = 'test';
    // Return Error if File URL is not passed
    if (!req.query.file) {
        sendErrResponse(res);
        return;
    }
    var fileURL = req.query.file.toString();
    // Return Error if File URL is not from `datassential`
    if (!fileURL.startsWith(constants_1.Constants.DATASSENTIAL_URL)) {
        sendErrResponse(res);
        return;
    }
    var dir = process.cwd() + '/public/pdfs';
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
    var fileNameMD5 = md5(fileURL);
    // Create PDF Directory if doesn't exists
    var fileMD5Dir = dir + "/" + fileNameMD5;
    if (!fs.existsSync(fileMD5Dir)) {
        fs.mkdirSync(fileMD5Dir);
    }
    // Create PDF File Directory if doesn't exists
    var filePDFDir = dir + "/" + fileNameMD5 + "/pdf";
    if (!fs.existsSync(filePDFDir)) {
        fs.mkdirSync(filePDFDir);
    }
    // Create PNG File Directory if doesn't exists
    var filePNGDir = dir + "/" + fileNameMD5 + "/png";
    if (!fs.existsSync(filePNGDir)) {
        fs.mkdirSync(filePNGDir);
    }
    var filePDF = filePDFDir + "/file.pdf";
    var filePNG = filePNGDir + "/file-%d.png";
    if (!fs.existsSync(filePDF)) {
        downloadFile(fileURL, filePDF, function () {
            convertPDF2PNG(filePDF, filePNG, function (err, stdout, stderr) {
                if (err || stderr) {
                    console.log("err: " + err);
                    // rimraf.sync(fileMD5Dir);
                    sendErrResponse(res);
                    return;
                }
                // // the *entire* stdout and stderr (buffered)
                console.log("stdout: " + stdout + " " + typeof stdout + " " + !stdout);
                console.log("stderr: " + stderr + " " + typeof stderr + " " + !stderr);
                sendPNGRespoonse(filePNGDir, res);
            });
        });
    }
    else {
        sendPNGRespoonse(filePNGDir, res);
    }
};
