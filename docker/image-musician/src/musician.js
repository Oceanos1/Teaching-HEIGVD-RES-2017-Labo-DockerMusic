/*
 * Include standard and third-party npm modules
 */
var net = require('net');
var dgram = require('dgram');
var uuid = require('uuid/v1');
var PORT = 2205;
var MULTI_CAST_ADR = "239.255.22.5"

var instruments = new Map();
	instruments.set("piano", "ti-ta-ti");
	instruments.set("trumpet", "pouet");
	instruments.set("flute", "trulu");
	instruments.set("violin", "gzi-gzi");
	instruments.set("drum", "boum-boum");

//recuperation de l'instrument
var instrument = process.argv[2]; //on recupère l'instrument

var instruRecuSon = instruments.get(instrument);
if(instruRecuSon == undefined){
	process.on('exit', function(){
		console.log("L'instrument passé en paramètre n'est pas un instrument valide.");
		process.exit(1);
	});
}

var instrumentMessage = {"uuid":uuid(),"instrument":instrument,"sound":instruRecuSon,"activeSince":new Date()};
var instrumentSerialise = new Buffer(JSON.stringify(instrumentMessage));

var socketUdp = dgram.createSocket('udp4');


setInterval(function() {
	socketUdp.send(instrumentSerialise,0,instrumentSerialise.length, PORT, MULTI_CAST_ADR, (err)=> {
			console.log("envoi de : "+ instrumentSerialise);
		});
},1000);

