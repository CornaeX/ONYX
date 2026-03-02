package com.cnx.onyxbackend.repository;

import com.cnx.onyxbackend.model.CrashSession;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CrashSessionRepository extends JpaRepository<CrashSession, String> {

    Optional<CrashSession> findTopByUidAndStatusOrderByCreatedAtDesc(String uid, String status);
}