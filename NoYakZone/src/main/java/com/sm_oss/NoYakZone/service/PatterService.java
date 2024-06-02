package com.sm_oss.NoYakZone.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.sm_oss.NoYakZone.model.PatterDto;
import com.sm_oss.NoYakZone.repository.PatterRepository;
import java.util.List;

@Service
public class PatterService {

    @Autowired
    private PatterRepository patterRepository;

    public PatterDto createPatter(PatterDto patterDto) {
        return patterRepository.save(patterDto);
    }

    public PatterDto getPatterById(int id) {
        return patterRepository.findById(id).orElseThrow(() -> new RuntimeException("Patter not found"));
    }

    public List<PatterDto> getAllPatters() {
        return patterRepository.findAll();
    }

    public PatterDto updatePatter(int id, PatterDto patterDto) {
        PatterDto existingPatter = getPatterById(id);
        existingPatter.setWord(patterDto.getWord());
        existingPatter.setDetail(patterDto.getDetail());
        existingPatter.setCount(patterDto.getCount());
        return patterRepository.save(existingPatter);
    }

    public void deletePatter(int id) {
        patterRepository.deleteById(id);
    }
}
