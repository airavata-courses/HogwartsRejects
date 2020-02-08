package com.users.view;

import javax.persistence.*;

@Entity
public class UserInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    //@Column(name = "firstname")
    private String firstName;

    //@Column(name = "lastname")
    private String lastName;

    private String userName;

    private String password;

    public UserInfo() {
    }

    public UserInfo(String aFirstName, String aLastName, String aUserName, String aPassword) {
        firstName = aFirstName;
        lastName = aLastName;
        userName = aUserName;
        password = aPassword;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String username) {
        this.userName = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

}
