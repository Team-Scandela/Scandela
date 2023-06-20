package com.scandela.server.service.implementation;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

import org.springframework.stereotype.Service;

import com.scandela.server.entity.dto.ServerDto;
import com.scandela.server.service.AbstractService;
import com.scandela.server.service.IServerService;

@Service
public class ServerService extends AbstractService implements IServerService {

	@Override
	public ServerDto getServerInformations() {
		List<String> team = new ArrayList<>();
		team.add("DESCHANELS Titouan");
		team.add("BONATO Enzo");
		team.add("LAURENT Enzo");
		team.add("BROSSAUD Ismael");
		team.add("SAVIC Keon");
		team.add("VERAIN Marvin");
		team.add("ALAIMI Nassim");
		team.add("HARRI-CHAL Victor");
		team.sort(Comparator.naturalOrder());

		ServerDto serverDto = ServerDto.builder().name("API Scandela").team(team).build();

		return serverDto;
	}

}
