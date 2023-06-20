package back.filters;

public class Main {

    public static void main(String[] args) {
        // Create FilterManager instance
        FilterManager filterManager = new FilterManager();

        // Log different filters
        System.out.println("Filters created:");
        for (FilterI filter : filterManager.getFilters()) {
            System.out.println(filter.getFilterName());
        }

        // Set PIN as the active filter
        filterManager.setActiveFilter(filterManager.getFilterByType(FilterType.PIN));

        // Log the active filter and its state
        System.out.println("Active Filter: " + filterManager.getActiveFilter().getFilterName());
        System.out.println("Active Filter is active: " + filterManager.getActiveFilter().isActive());

        // Reset the active filter
        filterManager.resetActiveFilter();

        System.out.println("Active Filter is active after reset: " + filterManager.getActiveFilter().isActive());

        // Change active filter to COLOR
        filterManager.setActiveFilter(filterManager.getFilterByType(FilterType.COLOR));
        System.out.println("Active Filter: " + filterManager.getActiveFilter().getFilterName());

        System.out.println("Active Filter is active: " + filterManager.getActiveFilter().isActive());

        // Reset the active filter
        filterManager.resetActiveFilter();

        System.out.println("Active Filter is active after reset: " + filterManager.getActiveFilter().isActive());
    }
}
