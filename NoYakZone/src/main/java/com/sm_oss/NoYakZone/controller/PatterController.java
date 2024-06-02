package com.sm_oss.NoYakZone.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.sm_oss.NoYakZone.model.PatterDto;
import com.sm_oss.NoYakZone.service.PatterService;
import java.util.List;

@RestController
@RequestMapping("/patter")
public class PatterController {

    @Autowired
    private PatterService patterService;

    @PostMapping
    public ResponseEntity<String> createPatter(@RequestBody PatterDto patterDto) {
        try {
            PatterDto created = patterService.createPatter(patterDto);
            return ResponseEntity.ok("정상적으로 등록되었습니다.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("등록에 실패했습니다: " + e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getPatterById(@PathVariable int id) {
        try {
            PatterDto patter = patterService.getPatterById(id);
            return ResponseEntity.ok(patter);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("데이터를 찾을 수 없습니다: " + e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<List<PatterDto>> getAllPatters() {
        try {
            List<PatterDto> patters = patterService.getAllPatters();
            return ResponseEntity.ok(patters);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updatePatter(@PathVariable int id, @RequestBody PatterDto patterDto) {
        try {
            PatterDto updated = patterService.updatePatter(id, patterDto);
            return ResponseEntity.ok("업데이트 성공");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("업데이트 실패: " + e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deletePatter(@PathVariable int id) {
        try {
            patterService.deletePatter(id);
            return ResponseEntity.ok("삭제 성공");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("삭제 실패: " + e.getMessage());
        }
    }
}
