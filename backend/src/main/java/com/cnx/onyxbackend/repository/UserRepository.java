package com.cnx.onyxbackend.repository;

import com.cnx.onyxbackend.model.User;
import jakarta.persistence.LockModeType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, String> { // Changed to String

    // PESSIMISTIC_WRITE locks the row so bets/deposits are mathematically safe
    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("SELECT u FROM User u WHERE u.uid = :uid") // Changed to u.uid
    Optional<User> findByIdForUpdate(@Param("uid") String uid); // Changed to String
}