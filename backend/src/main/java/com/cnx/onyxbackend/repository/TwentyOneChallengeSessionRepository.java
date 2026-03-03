package com.cnx.onyxbackend.repository;

import com.cnx.onyxbackend.model.TwentyOneChallengeSession;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TwentyOneChallengeSessionRepository extends JpaRepository<TwentyOneChallengeSession, String> {
}