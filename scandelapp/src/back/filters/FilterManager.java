package back.filters;

import java.util.ArrayList;
import java.util.Currency;
import java.util.List;

public class FilterManager {
    private List<FilterI> filters;
    private FilterI activeFilter;

    public FilterManager() {
        this.filters = new ArrayList<>();
        this.activeFilter = null;

        this.createFilters();
    }

    public void addFilter(FilterI filter) {
        filters.add(filter);
    }

    public void setActiveFilter(FilterI filter) {
        if (filters.contains(filter)) {
            activeFilter = filter;

            for (FilterI currentFilter : filters) {
                if (currentFilter.getFilterType() != filter.getFilterType())
                    currentFilter.resetFilter();
                else
                    currentFilter.enableFilter();
            }

        } else {
            System.out.println("Could not find the filter");
        }
    }

    public void applyActiveFilter() {
        if (activeFilter != null) {
            activeFilter.applyFilter();
        }
    }

    public void resetActiveFilter() {
        System.out.println("Resetting Filter. . .");
        if (activeFilter != null) {
            activeFilter.resetFilter();
        }
    }

    public List<FilterI> getFilters() {
        return filters;
    }

    public FilterI getFilterByType(FilterType filterType) {
        for (int i = 0; i < filters.size(); i++) {
            if (filters.get(i).getFilterType() == filterType)
                return filters.get(i);
        }
        return null;
    }

    public FilterI getActiveFilter() {
        return activeFilter;
    }

    public void createFilters() {
        this.addFilter(FilterFactory.createFilter(FilterType.PIN));
        this.addFilter(FilterFactory.createFilter(FilterType.ZONE));
        this.addFilter(FilterFactory.createFilter(FilterType.COLOR));
        this.addFilter(FilterFactory.createFilter(FilterType.LIGHT));
        this.addFilter(FilterFactory.createFilter(FilterType.TRAFIC));
        this.addFilter(FilterFactory.createFilter(FilterType.CABINET));
    }
}
