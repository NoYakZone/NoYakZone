package com.sm_oss.NoYakZone.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import java.net.URLDecoder;
import java.util.Base64;

import com.sm_oss.NoYakZone.service.S3ImageService;

@RestController
public class S3ImageController {

    @Autowired
    private S3ImageService s3ImageService;

    @PostMapping("/uploadImage")
    public ResponseEntity<String> uploadImage(@RequestParam("image") MultipartFile imageFile,
            @RequestParam("bucketName") String bucketName,
            @RequestParam("key") String key) {
        try {
            // 이미지 업로드
            String imageUrl = s3ImageService.upload(imageFile);
            // 이미지 URL에서 이미지의 이름 추출
            String imageName = getImageNameFromUrl(imageUrl);
            // 이미지 URL과 이미지의 이름을 함께 반환
            return ResponseEntity
                    .ok("Image uploaded successfully. Image URL: " + imageUrl + ", Image Name: " + imageName);
        } catch (RuntimeException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to upload image.");
        }
    }

    @GetMapping("/getImage/{imageName}")
    public ResponseEntity<String> getImage(@PathVariable String imageName) {
        try {
            // S3ImageService를 사용하여 이미지를 가져옴
            byte[] imageData = s3ImageService.getImage(imageName);

            // 이미지 데이터를 Base64 인코딩하여 HTML 응답에 포함
            String imageBase64 = Base64.getEncoder().encodeToString(imageData);
            String imageHtml = "<img src=\"data:image/jpeg;base64," + imageBase64 + "\"/>";

            // HTML 응답 반환
            return ResponseEntity.ok().body(imageHtml);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/getImageName")
    public ResponseEntity<String> getImageName(@RequestParam("imageUrl") String imageUrl) {
        try {
            // 이미지 URL에서 이미지의 이름을 추출하여 반환
            String imageName = getImageNameFromUrl(imageUrl);
            return ResponseEntity.ok().body(imageName);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    // 이미지 URL에서 이미지의 이름을 추출하는 메서드
    private String getImageNameFromUrl(String imageUrl) {
        try {
            java.net.URL url = new java.net.URL(imageUrl);
            String decodingKey = URLDecoder.decode(url.getPath(), "UTF-8");
            return decodingKey.substring(1); // 맨 앞의 '/' 제거
        } catch (Exception e) {
            throw new RuntimeException("Failed to extract image name from URL");
        }
    }
}
