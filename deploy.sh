#!/bin/bash

# Vérifier le nombre d'arguments
if [ $# -ne 1 ]; then
    echo "Utilisation : $0 [dev|prod]"
    exit 1
fi

# Vérifier si Docker est installé
if ! command -v docker &> /dev/null; then
    echo "Docker n'est pas installé. Veuillez l'installer avant de continuer."
    exit 1
fi

# Vérifier si git est installé
if ! command -v git &> /dev/null; then
    echo "Git n'est pas installé. Veuillez l'installer avant de continuer."
    exit 1
fi

# Récupérer l'environnement spécifié (dev ou prod)
ENVIRONMENT=$1

# Vérifier l'environnement et effectuer les actions appropriées
if [ "$ENVIRONMENT" = "dev" ]; then
    REPO_URL="https://github.com/Team-Scandela/Scandela.git"
    CLONE_DIR="dev_env"
    COMPOSE_DIR="dev/Scandela"
elif [ "$ENVIRONMENT" = "prod" ]; then
    REPO_URL="https://github.com/Team-Scandela/Scandela.git"
    CLONE_DIR="app"
    COMPOSE_DIR="app/Scandela"
else
    echo "Environnement non valide. Utilisation : $0 [dev|prod]"
    exit 1
fi

# Vérifier si le dossier Scandela existe
if [ -d "$COMPOSE_DIR" ]; then
    # Se déplacer dans le répertoire Scandela
    cd "$COMPOSE_DIR"
    
    # Mettre à jour le dépôt existant
    git pull
else
    # Cloner le dépôt GitHub dans le dossier spécifié
    git clone "$REPO_URL" "$CLONE_DIR"
    
    # Se déplacer dans le répertoire cloné
    cd "$CLONE_DIR"
fi

# Lancer le docker-compose dans le dossier Scandela
if [ "$ENVIRONMENT" = "dev" ]; then
    docker compose -f docker-compose.dev.yml up -d --remove-orphans
else
    docker compose up -d --remove-orphans