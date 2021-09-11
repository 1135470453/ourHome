package springbootPackage.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import springbootPackage.entity.Web;
import springbootPackage.repository.WebRepository;
import springbootPackage.service.WebService;

import java.util.List;

@Service
public class WebServiceImp implements WebService {

    @Autowired
    private WebRepository webRepository;

    @Override
    public List<Web> getWeb() {
        return webRepository.getWeb();
    }
}
