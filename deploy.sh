#!/bin/bash

# Transférer les fichiers sur le Raspberry Pi
echo "Transfert des fichiers vers le Raspberry Pi..."
scp -r ./scandelapp pi@<adresse_ip_raspberry>:/home/pi/scandelapp
scp -r ./server pi@<adresse_ip_raspberry>:/home/pi/server
scp -r ./jenkins pi@<adresse_ip_raspberry>:/home/pi/jenkins

# Connexion au Raspberry Pi
echo "Connexion au Raspberry Pi..."
ssh pi@<adresse_ip_raspberry> << EOF
  cd /home/pi

  # Build et déploiement des conteneurs
  echo "Construction et déploiement des conteneurs Docker..."
  docker-compose up -d
EOF

echo "Déploiement terminé !"
