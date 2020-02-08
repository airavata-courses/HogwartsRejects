package com.users.repository;

import com.users.view.UserInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<UserInfo, String> {

    List<UserInfo> findByUserName(String userName);
    List<UserInfo> findAll();
}
