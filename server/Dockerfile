FROM arm32v7/ubuntu:22.04

COPY . /prod

WORKDIR /prod

ENV SERVER_LOCATION=/prod

RUN apt-get update && \
    apt-get install -y openjdk-17-jdk openjdk-17-jre 

ENV JRE_LOCATION=/usr/share/doc/openjdk-17-jre

RUN apt-get install -y maven

ENV JRE_HOME=/usr/share/doc/openjdk-17-jre

RUN mvn clean install

EXPOSE 6000

CMD java -jar target/server.jar

