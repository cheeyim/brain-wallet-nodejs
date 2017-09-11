var express = require("express");
var app = express();
var request = require("request");
var bodyparser = require("body-parser");
var bitcore = require("bitcore-lib");

app.use(bodyparser.urlencoded({
    extended: true
}))
app.use(bodyparser.json());

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/wallet", function(req, res) {
    var brainsrc = req.body.brainsrc;
    var input = new Buffer(brainsrc);
    var hash = bitcore.crypto.Hash.sha256(input);
    //compress key 
    //var bn = bitcore.crypto.BN.fromBuffer(hash);
    var pk = new bitcore.PrivateKey(hash).toWIF();
    var addy = new bitcore.PrivateKey(hash).toAddress();
    res.send("The brain wallet of " + brainsrc + "<br />Addy: "
    + addy + "<br />Private key: " + pk);
    console.log(brainsrc);
});

app.listen(80, function(){
    console.log("go");
});