## add_all_type_syslog_device.js
    Script to add multiple type of syslog devices at the same time in ELA, 
    Open 'Device Management page' and
    Paste below script in console (make changes to start_from_ip, device_count if needed) and execute.
 
## add_all_type_syslog_device.js
    Script to add multiple syslog devices at the same time in ELA, 
    Open 'Device Management page' and
    Paste below script in console (make changes to start_from_ip, device_count if needed) and execute.
    
## FTPLogSimulator.jar
    saves all ftp logs in file ftpout.txt of given inputs
    Format for arguments should be
    1. logcount
    2. fromDate(YYYY-MM-DD)
    3. toDate(YYYY-MM-DD)
    4. fromHour
    5. toHour
    6. textToFind(Optional)
    7. textToReplace(Optional)
    eg. java -jar FTPLogSimulator.jar 1000 2021-10-01 2021-10-02 4 8 administrator ftpadmin
