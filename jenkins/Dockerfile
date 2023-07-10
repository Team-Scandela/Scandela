FROM jenkins/jenkins:lts-jdk11

# Définition des variables d'environnement pour Jenkins
ENV JENKINS_HOME /var/jenkins_home
ENV JENKINS_USER admin
ENV JENKINS_PASS admin

# Exposer le port 8080
EXPOSE 8080

# Répertoire de travail pour Jenkins
WORKDIR $JENKINS_HOME

# Passer en mode utilisateur jenkins
USER jenkins

# Lancer Jenkins en mode permanent
ENTRYPOINT ["jenkins", "--httpPort=8080"]

# Volume pour sauvegarder les données de Jenkins
VOLUME $JENKINS_HOME


