package org.iu.ads.repository;

import org.iu.ads.documents.SessionData;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SessionManagement extends MongoRepository<SessionData, Long> {

    public List<SessionData> findByUserName(String userName);

}
