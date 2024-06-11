package com.sm_oss.NoYakZone.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.sm_oss.NoYakZone.model.Board;

import java.time.LocalDateTime;
import java.util.List;

public interface BoardRepository extends JpaRepository<Board, Integer> {
    List<Board> findByDate(LocalDateTime date);

    List<Board> findById(String id);

    List<Board> findByTextContaining(String text);
}
