package trev.group.arbitrary.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import trev.group.arbitrary.models.Collectables;
import trev.group.arbitrary.models.User;
import trev.group.arbitrary.models.UserCollection;
import trev.group.arbitrary.services.CollectablesService;
import trev.group.arbitrary.services.UserCollectionService;
import trev.group.arbitrary.services.UserService;

import java.util.List;

@RestController
@RequestMapping("/usercollection")
public class UserCollectionController {

    @Autowired
    public UserService userService;

    @Autowired
    public UserCollectionService userCollectionService;

    @Autowired
    public CollectablesService collectableService;

    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    @GetMapping(value = "/collection")
    public  ResponseEntity<?> getUserCollection(Authentication authentication) {
        User u = userService.findByName(authentication.getName());

        UserCollection userCollection = u.getCollection();
        List<Collectables> rtnList = userCollection.getCollectables();

        return new ResponseEntity<>(rtnList, HttpStatus.OK);
    }


    @PatchMapping(value="/collection/add", consumes = "application/json", produces = "application/json")
    public ResponseEntity<?> addCollection(Authentication authentication, @RequestBody Collectables newCollectable) {
        // find the user based on auth
        User u = userService.findByName(authentication.getName());
        // update the collection with the new collectable
        userCollectionService.update(u.getUserid(), newCollectable);
        UserCollection rtnCollection = u.getCollection();
        return new ResponseEntity<>(rtnCollection, HttpStatus.OK);
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    @DeleteMapping(value = "/collection/{collectableid}", produces = "application/json")
    public ResponseEntity<?> deleteCollectableById(@PathVariable long collectableid, Authentication authentication) {
        User u = userService.findByName(authentication.getName());
        collectableService.delete(collectableid);
        UserCollection rtnCollection = u.getCollection();
        return new ResponseEntity<>(rtnCollection, HttpStatus.OK);
    }

}
