package com.sm_oss.NoYakZone.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.sm_oss.NoYakZone.model.ReportDto;
import com.sm_oss.NoYakZone.repository.ReportRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ReportService {

    @Autowired
    private ReportRepository reportRepository;

    public ReportDto createReport(ReportDto reportDto) {
        reportDto.setDate(LocalDateTime.now());
        return reportRepository.save(reportDto);
    }

    public ReportDto getReportById(int id) {
        Optional<ReportDto> report = reportRepository.findById(id);
        return report.orElse(null);
    }

    public List<ReportDto> getAllReports() {
        return reportRepository.findAll();
    }

    public ReportDto updateReport(int id, ReportDto reportDto) {
        Optional<ReportDto> existingReport = reportRepository.findById(id);
        if (existingReport.isPresent()) {
            ReportDto updatedReport = existingReport.get();
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
