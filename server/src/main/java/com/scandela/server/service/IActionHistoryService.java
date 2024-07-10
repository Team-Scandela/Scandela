package com.scandela.server.service;

import java.util.List;

import com.scandela.server.entity.UserAction;

public interface IActionHistoryService extends IService<UserAction> {
    public List<UserAction> create(List<UserAction> newUserAction) throws Exception;
}
