package com.sm_oss.NoYakZone.controller;

import java.util.Arrays;
import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PageController {

    @GetMapping("/temp")
    public List<String> hello() {
        return Arrays.asList(); // RestController를 사용해서 JSON 형식으로 보내야함. 보통 리스트나 배열을 주로 사용
    }
}
