package org.iu.ads.documents;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Document(collection = "SessionData")
public class SessionData {

    public static final String HOST_URL = "hostURL";
    public static final String QUERY = "query";
    public static final String USER_NAME = "userName";
    public static final String JOB_ID = "jobID";
    public static final String STATUS = "status";

    @Id
    private String id;
    private String userName;
    private String jobID;
    private String query;
    private String status;
    private Date queryDate;
    private String hostURL;

    public SessionData() {
    }

    //query is nexrad url
    public SessionData(String aUserName, String aJobID, String aStatus) {
        userName = aUserName;
        jobID = aJobID;
        query = "";
        status = aStatus;
        queryDate = new Date(System.currentTimeMillis());
        hostURL = "";
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getJobID() {
        return jobID;
    }

    public void setJobID(String jobID) {
        this.jobID = jobID;
    }

    public String getQuery() {
        return query;
    }

    public void setQuery(String query) {
        this.query = query;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Date getQueryDate() {
        return queryDate;
    }

    public void setQueryDate(Date queryDate) {
        this.queryDate = queryDate;
    }

    public String getHostURL() {
        return hostURL;
    }

    public void setHostURL(String hostURL) {
        this.hostURL = hostURL;
    }

}
