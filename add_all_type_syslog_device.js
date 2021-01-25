/* Script to add multiple syslog devices at the same time in ELA, 
Open 'Device Management page' and
Paste below script in console (make changes to start_from_ip, device_count if needed) and execute.

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
    success: function (response) {
        unixIds = response.CUSTOM_STATUS.unixIds;
        devices = response.CUSTOM_STATUS.deviceList;
        request = 'request=' + '%7B%22TYPE%22%3A%22GET_ALL_DEVICE%22%7D' + '&' + elacsrf;
        jQuery.ajax({
            async: false,
            url: url + '/event/emberAPI/getAllDeviceDetails?', type: 'post', data: request,
            success: function (response) {
                request_object = {};
                request_object['OPERATION'] = 'UPDATEDEVICE';
                for (let i = 0; i < unixIds.length; i++) {
                    // if ([13, 14, 15, 20].contains(j)) {j--;continue;}
                    request_object['DEVICE_CATEGORY'] = response.response.DEVICE_DETAILS[i % response.response.DEVICE_DETAILS.length].value;
                    request_object['NAME'] = request_object['IPADDRESS'] = request_object['DISPLAY_NAME'] = request_object['DISPLAYNAME'] = devices[i];
                    request_object['NODE_INFO_ID'] = request_object['DEVICE_ID'] = unixIds[i];
                    request = 'request=' + JSON.stringify(request_object) + '&' + elacsrf;
                    jQuery.ajax({ url: url + '/event/emberAPI/addUpdateDevice?', type: 'post', data: request });
                }
            }
        });
    }
});