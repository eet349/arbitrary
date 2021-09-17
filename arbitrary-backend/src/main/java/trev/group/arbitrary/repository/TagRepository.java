package trev.group.arbitrary.repository;

import org.springframework.data.repository.CrudRepository;
import trev.group.arbitrary.models.Tag;

public interface TagRepository extends CrudRepository<Tag, Long>{
}
