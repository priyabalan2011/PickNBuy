package org.launchcode.PickNBuy.models;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.persistence.Embedded;

@Embeddable
public class paymentInfo {
    @Column(nullable = false)
    private String pid;

    @Column(nullable = false)
    private String status;

    public paymentInfo(){}

    public paymentInfo(String pid, String status) {
        this.pid = pid;
        this.status = status;
    }

    public String getPid() {
        return pid;
    }

    public void setPid(String pid) {
        this.pid = pid;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
