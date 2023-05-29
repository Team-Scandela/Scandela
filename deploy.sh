#!/bin/bash

# Build images docker
echo "Build docker images"
sudo docker-compose -f docker-compose.yml build

# Transférer les fichiers sur le Raspberry Pi
echo "Transfer files to Raspberry Pi..."
scp -r ./scandelapp pi@<adresse_ip_raspberry>:/home/pi/scandelapp
scp -r ./server pi@<adresse_ip_raspberry>:/home/pi/server
scp -r ./jenkins pi@<adresse_ip_raspberry>:/home/pi/jenkins

# Connexion au Raspberry Pi
echo "Connexion to Raspberry Pi..."
ssh pi@<adresse_ip_raspberry> << EOF
  cd /home/pi

  # Build et déploiement des conteneurs
  echo "Construction et déploiement des conteneurs Docker..."
  docker-compose up -d
EOF

echo "Deploy done !"
