/*
 * Include standard and third-party npm modules
 */
var net = require('net');
var dgram = require('dgram');
var uuid = require('uuid');

var PORT_UDP = 2205;
var PORT_TCP = 2205;
var MULTI_CAST_ADR = "239.255.22.5"

	
	var musicians = new Map();
	
	function removeMusician(uuid){
		musician.delete(uuid);
	}
	
	
var server = dgram.createSocket('udp4');

server.on('error', (err) => {
  console.log(`server error:\n${err.stack}`);
  server.close();
});

server.on('message', (msg, rinfo) => {
var soundRecu = JSON.parse(msg);
var musicianUuid = soundRecu.uuid;
var musician = musicians.get(musicianUuid);

if(musician == undefined){
	musician.set(musicianUuid,{
		"instrument" : soundRecu.instrument,
		"timeout" : setTimeout(removeMusician,5000,musicianUuid)
	});
}else{
	clearTimeout(musician.timeout);
	musician.timeout = setTimeout(removeMusician,5000,musicianUuid);
}

});

server.on('listening', () => {
  console.log("server listening for musicians");
});

server.bind(PORT_UDP,(err) => {
	server.addMembership(MULTI_CAST_ADR);
});