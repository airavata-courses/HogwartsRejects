package org.iu.ads.processor.repository;

import org.iu.ads.processor.document.PostData;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface PostProcessorRepository extends MongoRepository<PostData, Long> {

    List<PostData> findByUserName(String userName);

    List<PostData> findByJobID(String jobID);
}
