package com.session.repository;

import com.session.documents.SessionData;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SessionManagement extends MongoRepository<SessionData, Long> {
}
