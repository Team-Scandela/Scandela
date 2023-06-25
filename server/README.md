# Scandela's Server

The Server is a REST API using Sping Boot 5 and Java 17.

We'll name the server directory location as {SERVER_LOCATION} for all installations and configurations.

## Java

### Fedora download

`sudo dnf install java-17-openjdk.x86_64`

We'll name the location {JRE_LOCATION} = /etc/alternatives/jre_17_openjdk

### Ubuntu download

`apt install openjdk-17-jdk openjdk-17-jre`

We'll name the location {JRE_LOCATION} = /usr/share/doc/openjdk-17-jre

### Windows download

Download [Java 17](https://download.java.net/java/GA/jdk17/0d483333a00540d886896bac774ff48b/35/GPL/openjdk-17_windows-x64_bin.zip)
Extract the downloaded file, we'll name the location {JRE_LOCATION}  for all installations and configurations.

#### Set envionment variable relate to Java

<ul>
	<li>Open the Windows search bar and search 'Environment variables'</li>
	<li>Open 'Edit the system environment variables'</li>
	<li>Click on 'Environment variables...'</li>
	<li>In the <strong>'System variables'</strong>, select 'Path'</li>
	<li>Click on 'Edit'</li>
	<li>(If you have 'C:\Program Files\Common Files\Oracle\Java\javapath', select it and click on 'Delete')</li>
	<li>Click on 'Browse...'</li>
	<li>Go to {JRE_LOCATION}/jdk-17 and click on 'OK'</li>
	<li>Click on 'New'</li>
	<li>Put '%JAVA_HOME%\bin'</li>
	<li>Press Enter and click on 'OK'</li>
	<li>In the <strong>'System variables'</strong>, click on 'New...'</li>
	<li>Variable name=JAVA_HOME and Variable value={JRE_LOCATION}/jdk-17 (You can copy and paste the path put in 'Path')</li>
	<li>Click on 'OK'</li>
	<li>Click on 'OK'</li>
</ul>

## Compilation

Notice that if you use the Eclipse IDE you can skip these steps.

### On Linux

1. Install the 'maven' package

2. Open a terminal and run the following command **(Do this step each time you want to compile)**:

`export JRE_HOME={JRE_LOCATION}`

3. To compile, run the following command in {SERVER_LOCATION}:

`mvn clean install`

### On Windows

1. Download [Apache Maven](https://dlcdn.apache.org/maven/maven-3/3.8.8/binaries/apache-maven-3.8.8-bin.zip)

2. Extract the .zip file you've download by right clicking and 'extract it'
**OR**
by using the following command:

`tar -xf apache-maven-3.8.8.zip`

We'll name the location {MAVEN_LOCATION} for all installations and configurations.

4. Environment variables
	- Open the Windows search bar and search 'Environment variables'
	- Open 'Edit the system environment variables'
	- Click on 'Environment variables...'
	- In the **'System variables'**, select 'Path'
	- Click on 'Edit'
	- Click on 'Browse...'
	- Go to {MAVEN_LOCATION}/bin and click on 'OK'
	- Click on 'OK'
	- Click on 'OK'

5. To compile, run the following command in {SERVER_LOCATION}:

`mvn clean install`

## Run the application

`java -jar {SERVER_LOCATION}/target/server.war`

If it doesn't work, try to update your java version 17 and check if the postgresql database is started.

## VSCode

You can dowload the VSCode Extension named 'Java Extension Pack'.

To compile and deploy, follow **Compilation** and **Run the application** steps.

## Eclipse

### Installation

1. Download [Eclipse for Linux](https://www.eclipse.org/downloads/download.php?file=/technology/epp/downloads/release/2023-03/R/eclipse-java-2023-03-R-linux-gtk-x86_64.tar.gz&mirror_id=17)

   Download [Eclipse for Windows](https://www.eclipse.org/downloads/download.php?file=/technology/epp/downloads/release/2023-03/R/eclipse-java-2023-03-R-win32-x86_64.zip&mirror_id=1190)

2. Extract the .tar.gz or the .zip file you've download  by right clicking and 'extract it'
**OR**
by using the following commands:

`tar -zxf eclipse-java-2023-03-R-linux-gtk-x86_64.tar.gz`

`tar -xf eclipse-java-2023-03-R-win32-x86_64.zip`

3. (Optional) You can moove manually the extracted directory whereever you want
**OR**
run the following command:

`mv [downloaded directory] [path]/[directory name you want]`

We'll name the directory location as {ECLIPSE_LOCATION} for all installations and configurations.

### Launch Eclipse

Double click on eclipse.exe in {ECLIPSE_LOCATION} on Windows.

Run the following command in {ECLIPSE_LOCATION} on Linux:

`./eclipse`

Click on 'Launch'.

### Open the server project

<ul>
	<li>Open the 'File' menu at the top-left on Eclipse</li>
	<li>Choose 'Open projects from file system'</li>
	<li>Click on 'Browse'</li>
	<li>Open {SERVER_LOCATION}</li>
</ul>

### Install Extensions

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
	- Download [Lombok](https://projectlombok.org/downloads/lombok.jar) -> On Windows, you can directly go to "Click on 'OK'" after the download
	- Right click on the downloaded file
	- Choose 'Properties'
	- Go to 'Permissions'
	- Check 'Authorize this file as a program'
	- Click on 'Close'
	- Run the following command:
	`java -jar lombok.jar`
	- Click on 'OK'
	- Choose 'Specify location'
	- Put {ECLIPSE_LOCATION}/eclipse (The executable)
	- Click on 'Install/Update'
	- Click on 'Quit installer'

### Change Java version

<ul>
	<li>Open the 'Window' menu at the top of Eclipse</li>
	<li>Choose 'Preferences'</li>
	<li>Click on the arrow on the left of 'Java'</li>
	<li>Select 'Installed JREs'</li>
	<li>Click on 'Add'</li>
	<li>Select 'Standard VM'</li>
	<li>Click on 'Next'</li>
	<li>JRE home: {JRE_LOCATION}</li>
	(You can use 'Directory...' to navigate in your directories)
	<li>Check the JRE System Library who appeared</li>
	<li>Click on 'Apply and close'</li>
</ul>

### Compilation

<ul>
	<li>Open the 'Run' menu at the top of Eclipse</li>
	<li>Choose 'Run configurations...'</li>
	<li>Right click on 'Maven Build'</li>
	<li>Choose 'New configuration'</li>
	<li>On 'Base directory', click on 'Workspace...'</li>
	<li>Choose 'server' (Not 'Servers')</li>
	<li>Click on 'OK'</li>
	<li>In 'Goals:', set to 'clean install'</li>
	<li>Click on 'Run'</li>
</ul>

### Run the application

On the left, right click on the 'server' project, then select 'Run as' and choose 'Java Application'. Select 'ServerApplication' and click on 'OK'.
