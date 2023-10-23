package com.scandela.server.service.implementation;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.List;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.scandela.server.dao.UserDao;
import com.scandela.server.dao.WhileAwayDao;
import com.scandela.server.entity.User;
import com.scandela.server.entity.WhileAway;
import com.scandela.server.service.AbstractService;
import com.scandela.server.service.ILoginService;
import com.scandela.server.entity.JwtGenerator;

@Service
public class LoginService extends AbstractService<User> implements ILoginService {

    private WhileAwayDao whileAwayDao;

    protected LoginService(UserDao userDao, WhileAwayDao whileAwayDao) {
        super(userDao);
        this.whileAwayDao = whileAwayDao;
    }

    private final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Override
    @Transactional(readOnly = true)
    public User checkLoginDetails(User loginDetails) {
        List<User> users = this.getAll();

        for (User user : users) {
            if ((user.getEmail() == loginDetails.getEmail())
                    && (passwordEncoder.matches("scan" + loginDetails.getPassword() + "dela", user.getPassword()))) {
                List<String> moreInfos = new ArrayList<>();

                try {

                    JwtGenerator generator = new JwtGenerator();

                    Map<String, String> claims = new HashMap<>();

                    claims.put("action", "read");

                    String token = generator.generateJwt(claims);
                    System.out.println(token);
                    moreInfos.add(token);

                    List<WhileAway> whileAways = whileAwayDao.findAll();

                    moreInfos.add(whileAways.toString());

                    whileAwayDao.deleteAll();

                    user.setMoreInformations(moreInfos);

                } catch (Exception e) {
                    e.printStackTrace();
                }

                return user;
            }
        }

        return null;
    }
}
