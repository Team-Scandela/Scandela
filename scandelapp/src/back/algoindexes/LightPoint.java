package back.algoindexes;

class LightPoint {
    private double x;
    private double y;
    private double power;
    private double intensity;

    public LightPoint(double x, double y, double power, double intensity) {
        this.x = x;
        this.y = y;
        this.power = power;
        this.intensity = intensity;
    }

    public double getX() {
        return x;
    }

    public double getY() {
        return y;
    }

    public double getPower() {
        return power;
    }

    public double getIntensity() {
        return intensity;
    }
}