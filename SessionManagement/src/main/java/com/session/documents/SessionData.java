package com.session.documents;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Document(collection = "SessionData")
public class SessionData {

    public static final String MODELLING = "modelling";

    @Id
    public String id;
    public String userName;
    public String jobID;
    public String query;
    public String status;
    public Date queryDate;
    private String hostURL;

    public SessionData() {
    }

    //query is nexrad url
    public SessionData(String aUserName, String aJobID, String aQuery) {
        userName = aUserName;
        jobID = aJobID;
        query = aQuery;
        status = MODELLING;
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
