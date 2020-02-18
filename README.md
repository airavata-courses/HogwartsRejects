# HogwartsRejects

# Project Title

One Paragraph of project description goes here

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

What things you need to install the software and how to install them

## System Architecture
![Image description](https://cdn.discordapp.com/attachments/394719662086291466/679153099763351562/image0.jpg)

## API GateWay

API gateway takes care of routing the requests from UI to the backend microservices. It adds a level of masking and abstraction.

## Data Retrieval

This service retrieves current weather data from an api and provides data to front end to show on landing page.

## User Management

User Management microservice takes care of login, signup and the verification of each request before api gateway produces to a kafka topic making sure every request is from an authenticated user.

By generating a JWT token, the username of the user is never exposed.
This way, even if the username is exposed via logs, the possibility of session hijacking is drastically decreased.

User Management also takes care of decrypting the JWT token and setting the username in response. This way usermame is passed internally across the other microservices for mapping the jobs(or user queries) with the user.

Since, login should be synchronous, we exposed a REST endpoint for login, signup and verify. Upon successfull validation, the api returns the jwt or the username respectively which is cosumed by the API gateway.

The DB used for this microservice is PostgresSQL.


## Session Management 

Session Management microservices takes care of tracking the user queries and their statuses.
Basically, once a user queries a job, the session management creates an entry for that. Any change in status of the job will be consumed by the SessionManagement and will immediately be stored in MongoDB.

This is achieved through Kafka. SessionManagement has its own TOPIC to which all the microservices send messages about their status.

Session Management also takes care of providing the user the list of all his/her queries upon request.

Currently, this can be done either via a RestEndpoint or through Kafka.

The DB used for this microservice is MongoDB.

## Modeling service

This service majorly takes in user query request from the front end and gets that file from the Amazon data service, it also models the data from the file and stores it in A url. This url is image hosting service provided by imgr

## Post Processing

Once an image is created, it is hosted on cloud. For now, post processing keeps track of the user's jobs and the image url on cloud. When the user requests for his history of queries, SessionManagement lists all the user queries. Upon selecting a query, Post-Processing fetches the appropriate image url and sends it to API Gateway.

Currently, this can be done either via a RestEndpoint or through Kafka.

The DB used for this microservice is MongoDB.


### Installing

A step by step series of examples that tell you how to get a development env running

Say what the step will be

```
Give the example
```

And repeat

```
until finished
```

End with an example of getting some data out of the system or using it for a little demo

## Running the tests

Explain how to run the automated tests for this system

### Break down into end to end tests

Explain what these tests test and why

```
Give an example
```

### And coding style tests

Explain what these tests test and why

```
Give an example
```

## Deployment

Add additional notes about how to deploy this on a live system

## Built With

* [Dropwizard](http://www.dropwizard.io/1.0.2/docs/) - The web framework used
* [Maven](https://maven.apache.org/) - Dependency Management
* [ROME](https://rometools.github.io/rome/) - Used to generate RSS Feeds

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags). 

## Authors

* **Billie Thompson** - *Initial work* - [PurpleBooth](https://github.com/PurpleBooth)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Hat tip to anyone whose code was used
* Inspiration
* etc
