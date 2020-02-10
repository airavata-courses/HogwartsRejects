# Start with a base image containing Java runtime
FROM openjdk:8-jdk-alpine

# Add Maintainer Info
#LABEL maintainer="vivekshrestabandaru@gmail.com"

# Add a volume pointing to /tmp
VOLUME /tmp

# The application's jar file
ARG JAR_FILE

# Add the application's jar to the container
COPY ${JAR_FILE} UserManagement.jar

#RUN sh -c 'touch /UserManagement.jar'

# Run the jar file 
ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom","-jar","/UserManagement.jar"]

# Make port 8084 available to the world outside this container
EXPOSE 8084