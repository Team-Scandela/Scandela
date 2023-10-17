package com.scandela.server.service;

import com.scandela.server.entity.User;

public interface ILoginService extends IService<User> {
    // Methods \\
		// Public \\
    public User checkLoginDetails(User loginDetails);
}
