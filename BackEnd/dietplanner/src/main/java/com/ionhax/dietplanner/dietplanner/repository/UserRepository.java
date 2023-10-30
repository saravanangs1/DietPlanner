package com.ionhax.dietplanner.dietplanner.repository;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

import com.ionhax.dietplanner.dietplanner.entity.User;

public interface UserRepository extends CrudRepository<User, String> {
    Optional<User> findByEmail(String email);
    Optional<User> findByUid(Long Uid);    
}
