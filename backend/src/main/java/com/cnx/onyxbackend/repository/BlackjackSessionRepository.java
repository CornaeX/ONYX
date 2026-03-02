package com.cnx.onyxbackend.repository;

import com.cnx.onyxbackend.model.BlackjackSession;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BlackjackSessionRepository extends JpaRepository<BlackjackSession, String> {
}