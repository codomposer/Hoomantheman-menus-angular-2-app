"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var http = require("http");
var socketIo = require('socket.io');
var sql = require("mssql");
var constants_1 = require("./constants");
var util_1 = require("./util");
/**
 * Controllers (route handlers).
 */
var pdfReaderController = require("./controllers/pdf-reader");
var chat_controller_1 = require("./controllers/chat.controller");
var constants = new constants_1.Constants();
/**
 * Create Express server.
 */
var app = express();
app.use(express.static('public'));
app.use(function (_req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});
var port = process.env.PORT || constants.PORT;
var server = http.createServer(app);
/**
 * Create Socket connection.
 */
var io = socketIo(server);
/**
 * Connect to DB
 */
sql.connect(constants.DBConfig).then(function () {
    new chat_controller_1.ChatController(io, constants);
});
/**
 * API routes.
 */
app.get('/pdf-reader', pdfReaderController.readPDF);
// app.get('/test1', (req: Request, res: any) => {
//     console.log('public', process.cwd() + '/public');
//     const child = require('child_process');
//     const publicDir = process.cwd() + '\\public';
//     child.exec(`'C:\\Program Files (x86)\\gs\\gs9.22\\bin\\gs' -q -dQUIET -dSAFER -dBATCH -dNOPAUSE -dNOPROMPT -dMaxBitmap=500000000 -dAlignToPixels=0 -dGridFitTT=2 '-sDEVICE=pngalpha' -dTextAlphaBits=4 -dGraphicsAlphaBits=4 '-r100x100' -sOutputFile='${publicDir}\\Pic-%d.png' '${publicDir}\\food.pdf'`, (err, std, stderr) => {
//         const str =`${err} ${std} ${stderr}`;
//         res.send(str);
//     });
//     // const PDFImage = require('pdf-image').PDFImage;
//     // const pdfImage = new PDFImage('food.pdf');
//     // pdfImage.convertPage(0).then(function (imagePath) {
//     //     // 0-th page (first page) of the slide.pdf is available as slide-0.png 
//     //     // fs.existsSync('/tmp/slide-0.png') // => true
//     //     console.log('imagePath', imagePath);
//     //     res.send({ test2: 12323423 });
//     // }, function (err) {
//     //   res.send({ test2: err });
//     // });
// });
/**
 * Start Express server.
 */
server.listen(port, function () {
    util_1.Util.log('Running server on port %s', port);
});
exports.default = app;
