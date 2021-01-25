/* Script to add multiple syslog devices at the same time in ELA, 
Open 'Device Management page' and
Paste below script in console (make changes to start_from_ip, device_count if needed) and press enter.

*/
let start_from_ip = '192.168.4.';
let device_count = 46;
let request_object = {}, devices = [], unixIds = [], url = location.protocol + '//' + location.hostname + ':' + location.port;
let elacsrf = 'elacsrf=' + document.forms.settings.elements['elacsrf'].value;
request_object['OPERATION'] = 'ADDDEVICE';
request_object['syslogIps'] = '';
for (let i = 10; i < device_count + 10; i++) devices.push(start_from_ip + i);
request_object['syslogIps'] = request_object['DEVICE_NAME'] = request_object['DEVICENAME'] = devices.toString();
request_object['DEVICE_SOURCE_ID'] = '9';
request_object['SYSLOGDEVICE'] = true;
request = 'request=' + JSON.stringify(request_object) + '&' + elacsrf;
jQuery.ajax({
    url: url + '/event/emberAPI/addUpdateDevice?', type: 'post', data: request,
});