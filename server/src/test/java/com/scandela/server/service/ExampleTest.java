import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;

import com.scandela.server.dao.BulbDao;
import com.scandela.server.dao.CabinetDao;
import com.scandela.server.dao.LampDao;
import com.scandela.server.dao.LampShadeDao;
import com.scandela.server.dao.StreetDao;
import com.scandela.server.dao.TownDao;
import com.scandela.server.dao.WhileAwayDao;
import com.scandela.server.entity.Bulb;
import com.scandela.server.entity.Cabinet;
import com.scandela.server.entity.Lamp;
import com.scandela.server.entity.LampShade;
import com.scandela.server.entity.Street;
import com.scandela.server.entity.Town;
import com.scandela.server.exception.LampException;
import com.scandela.server.service.implementation.LampService;

import java.time.LocalTime;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;

@RunWith(MockitoJUnitRunner.class)
public class ExampleTest {

    /* Les Mocks sont les objets de classe du projet utilisés pour construire les test */

    @InjectMocks
    private LampService testedObject;

    @Mock
    private LampDao lampDaoMock;

    @Mock
    private TownDao townDaoMock;

    @Mock
    private StreetDao streetDaoMock;

    @Mock
    private BulbDao bulbDaoMock;

    @Mock
    private CabinetDao cabinetDaoMock;

    @Mock
    private LampShadeDao lampShadeDaoMock;

    @Mock
    private WhileAwayDao whileAwayDaoMock;



    /* L'objet testé: ici "Lamp" via "LampService" est initialisé */

    private final UUID id = UUID.randomUUID();
    private final double latitude = 17.11;
    private final double longitude = 17.17;
    private final double height = 5.01;
    private final LocalTime lightOn = LocalTime.now();
    private final LocalTime lightOff = LocalTime.now().plusHours(4);
    private final Town town = Town.builder().id(id).build();
    private final Street street = Street.builder().id(id).build();
    private final Bulb bulb = Bulb.builder().id(id).build();
    private final Cabinet cabinet = Cabinet.builder().id(id).build();
    private final LampShade lampShade = LampShade.builder().id(id).build();
    private final String moreInformations = "test";
    private final Lamp lamp = Lamp.builder()
            .id(id)
            .bulb(bulb)
            .town(town)
            .street(street)
            .cabinet(cabinet)
            .lampShade(lampShade)
            .latitude(latitude)
            .longitude(longitude)
            .lightOff(lightOff)
            .lightOn(lightOn)
            .height(height)
            .moreInformations(moreInformations)
            .build();



    /* Les foncitons de test sont ensuite construites suivant la logique des fonctions existante.
     * 
     * Dans le cas ci-dessous, on test la récupération d'un lampadaire
     * en executant la fonction puis en vérifiant que les champs du lampadaire retourné
     * sont les mêmes que celles de notre objet.
     * 
     */

    @Test
    public void testGetAll() {
        when(lampDaoMock.findAll()).thenReturn(Arrays.asList(lamp));

        List<Lamp> result = testedObject.getAll();

        verify(lampDaoMock, times(1)).findAll();
        assertThat(result).hasSize(1);
        Lamp resultedLamp = result.get(0);
        assertThat(resultedLamp.getId()).isEqualTo(lamp.getId());
		assertThat(resultedLamp.getBulb()).isEqualTo(lamp.getBulb());
		assertThat(resultedLamp.getTown()).isEqualTo(lamp.getTown());
		assertThat(resultedLamp.getStreet()).isEqualTo(lamp.getStreet());
		assertThat(resultedLamp.getCabinet()).isEqualTo(lamp.getCabinet());
		assertThat(resultedLamp.getLampShade()).isEqualTo(lamp.getLampShade());
		assertThat(resultedLamp.getLatitude()).isEqualTo(lamp.getLatitude());
		assertThat(resultedLamp.getLongitude()).isEqualTo(lamp.getLongitude());
		assertThat(resultedLamp.getLightOff()).isEqualTo(lamp.getLightOff());
		assertThat(resultedLamp.getLightOn()).isEqualTo(lamp.getLightOn());
		assertThat(resultedLamp.getMoreInformations()).isEqualTo(lamp.getMoreInformations());
    }

    @Test
    public void testGetAll_whenManyLamps_thenReturnManyLamps() {
        Lamp lamp2 = Lamp.builder()
                .id(UUID.randomUUID())
                .bulb(bulb)
                .town(town)
                .street(street)
                .cabinet(cabinet)
                .lampShade(lampShade)
                .latitude(latitude)
                .longitude(longitude)
                .lightOff(lightOff)
                .lightOn(lightOn)
                .height(height)
                .moreInformations(moreInformations)
                .build();

        when(lampDaoMock.findAll()).thenReturn(Arrays.asList(lamp, lamp2));

        List<Lamp> result = testedObject.getAll();

        verify(lampDaoMock, times(1)).findAll();
        assertThat(result).hasSize(2);
    }

    @Test
    public void testGetAll_whenNoLamp_thenReturnEmptyList() {
        when(lampDaoMock.findAll()).thenReturn(Arrays.asList());

        List<Lamp> result = testedObject.getAll();

        verify(lampDaoMock, times(1)).findAll();
        assertThat(result).isEmpty();
    }

    @Test
    public void testGet() {
        when(lampDaoMock.findById(id)).thenReturn(Optional.of(lamp));

        Lamp result = testedObject.get(id);

        verify(lampDaoMock, times(1)).findById(id);
        assertThat(result.getId()).isEqualTo(lamp.getId());
		assertThat(result.getBulb()).isEqualTo(lamp.getBulb());
		assertThat(result.getTown()).isEqualTo(lamp.getTown());
		assertThat(result.getStreet()).isEqualTo(lamp.getStreet());
		assertThat(result.getCabinet()).isEqualTo(lamp.getCabinet());
		assertThat(result.getLampShade()).isEqualTo(lamp.getLampShade());
		assertThat(result.getLatitude()).isEqualTo(lamp.getLatitude());
		assertThat(result.getLongitude()).isEqualTo(lamp.getLongitude());
		assertThat(result.getLightOff()).isEqualTo(lamp.getLightOff());
		assertThat(result.getLightOn()).isEqualTo(lamp.getLightOn());
		assertThat(result.getMoreInformations()).isEqualTo(lamp.getMoreInformations());
    }

    @Test
    public void testCreate() throws LampException {
        when(lampDaoMock.save(Mockito.any(Lamp.class))).thenReturn(lamp);
        when(townDaoMock.findById(Mockito.any())).thenReturn(Optional.ofNullable(town));
        when(streetDaoMock.findById(Mockito.any())).thenReturn(Optional.ofNullable(street));
        when(bulbDaoMock.findById(Mockito.any())).thenReturn(Optional.ofNullable(bulb));
        when(cabinetDaoMock.findById(Mockito.any())).thenReturn(Optional.ofNullable(cabinet));
        when(lampShadeDaoMock.findById(Mockito.any())).thenReturn(Optional.ofNullable(lampShade));

        Lamp result = testedObject.create(lamp);

        verify(lampDaoMock, times(1)).save(Mockito.any(Lamp.class));
		verify(townDaoMock, times(1)).findById(Mockito.any());
		verify(streetDaoMock, times(1)).findById(Mockito.any());
		verify(bulbDaoMock, times(1)).findById(Mockito.any());
		assertThat(result.getId()).isEqualTo(lamp.getId());
		assertThat(result.getBulb()).isEqualTo(lamp.getBulb());
		assertThat(result.getTown()).isEqualTo(lamp.getTown());
		assertThat(result.getStreet()).isEqualTo(lamp.getStreet());
		assertThat(result.getCabinet()).isEqualTo(lamp.getCabinet());
		assertThat(result.getLampShade()).isEqualTo(lamp.getLampShade());
		assertThat(result.getLatitude()).isEqualTo(lamp.getLatitude());
		assertThat(result.getLongitude()).isEqualTo(lamp.getLongitude());
		assertThat(result.getLightOff()).isEqualTo(lamp.getLightOff());
		assertThat(result.getLightOn()).isEqualTo(lamp.getLightOn());
		assertThat(result.getMoreInformations()).isEqualTo(lamp.getMoreInformations());
    }
}
