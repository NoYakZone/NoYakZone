package com.sm_oss.NoYakZone.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.sm_oss.NoYakZone.model.Patter;

import java.util.List;

public interface PatterRepository extends JpaRepository<Patter, Integer> {
    List<Patter> findByWordContaining(String word);
}
