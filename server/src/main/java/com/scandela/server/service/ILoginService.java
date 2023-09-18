package com.scandela.server.service;

import com.scandela.server.entity.Login;
import com.scandela.server.entity.dto.UserDto;

public interface ILoginService {
    // Methods \\
		// Public \\
    public UserDto checkLoginDetails(Login loginDetails);
}
