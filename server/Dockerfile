# Utilisez l'image de base Linux avec Java 17
FROM openjdk:17-jdk-slim

# Définir la variable d'environnement JAVA_HOME
ENV JAVA_HOME=/usr/local/openjdk-17

# Définir la variable d'environnement PATH pour inclure JAVA_HOME/bin
ENV PATH=$PATH:$JAVA_HOME/bin

# Télécharger et extraire Apache Tomcat
ENV TOMCAT_VERSION=10.1.8
ENV TOMCAT_LOCATION=/opt/tomcat

RUN apt-get update && apt-get install -y wget tar && \
    wget https://dlcdn.apache.org/tomcat/tomcat-10/v${TOMCAT_VERSION}/bin/apache-tomcat-${TOMCAT_VERSION}.tar.gz && \
    mkdir -p ${TOMCAT_LOCATION} && \
    tar -zxf apache-tomcat-${TOMCAT_VERSION}.tar.gz -C ${TOMCAT_LOCATION} --strip-components=1 && \
    rm apache-tomcat-${TOMCAT_VERSION}.tar.gz

# Installer Apache Maven
ENV MAVEN_VERSION=3.8.8
ENV MAVEN_LOCATION=/opt/maven

RUN wget https://dlcdn.apache.org/maven/maven-3/${MAVEN_VERSION}/binaries/apache-maven-${MAVEN_VERSION}-bin.tar.gz && \
    mkdir -p ${MAVEN_LOCATION} && \
    tar -zxf apache-maven-${MAVEN_VERSION}-bin.tar.gz -C ${MAVEN_LOCATION} --strip-components=1 && \
    rm apache-maven-${MAVEN_VERSION}-bin.tar.gz

# Définir la variable d'environnement PATH pour inclure MAVEN_LOCATION/bin
ENV PATH=$PATH:${MAVEN_LOCATION}/bin

# Copier les fichiers de configuration
COPY . ${TOMCAT_LOCATION}/webapps/server/

# Exécuter Apache Tomcat
CMD ${TOMCAT_LOCATION}/bin/catalina.sh run
