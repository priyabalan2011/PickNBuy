package org.launchcode.PickNBuy.controllers;

import org.launchcode.PickNBuy.models.ReviewDto;
import org.launchcode.PickNBuy.models.ReviewService;
import org.launchcode.PickNBuy.models.Reviews;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/review")
@CrossOrigin(origins ="*")
public class ReviewController {
    @Autowired
    private ReviewService reviewService;

    //@PostMapping("/new")
    @PostMapping(
    value = "/new",
    consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> createReview(@ModelAttribute ReviewDto dto) {
        reviewService.createOrUpdateReview(dto.getUserId(), dto.getProductId(), dto.getRating(), dto.getComment());
        return ResponseEntity.ok(Map.of("success", true));
    }

    @GetMapping("/all")
    public ResponseEntity<?> getReviews(@RequestParam int id) {
        List<Reviews> reviews = reviewService.getReviewsByProduct(id);
        return ResponseEntity.ok(Map.of("success", true, "reviews", reviews));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteReview(@RequestParam int productId, @RequestParam int id) {
        reviewService.deleteReview(productId, id);
        return ResponseEntity.ok(Map.of("success", true));
    }
}
