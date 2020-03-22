package org.iu.ads.processor.document;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "PostProcessorData")
public class PostData {

    public static final String HOST_URL = "hostURL";
    public static final String USER_NAME = "userName";
    public static final String JOB_ID = "jobID";

    @Id
    private String id;
    private String userName;
    private String jobID;
    private String hostURL;

    public PostData() {
    }

    public PostData(String aUserName, String aJobID, String aHostURL) {
        userName = aUserName;
        jobID = aJobID;
        hostURL = aHostURL;
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

    public String getHostURL() {
        return hostURL;
    }

    public void setHostURL(String hostURL) {
        this.hostURL = hostURL;
    }

}
