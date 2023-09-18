package com.scandela.server.service.implementation;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.scandela.server.dao.IUserDao;
import com.scandela.server.entity.Login;
import com.scandela.server.entity.User;
import com.scandela.server.entity.dto.UserDto;
import com.scandela.server.service.AbstractService;
import com.scandela.server.service.ILoginService;
import com.scandela.server.entity.JwtGenerator;

@Service
public class LoginService extends AbstractService implements ILoginService {


    @Autowired
	private IUserDao userDao;


    @Override
	@Transactional(readOnly = true)
	public UserDto checkLoginDetails(Login loginDetails) {
		List<User> users = userDao.getAll();

		for (User user : users) {
            if ((user.getEmail() == loginDetails.getEmail()) && (user.getPassword() == loginDetails.getPassword())) {
                List<String> moreInfos = new ArrayList<>();

                try {

                    JwtGenerator generator = new JwtGenerator();

                    Map<String, String> claims = new HashMap<>();

                    claims.put("action", "read");

                    String token = generator.generateJwt(claims);
                    System.out.println( token);
                    moreInfos.add(token);
                } catch (Exception e) {
                    e.printStackTrace();
                }


                UserDto.from(user).setMoreInfo(null);
                return UserDto.from(user);
            }
		}

        return null;
	}
}
