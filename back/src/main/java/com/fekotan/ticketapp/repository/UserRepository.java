package com.fekotan.ticketapp.repository;

import org.springframework.data.repository.CrudRepository;

import com.fekotan.ticketapp.entity.User;

import java.util.Optional;

// This will be AUTO IMPLEMENTED by Spring into a Bean called userRepository
// CRUD refers Create, Read, Update, Delete

public interface UserRepository extends CrudRepository<User, Long> {
    Optional<User> findByEmail(String email);

    boolean existsByEmail(String email);

}