package org.launchcode.PickNBuy.controllers;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller("/")
@ResponseBody
public class userController {
    public String Hello()
    {
        return "index";
    }
}
