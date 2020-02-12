# Start with a base image containing Java runtime
FROM openjdk:8-jdk-alpine

# Add Maintainer Info
LABEL maintainer="vivekshrestabandaru@gmail.com"

# Add a volume pointing to /tmp
VOLUME /tmp1

# The application's jar file
ARG JAR_FILE

# Add the application's jar to the container
COPY ${JAR_FILE} SessionManagement.jar

#RUN sh -c 'touch /SessionManagement.jar'

# Run the jar file
ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom","-jar","/SessionManagement.jar"]

# Make port 8089 available to the world outside this container
EXPOSE 8089