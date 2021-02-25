import java.io.PrintWriter;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;

public class FTP {
    static void ftpLogSimulator(int logCount,String fromDate, String toDate, int minHour, int maxHour) {
        ftpLogSimulator(logCount,fromDate, toDate, minHour, maxHour, "", "");
    }

    static void ftpLogSimulator(int logCount,String fromDateText, String toDateText, int minHour, int maxHour, String textToFind, String textToReplace) {
        try {
            String commentText="#Software: Microsoft Internet Information Services 6.0\n" +
                    "#Version: 1.0\n" +
                    "#Date: 2019-8-29 23:10:25\n" +
                    "#Fields: date time c-ip cs-username s-sitename s-computername s-ip s-port cs-method cs-uri-stem cs-uri-query sc-status sc-win32-status sc-bytes cs-bytes time-taken cs-version cs-host cs(User-Agent) cs(Cookie) cs(Referer)";
            String[] ftpAllLogs = new String[]
                    {"2019-9-7 09:15:08 192.168.111.58 administrator MSFTPSVC1 CHERRY-W2KSERVE 192.168.117.222 21 [1]DELE testuri.com - 230 0 0 0 16 FTP - - - -",
                            "2019-9-7 09:13:30 192.168.111.58 administrator MSFTPSVC1 CHERRY-W2KSERVE 192.168.117.222 21 [1]MKD testuri.com - 230 0 0 0 16 FTP - - - -",
                            "2019-9-7 09:14:53 192.168.111.58 administrator MSFTPSVC1 CHERRY-W2KSERVE 192.168.117.222 21 [1]RMD testuri.com - 230 0 0 0 16 FTP - - - -",
                            "2019-9-7 09:10:37 192.168.111.58 administrator MSFTPSVC1 CHERRY-W2KSERVE 192.168.117.222 21 [1]GET testuri.com - 230 0 0 0 16 FTP - - - -",
                            "2019-9-7 09:12:40 192.168.111.58 administrator MSFTPSVC1 CHERRY-W2KSERVE 192.168.117.222 21 [1]GET testuri.com - 431 0 0 0 16 FTP - - - -",
                            "2019-9-7 09:16:20 192.168.111.58 administrator MSFTPSVC1 CHERRY-W2KSERVE 192.168.117.222 21 [1]PUT testuri.com - 230 0 0 0 16 FTP - - - -",
                            "2019-9-7 09:10:37 192.168.111.58 administrator MSFTPSVC1 CHERRY-W2KSERVE 192.168.117.222 21 [1]GET testuri.com - 230 0 0 0 16 FTP - - - -"};
            PrintWriter writer1 = new PrintWriter("ftpout.txt");
            writer1.println(commentText);
            DateTimeFormatter forDate = DateTimeFormatter.ofPattern("yyyy-MM-dd");
            DateTimeFormatter forTime = DateTimeFormatter.ofPattern("hh:mm:ss");
            LocalDate fromDate = LocalDate.parse(fromDateText, forDate);
            LocalDate toDate = LocalDate.parse(toDateText, forDate);
            LocalTime fromTime = LocalTime.of(minHour, 0, 0);
            LocalTime toTime = LocalTime.of(maxHour, 59, 59);
            for (int i = 0, j = 0; i < logCount; i++, j++) {
                if (j < ftpAllLogs.length) {
                    if (fromDate.isAfter(toDate))
                        fromDate = LocalDate.parse(fromDateText, forDate);
                    if (fromTime.isAfter(toTime)) fromTime = LocalTime.of(minHour, 0, 0);
                    String line = ftpAllLogs[j];
                    line = line.replaceAll("\\d{4}-\\d{1,2}-\\d{1,2}\\s\\d{1,2}:\\d{1,2}:\\d{1,2}", fromDate.format(forDate) + " " + fromTime.format(forTime));
                    line = line.replaceAll(textToFind, textToReplace);//+((userCount==1)?userCount=50:userCount--));
                    writer1.println(line);
                    fromDate = fromDate.plusDays(1);
                    fromTime = fromTime.plusMinutes(1);
                } else j = 0;
            }
            writer1.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
