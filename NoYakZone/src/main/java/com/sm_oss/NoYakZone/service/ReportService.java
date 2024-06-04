package com.sm_oss.NoYakZone.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.sm_oss.NoYakZone.model.Report;
import com.sm_oss.NoYakZone.repository.ReportRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ReportService {

    @Autowired
    private ReportRepository reportRepository;

    public Report createReport(Report reportDto) {
        reportDto.setDate(LocalDateTime.now());
        return reportRepository.save(reportDto);
    }

    public Report getReportById(int id) {
        Optional<Report> report = reportRepository.findById(id);
        return report.orElse(null);
    }

    public List<Report> getAllReports() {
        return reportRepository.findAll();
    }

    public Report updateReport(int id, Report reportDto) {
        Optional<Report> existingReport = reportRepository.findById(id);
        if (existingReport.isPresent()) {
            Report updatedReport = existingReport.get();
            updatedReport.setUserId(reportDto.getUserId());
            updatedReport.setTitle(reportDto.getTitle());
            updatedReport.setText(reportDto.getText());
            updatedReport.setLink(reportDto.getLink());
            updatedReport.setPicture(reportDto.getPicture());
            return reportRepository.save(updatedReport);
        } else {
            return null;
        }
    }

    public void deleteReport(int id) {
        reportRepository.deleteById(id);
    }
}