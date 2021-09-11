package springbootPackage.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import springbootPackage.entity.Web;
import springbootPackage.service.WebService;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;

@RestController
@RequestMapping("/web")
public class WebController {

    @Autowired
    private WebService webService;

    @RequestMapping("/getWeb")
    public List<Web> getWebList(HttpServletRequest request, HttpServletResponse response){
        return webService.getWeb();
    }
}
