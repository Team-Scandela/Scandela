package com.scandela.server.service.implementation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import com.scandela.server.dao.IUserDao;
import com.scandela.server.dao.criteria.UserCriteria;
import com.scandela.server.entity.Login;
import com.scandela.server.entity.dto.LoginDto;
import com.scandela.server.service.AbstractService;
import com.scandela.server.service.ILoginService;

@Service
public class LoginService extends AbstractService implements ILoginService {


    /*  TODO : Utiliser un UserDao et un User pour se 'lier a la table 'user' et récupérer l'email + password (password après)
        Checker email == email et password == password
        Enfin, créer le JWT et l'envoyer en réponse au client
    */


    @Autowired
	private IUserDao userDao;

    @Override
    public LoginDto checkLoginDetails(Login loginDetails) {
        if (loginDetails.getEmail() == null || loginDetails.getPassword() == null) {
            return null;
        }
    }
}
