package it.uniroma3.controller;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 * Created by poldo on 02/06/17.
 */
@Controller
@RequestMapping("/")
public class IndexController {
    private static final Logger logger = Logger.getLogger(IndexController.class);

    @RequestMapping(method = RequestMethod.GET)
    public String getIndexPage() {
        logger.info("Requested index page");
        return "index";
    }

}