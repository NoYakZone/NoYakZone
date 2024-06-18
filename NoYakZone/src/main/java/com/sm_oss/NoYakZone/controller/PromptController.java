package com.sm_oss.NoYakZone.controller;

import com.sm_oss.NoYakZone.model.Board;
import com.sm_oss.NoYakZone.model.Patter;
import com.sm_oss.NoYakZone.repository.BoardRepository;
import com.sm_oss.NoYakZone.repository.PatterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Comparator;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/prompt")
public class PromptController {

    @Autowired
    private BoardRepository boardRepository;

    @Autowired
    private PatterRepository patterRepository;

    @GetMapping("/searchPatterByWord")//은어 검색
    public ResponseEntity<List<Patter>> searchPatterByWord(@RequestParam("word") String word) {
        List<Patter> patterns = patterRepository.findByWordContaining(word);
        return ResponseEntity.ok(patterns);
    }

    @GetMapping("/searchBoardsByDate")
    public ResponseEntity<List<Board>> searchBoardsByDate(@RequestParam("date") LocalDateTime date) {
        List<Board> boards = boardRepository.findByDate(date);
        return ResponseEntity.ok(boards);
    }

    @GetMapping("/searchBoardsByUserId")//딜러 검색
    public ResponseEntity<List<Board>> searchBoardsByUserId(@RequestParam("userId") String userId) {
        List<Board> boards = boardRepository.findById(userId);
        if (boards.size() > 5) {
            boards = boards.stream()
                    .sorted(Comparator.comparing(Board::getDate).reversed())
                    .limit(5)
                    .collect(Collectors.toList());
        }
        return ResponseEntity.ok(boards);
    }

    @GetMapping("/searchBoardsByText")//게시글 검색
    public ResponseEntity<List<Board>> searchBoardsByText(@RequestParam("text") String text) {
        List<Board> boards = boardRepository.findByTextContaining(text);
        if (boards.size() > 5) {
            boards = boards.stream()
                    .sorted(Comparator.comparing(Board::getDate).reversed())
                    .limit(5)
                    .collect(Collectors.toList());
        }
        return ResponseEntity.ok(boards);
    }
}
