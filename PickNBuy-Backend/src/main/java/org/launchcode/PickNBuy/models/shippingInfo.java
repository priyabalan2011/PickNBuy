package org.launchcode.PickNBuy.models;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.validation.constraints.NotNull;

@Entity
public class shippingInfo extends AbstractEntity  {

    @NotNull
    private String address;
    @NotNull
    private String country;
    @NotNull
    private String city;
    @NotNull
    private String phoneNo;
    @NotNull
    private String postalCode;

    @ManyToOne
    @NotNull
    @JoinColumn(name="user_id")
    private userModel user;

    //@OneToOne
    @NotNull
   // @JoinColumn(name="order_id")
    @OneToOne(mappedBy = "shippinginfo")
    private Orders order;

    public shippingInfo(String address, String country, String city, String phoneNo, String postalCode, userModel user) {
        this.address = address;
        this.country = country;
        this.city = city;
        this.phoneNo = phoneNo;
        this.postalCode = postalCode;
        this.user = user;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getPhoneNo() {
        return phoneNo;
    }

    public void setPhoneNo(String phoneNo) {
        this.phoneNo = phoneNo;
    }

    public String getPostalCode() {
        return postalCode;
    }

    public void setPostalCode(String postalCode) {
        this.postalCode = postalCode;
    }

    public userModel getUser() {
        return user;
    }

    public void setUser(userModel user) {
        this.user = user;
    }
}
