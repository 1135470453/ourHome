package springbootPackage.repository;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;
import springbootPackage.entity.Web;

import java.util.List;

@Mapper
public interface WebRepository {
    public List<Web> getWeb();
}
