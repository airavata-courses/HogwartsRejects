FROM gradle:6.1.1-jdk8 AS build
COPY --chown=gradle:gradle . /home/gradle/src
WORKDIR /home/gradle/src
RUN gradle clean build --no-daemon

FROM openjdk:8-jre-slim

EXPOSE 3000

RUN mkdir /app

COPY --from=build /home/gradle/src/build/libs/UserManagement-1.0-SNAPSHOT.jar /app/userapp.jar

ENTRYPOINT ["java", "-XX:+UnlockExperimentalVMOptions", "-XX:+UseCGroupMemoryLimitForHeap", "-Djava.security.egd=file:/dev/./urandom","-jar","/app/userapp.jar"]