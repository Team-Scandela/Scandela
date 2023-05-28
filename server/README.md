# Scandela's Server

The Server is a REST API using Sping Boot 5 and Java 17.

We'll name the server directory location as {SERVER_LOCATION} for all installations and configurations.

## Java

Fedora download:
```sudo dnf install java-17-openjdk.x86_64```

We'll name the location {JRE_LOCATION} = /etc/alternatives/jre_17_openjdk

Ubuntu download:
```apt install openjdk-17-jdk openjdk-17-jre```

We'll name the location {JRE_LOCATION} = /usr/share/doc/openjdk-17-jre

## Apache Tomcat

1. Download the [tomcat](https://dlcdn.apache.org/tomcat/tomcat-10/v10.1.8/bin/apache-tomcat-10.1.8.tar.gz)
   You can put the downloaded file whereever you want. We'll name it {TOMCAT_LOCATION} for all installations and configurations.

2. Extract the .tar.gz file you've download by right clicking and 'extract it' or by using the following command:
```tar -zxf apache-tomcat-10.1.8.tar.gz```

## Compilation

Notice that if you use the Eclipse IDE you can skip these steps.

1. Install the 'maven' package

2. Open a terminal and run the following command:
```export JRE_HOME={JRE_LOCATION}```

3. Open a terminal in the server directory and run the following command:
```mvn clean install```

## Manual deployment

Notice that if you use the Eclipse IDE you can skip these steps.

Prerequisites:

- You must have done Apache Tomcat and Compilation steps.

1. Open a terminal in {TOMCAT_LOCATION}/bin and run the following command:
```./catalina run```

2. Moove manually the {SERVER_LOCATION}/target/server.war in the {TOMCAT_LOCATION}/webapps or run the following command:
```mv {SERVER_LOCATION}/target/server.war {TOMCAT_LOCATION}/webapps/server.war```

If you have to reupload a server.war, manually delete the {TOMCAT_LOCATION}/webapps/server and {TOMCAT_LOCATION}/webapps/server.war or run the following commands:
```rm -rf {TOMCAT_LOCATION}/webapps/server
rm {TOMCAT_LOCATION}/webapps/server.war```

After this, you can restart Manual deployment steps.

## VSCode

You can dowload the VSCode Extension named 'Java Extension Pack'.
To compile and deploy, follow Compilation and Manual deployment steps.

## Eclipse

Installation:

1. Download [Eclipse](https://www.eclipse.org/downloads/download.php?file=/technology/epp/downloads/release/2023-03/R/eclipse-java-2023-03-R-linux-gtk-x86_64.tar.gz&mirror_id=17)

2. Extract the .tar.gz file you've download  by right clicking and 'extract it' or by using the following command:
```tar -zxf eclipse-java-2023-03-R-linux-gtk-x86_64.tar.gz```

3. (Optional) You can moove manually the extracted directory whereever you want or run the following command:
```mv [downloaded directory] [path]/[directory name you want]```

We'll name the directory location as {ECLIPSE_LOCATION} for all installations and configurations.

Launch Eclipse:

Run the following command in the {ECLIPSE_LOCATION}:
```./eclipse```

Open the server project:

- Open the 'File' menu at the top-left on Eclipse
- Choose 'Open projects from file system'
- Click on 'Browse'
- Open {SERVER_LOCATION}

Install Extension:

1. Java EE
- Open the 'Help' menu at the top on Eclipse
- Choose 'Install new software'
- Open the 'Work with' dropdown list and choose '---All Available Sites---'
- Check the available software named 'Web, XML, JAVA EE and OSGI'
- Click on 'Next'
- Click on 'Next'
- Click on 'Next'
- Click on 'Accept'
- Click on 'Finish'
- Wait that the loading in the bottom-right finish
- (If it's not done, select all checkbox on the popup) Trust selected
- Click on restart

After restart,
- Open the 'Window' menu at the top of Eclipse
- Choose 'Perspective'
- Choose 'Open perspective'
- Choose 'Other...'
- Select 'Java EE'
- Click on 'Open'

2. Lombok
- Download [Lombok](https://projectlombok.org/downloads/lombok.jar)
- Right click on the downloaded file
- Choose 'Properties'
- Go to 'Permissions'
- Check 'Authorize this file as a program'
- Click on 'Close'
- Run the following command:
```java -jar lombok.jar```
- Click on 'OK'
- Choose 'Specify location'
- Put {ECLIPSE_LOCATION}/eclipse (The executable)
- Click on 'Install/Update'
- Click on 'Quit installer'

Change Java version:

- Open the 'Window' menu at the top of Eclipse
- Choose 'Preferences'
- Click on the arrow on the left of 'Java'
- Select 'Installed JREs'
- Click on 'Add'
- Select 'Standard VM'
- Click on 'Next'
- JRE home: {JRE_LOCATION}
(You can use 'Directory...' to navigate in your directories)
- Check the JRE System Library who appeared
- Click on 'Apply and close'

Compilation:

- Open the 'Run' menu at the top of Eclipse
- Choose 'Run configurations...'
- Right click on 'Maven Build'
- Choose 'New configuration'
- On 'Base directory', click on 'Workspace...'
- Choose 'server' (Not 'Servers')
- Click on 'OK'
- In 'Goals:', set to 'clean install'
- Click on 'Run'

Apache Tomcat:

- At the bottom of Eclipse, go to the 'Servers' perspective
- Click on 'No server available, click this link to create a new'
- Click on the arrow on the left of 'Apache'
- Choose 'Tomcat 10.1'
- Click on 'Next'
- Click on 'Browse'
- Go to {SERVER_LOCATION}
- Click on 'Finish'

- Right click on the Tomcat server who appeared
- Choose 'Add and remove'
- In 'Available' table, select 'server'
- Click on 'Add'
- Click on 'Finish'

- Right click on the Tomcat server
- Choose 'Properties'
- Click on 'General'
- Click on 'Switch location' (the location have to start with '/Servers')
- Click on 'Apply and close'

- Double click on the Tomcat server
- Click on 'Use tomcat location' (If you can't, right click on the Tomcat server, choose 'Publish' and retry)
- Save by Using Ctrl + S
