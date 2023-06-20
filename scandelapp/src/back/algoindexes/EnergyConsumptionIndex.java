public class EnergyConsumptionIndex {
    public static double[][] calculateEnergyConsumption(LightPoint[] lightPoints, int gridWidth, int gridHeight) {
        double[][] energyGrid = new double[gridHeight][gridWidth];

        // Initialisation de la grille avec des valeurs par défaut
        for (int i = 0; i < gridHeight; i++) {
            for (int j = 0; j < gridWidth; j++) {
                energyGrid[i][j] = 0.0;
            }
        }

        // Calcul de l'indice de consommation énergétique pour chaque cellule de la grille
        for (LightPoint lightPoint : lightPoints) {
            int cellX = (int) (lightPoint.getX() / gridSize); // Coordonnée X de la cellule correspondante
            int cellY = (int) (lightPoint.getY() / gridSize); // Coordonnée Y de la cellule correspondante

            double lightPointConsumption = lightPoint.getPower() * lightPoint.getIntensity();

            // Mise à jour de l'indice de consommation énergétique de la cellule
            energyGrid[cellY][cellX] += lightPointConsumption;
        }

        return energyGrid;
    }

    public static void main(String[] args) {
        // Exemple d'utilisation
        LightPoint[] lightPoints = {
                new LightPoint(100, 200, 50, 100), // Luminaire 1 : puissance = 50, intensité = 100, coordonnées (100, 200)
                new LightPoint(300, 150, 30, 80), // Luminaire 2 : puissance = 30, intensité = 80, coordonnées (300, 150)
                new LightPoint(250, 350, 40, 120) // Luminaire 3 : puissance = 40, intensité = 120, coordonnées (250, 350)
        };
        int gridWidth = 4; // Largeur de la grille (nombre de cellules en largeur)
        int gridHeight = 3; // Hauteur de la grille (nombre de cellules en hauteur)

        double[][] energyGrid = calculateEnergyConsumption(lightPoints, gridWidth, gridHeight);

        // Affichage de l'indice de consommation énergétique pour chaque cellule de la grille
        for (int i = 0; i < gridHeight; i++) {
            for (int j = 0; j < gridWidth; j++) {
                System.out.println("Indice de consommation énergétique pour la cellule (" + i + ", " + j + ") : " + energyGrid[i][j]);
            }
        }
    }
}

