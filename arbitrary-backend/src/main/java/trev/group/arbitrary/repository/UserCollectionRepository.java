package trev.group.arbitrary.repository;

import org.springframework.data.repository.CrudRepository;
import trev.group.arbitrary.models.UserCollection;

public interface UserCollectionRepository extends CrudRepository<UserCollection, Long> {
}
