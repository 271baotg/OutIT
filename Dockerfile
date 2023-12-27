
FROM openjdk:17-oracle

WORKDIR /app

COPY .mvn/ .mvn
COPY mvnw pom.xml ./
#Run inside the image
RUN ./mvnw dependency:go-offline
COPY src ./src
#Run inside container
CMD ["./mvnw" , "spring-boot:run"]