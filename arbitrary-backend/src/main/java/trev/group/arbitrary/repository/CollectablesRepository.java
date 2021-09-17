package trev.group.arbitrary.repository;

import org.springframework.data.repository.CrudRepository;
import trev.group.arbitrary.models.Collectables;

import java.util.List;

public interface CollectablesRepository extends CrudRepository<Collectables, Long> {
    Collectables findByCollectableid(long collectableid);
    Collectables findByName(String name);
    List<Collectables> findCollectablesByNameContainingIgnoreCase(String name);
}
