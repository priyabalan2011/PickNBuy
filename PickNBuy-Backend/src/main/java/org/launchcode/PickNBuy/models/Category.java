package org.launchcode.PickNBuy.models;

public enum Category {
    ELECTRONICS("Electronics"),
    MOBILEPHONES("Mobile Phones"),
            LAPTOPS("Laptops"),
           ACCESSORIES( "Accessories"),
            HEADPHONES("Headphones"),
            FOOD("Food"),
            BOOKS("Books"),
            CLOTHESORSHOES("Clothes/Shoes"),
            BEAUTYORHEALTH("Beauty/Health"),
            SPORTS("Sports"),
            OUTDOOR("Outdoor"),
            HOME("Home");
    private final String category;

    Category(String category) {
        this.category = category;
    }

    public String getCategory() {
        return category;
    }
}
