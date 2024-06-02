package com.sm_oss.NoYakZone.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.sm_oss.NoYakZone.model.BoardDto;
import com.sm_oss.NoYakZone.service.BoardService;

import java.util.List;

@RestController
@RequestMapping("/board")
public class BoardController {

    @Autowired
    private BoardService boardService;

    @PostMapping
    public ResponseEntity<?> createBoard(@RequestBody BoardDto BoardDto) {
        try {
            BoardDto createdBoard = boardService.createBoard(BoardDto);
            return ResponseEntity.ok(createdBoard);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("실패: " + e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getBoardById(@PathVariable int id) {
        try {
            BoardDto BoardDto = boardService.getBoardById(id);
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
    public ResponseEntity<List<BoardDto>> getAllBoards() {
        try {
            List<BoardDto> boards = boardService.getAllBoards();
            return ResponseEntity.ok(boards);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateBoard(@PathVariable int id, @RequestBody BoardDto BoardDto) {
        try {
            BoardDto updatedBoard = boardService.updateBoard(id, BoardDto);
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
