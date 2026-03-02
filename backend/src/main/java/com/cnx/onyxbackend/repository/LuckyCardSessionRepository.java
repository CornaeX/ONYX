package com.cnx.onyxbackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.cnx.onyxbackend.model.LuckyCardSession;

public interface LuckyCardSessionRepository extends JpaRepository<LuckyCardSession, String> {}