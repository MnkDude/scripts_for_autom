/* Script to add multiple syslog devices at the same time in ELA, 
Paste below script in console (make changes to start_from_ip, device_count if needed) and execute.

*/
let start_from_ip = '192.168.3.';
let device_count = 20;
let request_object = {};
request_object['OPERATION'] = 'ADDDEVICE';
request_object['syslogIps'] = '';
let devices = [];
while (device_count) devices.push(start_from_ip+device_count--);
request_object['syslogIps'] = devices.toString();
request_object['DEVICE_NAME'] = devices.toString();
request_object['DEVICENAME'] = devices.toString();
request_object['DEVICE_SOURCE_ID'] = '9';
request_object['SYSLOGDEVICE'] = true;
request = 'request=' + JSON.stringify(request_object) + '&' + 'elacsrf=' + document.cookie.split('_zcsr_tmp=')[1].split(';')[0];
jQuery.ajax({ url: location.protocol + '//' + location.hostname + ':' + location.port + '/event/emberAPI/addUpdateDevice?', type: 'post', data: request });