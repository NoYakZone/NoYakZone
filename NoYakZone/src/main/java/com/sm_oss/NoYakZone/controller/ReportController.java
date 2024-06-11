package com.sm_oss.NoYakZone.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import com.sm_oss.NoYakZone.model.Report;
import com.sm_oss.NoYakZone.service.ReportService;
import com.sm_oss.NoYakZone.service.S3ImageService;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/report")
public class ReportController {

    @Autowired
    private ReportService reportService;

    @Autowired
    private S3ImageService s3ImageService;

    @PostMapping
    public ResponseEntity<?> createReport(@RequestParam("userId") String userId,
                                          @RequestParam("title") String title,
                                          @RequestParam("text") String text,
                                          @RequestParam("link") String link,
                                          @RequestParam("picture") MultipartFile picture) {
        try {
            String imageUrl = s3ImageService.upload(picture);
            Report report = new Report();
            report.setUserId(userId);
            report.setTitle(title);
            report.setText(text);
            report.setLink(link);
            report.setPicture(imageUrl);
            Report createdReport = reportService.createReport(report);
            return ResponseEntity.ok(createdReport);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("실패: " + e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getReportById(@PathVariable int id) {
        try {
            Report report = reportService.getReportById(id);
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
    public ResponseEntity<List<Report>> getAllReports() {
        try {
            List<Report> reports = reportService.getAllReports();
            return ResponseEntity.ok(reports);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateReport(@PathVariable int id, @RequestBody Report reportDto) {
        try {
            Report updatedReport = reportService.updateReport(id, reportDto);
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
