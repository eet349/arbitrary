package trev.group.arbitrary.services;

import trev.group.arbitrary.models.Collectables;

import java.util.List;

public interface CollectablesService {
    List<Collectables> findAll();
    List<Collectables> findByNameContaining(String name);
    Collectables findCollectablesByCollectableid(long collectableid);
    Collectables findByName(String name);
    void delete(long collectableid);
    Collectables save(long userid, Collectables collectable);
//    Collectables update()
}
