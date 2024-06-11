package com.sm_oss.NoYakZone.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import java.net.URLDecoder;
import java.util.Base64;

import com.sm_oss.NoYakZone.service.S3ImageService;

@RestController
@RequestMapping("/image")
@CrossOrigin(origins = "http://localhost:3000")
public class S3ImageController {

    @Autowired
    private S3ImageService s3ImageService;

    @PostMapping("/uploadImage")
    public ResponseEntity<String> uploadImage(@RequestParam("image") MultipartFile imageFile,
            @RequestParam("bucketName") String bucketName,
            @RequestParam("key") String key) {
        try {
            String imageUrl = s3ImageService.upload(imageFile);
            String imageName = getImageNameFromUrl(imageUrl);
            return ResponseEntity
                    .ok("이미지 업로드 성공 Image URL: " + imageUrl + ", Image Name: " + imageName);
        } catch (RuntimeException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("이미지 업로드 실패");
        }
    }

    @GetMapping("/getImage/{imageName}")
    public ResponseEntity<String> getImage(@PathVariable String imageName) {
        try {
            byte[] imageData = s3ImageService.getImage(imageName);
            String imageBase64 = Base64.getEncoder().encodeToString(imageData);
            String imageHtml = "<img src=\"data:image/jpeg;base64," + imageBase64 + "\"/>";
            return ResponseEntity.ok().body(imageHtml);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/getImageName")
    public ResponseEntity<String> getImageName(@RequestParam("imageUrl") String imageUrl) {
        try {
            String imageName = getImageNameFromUrl(imageUrl);
            return ResponseEntity.ok().body(imageName);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    private String getImageNameFromUrl(String imageUrl) {
        try {
            java.net.URL url = new java.net.URL(imageUrl);
            String decodingKey = URLDecoder.decode(url.getPath(), "UTF-8");
            return decodingKey.substring(1);
        } catch (Exception e) {
            throw new RuntimeException("해당 URL에 이미지가 존재하지 않음");
        }
    }
}
