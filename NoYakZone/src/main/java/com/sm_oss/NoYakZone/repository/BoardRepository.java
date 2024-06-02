package com.sm_oss.NoYakZone.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sm_oss.NoYakZone.model.BoardDto;

@Repository
public interface BoardRepository extends JpaRepository<BoardDto, Integer> {
}
