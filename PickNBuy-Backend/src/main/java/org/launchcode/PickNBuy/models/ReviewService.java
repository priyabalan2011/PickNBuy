package org.launchcode.PickNBuy.models;

import org.launchcode.PickNBuy.data.ProductRepository;
import org.launchcode.PickNBuy.data.ReviewRepository;
import org.launchcode.PickNBuy.data.userModelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ReviewService {
    @Autowired
    private ProductRepository productRepo;
    @Autowired
    private ReviewRepository reviewRepo;
    @Autowired
    private userModelRepository userRepo;

    public void createOrUpdateReview(int userId, int productId, String rating, String comment) {
        Product product = productRepo.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));
        userModel user = userRepo.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));

        Optional<Reviews> existingReview = reviewRepo.findByProductIdAndUserId(productId, userId);

        if (existingReview.isPresent()) {
            Reviews review = existingReview.get();
            review.setRating(rating);
            review.setComment(comment);
            reviewRepo.save(review);
        } else {
            Reviews review = new Reviews();
            review.setRating(rating);
            review.setComment(comment);
            review.setUser(user);
            review.setProduct(product);
            reviewRepo.save(review);
           // product.getReviews().add(review);
        }

        updateProductRatings(product);
       // productRepo.save(product);
    }

    public List<Reviews> getReviewsByProduct(int productId) {
        return reviewRepo.findByProductId(productId);
    }

    public void deleteReview(int productId, int reviewId) {
        Product product = productRepo.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        Reviews review = reviewRepo.findById(reviewId)
                .orElseThrow(() -> new RuntimeException("Review not found"));

        product.getReviews().remove(review);
        reviewRepo.delete(review);

        updateProductRatings(product);
        productRepo.save(product);
    }

    private void updateProductRatings(Product product) {
        List<Reviews> reviews = product.getReviews();
        int numOfReviews = reviews.size();
        product.setNumOfReviews(numOfReviews);

        double avgRating = reviews.stream()
                .map(Reviews::getRating)              // get the rating as String
                .mapToDouble(r -> {
                    try {
                        return Double.parseDouble(r);
                    } catch (NumberFormatException e) {
                        return 0.0; // or handle it as you see fit
                    }
                })
                .average()
                .orElse(0.0);

        product.setRatings(String.valueOf(avgRating));
        productRepo.save(product);
    }


}
