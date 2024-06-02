package com.sm_oss.NoYakZone.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.sm_oss.NoYakZone.model.ReportDto;
import com.sm_oss.NoYakZone.service.ReportService;
import java.util.List;

@RestController
@RequestMapping("/report")
public class ReportController {

    @Autowired
    private ReportService reportService;

    @PostMapping
    public ResponseEntity<?> createReport(@RequestBody ReportDto reportDto) {
        try {
            ReportDto createdReport = reportService.createReport(reportDto);
            return ResponseEntity.ok(createdReport);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("실패: " + e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getReportById(@PathVariable int id) {
        try {
            ReportDto report = reportService.getReportById(id);
            if (report != null) {
                return ResponseEntity.ok(report);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("조회 실패: " + e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<List<ReportDto>> getAllReports() {
        try {
            List<ReportDto> reports = reportService.getAllReports();
            return ResponseEntity.ok(reports);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateReport(@PathVariable int id, @RequestBody ReportDto reportDto) {
        try {
            ReportDto updatedReport = reportService.updateReport(id, reportDto);
            if (updatedReport != null) {
                return ResponseEntity.ok(updatedReport);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("수정 실패: " + e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteReport(@PathVariable int id) {
        try {
            reportService.deleteReport(id);
            return ResponseEntity.ok().body("삭제 성공");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("삭제 실패: " + e.getMessage());
        }
    }
}
