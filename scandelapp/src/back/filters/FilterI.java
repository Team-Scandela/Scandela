package back.filters;

public interface FilterI {
    void applyFilter(); //apply current filter state (active or inactive)
    void resetFilter(); //Deactivate filter and resets it's original state
    void enableFilter(); //enable the filter to be active
    FilterType getFilterType(); // returns filter type
    String getFilterName(); // returns filter name
    boolean isActive(); // returns filter state
}
