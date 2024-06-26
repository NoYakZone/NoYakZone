package com.sm_oss.NoYakZone.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.sm_oss.NoYakZone.model.Board;
import com.sm_oss.NoYakZone.service.BoardService;

import java.util.List;

@RestController
@RequestMapping("/board")
@CrossOrigin(origins = "http://localhost:3000")
public class BoardController {

    @Autowired
    private BoardService boardService;

    @PostMapping
    public ResponseEntity<?> createBoard(@RequestBody Board BoardDto) {
        try {
            Board createdBoard = boardService.createBoard(BoardDto);
            return ResponseEntity.ok(createdBoard);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("실패: " + e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getBoardById(@PathVariable int id) {
        try {
            Board BoardDto = boardService.getBoardById(id);
            if (BoardDto != null) {
                return ResponseEntity.ok(BoardDto);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("조회 실패: " + e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<List<Board>> getAllBoards() {
        try {
            List<Board> boards = boardService.getAllBoards();
            return ResponseEntity.ok(boards);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateBoard(@PathVariable int id, @RequestBody Board BoardDto) {
        try {
            Board updatedBoard = boardService.updateBoard(id, BoardDto);
            if (updatedBoard != null) {
                return ResponseEntity.ok(updatedBoard);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("수정 실패: " + e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteBoard(@PathVariable int id) {
        try {
            boardService.deleteBoard(id);
            return ResponseEntity.ok().body("삭제 성공");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("삭제 실패: " + e.getMessage());
        }
    }
}