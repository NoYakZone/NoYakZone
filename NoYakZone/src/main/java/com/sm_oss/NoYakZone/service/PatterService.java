package com.sm_oss.NoYakZone.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.sm_oss.NoYakZone.model.Patter;
import com.sm_oss.NoYakZone.repository.PatterRepository;
import java.util.List;

@Service
public class PatterService {

    @Autowired
    private PatterRepository patterRepository;

    public Patter createPatter(Patter patterDto) {
        return patterRepository.save(patterDto);
    }

    public Patter getPatterById(int id) {
        return patterRepository.findById(id).orElseThrow(() -> new RuntimeException("Patter not found"));
    }

    public List<Patter> getAllPatters() {
        return patterRepository.findAll();
    }

    public Patter updatePatter(int id, Patter patterDto) {
        Patter existingPatter = getPatterById(id);
        existingPatter.setWord(patterDto.getWord());
        existingPatter.setDetail(patterDto.getDetail());
        existingPatter.setCount(patterDto.getCount());
        return patterRepository.save(existingPatter);
    }

    public void deletePatter(int id) {
        patterRepository.deleteById(id);
    }
}