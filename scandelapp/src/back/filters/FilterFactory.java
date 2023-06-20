package back.filters;

public class FilterFactory {

    public static FilterI createFilter(FilterType filterType) {
        switch (filterType) {
            case PIN:
                return new FilterPin();
            case ZONE:
                return new FilterZone();
            case COLOR:
                return new FilterColor();
            case LIGHT:
                return new FilterLight();
            case TRAFIC:
                return new FilterTrafic();
            case CABINET:
                return new FilterCabinet();
            default:
                throw new IllegalArgumentException("Type de filtre non existant : " + filterType);
        }
    }
}
