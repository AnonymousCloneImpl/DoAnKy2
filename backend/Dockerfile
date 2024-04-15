FROM jelastic/maven:3.9.5-openjdk-21 AS build
COPY ./src /app/src
COPY ./pom.xml /app/
WORKDIR /app
RUN mvn clean install

FROM openjdk:21
COPY --from=build /app/target/demo-0.0.1-SNAPSHOT.jar /app.jar
ENTRYPOINT ["java", "-jar", "/app.jar"]