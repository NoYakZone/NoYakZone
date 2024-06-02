package com.sm_oss.NoYakZone.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sm_oss.NoYakZone.model.ReportDto;

@Repository
public interface ReportRepository extends JpaRepository<ReportDto, Integer> {
}
