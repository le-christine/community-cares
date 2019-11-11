### community-cares
Community Cares aims to foster the relationship between people and government. Based on user's query, it delivers information about free resources in New York City.

See it live: <a href="#" target="_blank">[hosted app link here]</a>

### Installation

### Technologies
Application: 
- Java Spring Boot
- React
- PostgreSQL
- API: <a href = "https://data.cityofnewyork.us/Social-Services/Benefits-and-Programs-API/kvhd-5fmu" target="_blank">NYC Open Data Benefits and Programs API</a>


Deployment:
- Docker 
- Netflix Eureka & Zuul
- AWS EC2 & S3

Planning:
- Figma
- Trello
- Lucidchart


### General approach
Although it was not a project requirement, I wanted to incorporate a 3rd party API into this project. I am passionate about bringing tech into spaces often overlooked, and using data to help people make informed decisions. Naturally this led me to use NYC Open Data's Program and Benefits API, which provides benefit, program, and resource information for over 80 health and human services available to NYC residents. I chose this data set because it provides applicable information to a large population, and the data is kept up-to-date and includes the most recent applications, eligibility requirements, and application dates. Users would be able to interact with this API via Community Cares to perform individual queries that filter by age group and program type. I researched how to access the data via Socrata Open Data API via SoQL Queries (“Socrata Query Language”).

### Wireframes
### Planning
| | Day            | 1                                    | 2                                            | 3                                                   | 4                                                     |
|----------------|----------------|--------------------------------------|----------------------------------------------|-----------------------------------------------------|-------------------------------------------------------|
|<b>Tasks</b>  | Create ERD and data flow diagrams      | Set up project with Eureka + Zuul |  Create controllers to save resource and link to user | Use front-end mock to create basic client layout       |
|   | Read API schema and located API endpoints |  Build out user api with users and resources model                        |Test endpoint to save dummy resource and link to user| Contintuation of building client|
|  | Wireframe front-end | Create endpoints to save resources| Iteration and finalization of revised endpoints |                              |

### Unsolved problems
### User stories
