# Utilisez l'image de base Jenkins LTS
FROM jenkins/jenkins:lts

# Installer les plugins Jenkins recommandés
RUN /usr/local/bin/install-plugins.sh \
  pipeline-model-definition \
  git \
  docker \
  aws-java-sdk \
  credentials

# Copier les fichiers de configuration personnalisés dans le conteneur
COPY jenkins/jenkins.yaml /var/jenkins_home/

# Définir les autorisations pour le répertoire de travail de Jenkins
USER root
RUN chown -R jenkins:jenkins /var/jenkins_home/

# Exposer le port 8080 pour accéder à l'interface web de Jenkins
EXPOSE 8080

# Exécuter Jenkins
CMD ["/sbin/tini", "--", "/usr/local/bin/jenkins.sh"]
