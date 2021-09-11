package springbootPackage.repository;

import org.springframework.stereotype.Repository;
import springbootPackage.entity.Web;

import java.util.List;

@Repository
public interface WebRepository {
    public List<Web> getWeb();
}
