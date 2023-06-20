package back.filters;

public abstract class FilterA implements FilterI {

    private boolean isActive;
    private FilterType filterType;

    public FilterA(FilterType filterType) {
        this.isActive = true;
        this.filterType = filterType;
        System.out.println("Created filter: " + this.filterType);
    }

    @Override
    public boolean isActive() {
        return isActive;
    }
    
    public void setActive(boolean active) {
        isActive = active;
    }

    @Override
    public FilterType getFilterType() {
        return filterType;
    }
    
    @Override
    public String getFilterName() {
        switch (this.filterType) {
            case CABINET:
                return "Cabinet";
            case COLOR:
                return "Color";
            case LIGHT:
                return "Light";
            case PIN:
                return "Pin";
            case TRAFIC:
                return "Trafic";
            case ZONE:
                return "Zone";

            default:
                break;
        };
        return null;
    }

    @Override
    public void applyFilter() {
        setActive(isActive());
    }

    @Override
    public void resetFilter() {
        setActive(false);
    }

    @Override
    public void enableFilter() {
        setActive(true);
    }

}
