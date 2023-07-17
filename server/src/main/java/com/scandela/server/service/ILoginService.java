package com.scandela.server.service;

import com.scandela.server.entity.Login;
import com.scandela.server.entity.dto.LoginDto;

public interface ILoginService {
    // Methods \\
		// Public \\
    public LoginDto checkLoginDetails(Login loginDetails);
}
