package org.iu.ads.repository;

import org.iu.ads.view.UserInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<UserInfo, String> {

    List<UserInfo> findByUserName(String userName);
    List<UserInfo> findAll();
}
