/*
 * Include standard and third-party npm modules
 */
var net = require('net');
var dgram = require('dgram');
var uuid = require('uuid/v1');
var port = 2205;

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

var instrumentMessage = {"uuid":uuid(),"sound":instruRecuSon};
var instrumentSerialise = Json.stringify(instrumentMessage);

var socketUdp = dgram.createSocket('udp4');


setInterval(function() {
	socketUdp.send(instrumentSerialise, port, 'localhost', (err) => {
  socketUdp.close();
});
},1000);

