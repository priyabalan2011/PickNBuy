package org.launchcode.PickNBuy.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

@Embeddable
public class shippingInfo  {

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
    @NotNull
    private String state;
//    @NotNull
//    private String name;



//    @ManyToOne
//    @NotNull
//    @JoinColumn(name="user_id")
//    private userModel user;

    //@OneToOne
//    @NotNull
//   // @JoinColumn(name="order_id")
//    @OneToOne(mappedBy = "shippinginfo")
//    private Orders order;
    public shippingInfo(){}
    public shippingInfo(String address, String country, String city, String phoneNo, String postalCode,String state) {
        this.address = address;
        this.country = country;
        this.city = city;
        this.phoneNo = phoneNo;
        this.postalCode = postalCode;
        this.state=state;
//        this.user = user;
//        this.name=name;
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

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
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


}
