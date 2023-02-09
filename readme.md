# Ironmatch

<img src="./public/images/ironmatch logo.png" alt="logo" width="50%"/>

## Description

This app would help teachers to create teams of student for effective project work. The students can complete a survey and create lists of other students they would like to, and would not like to work with. Based on this data, the teachers can access an interface where they have an overview of the best possible matches. With the help of this information they can easily create the final teams.

## User Stories

- **404** - As a user I want to see a 404 page when I go to a page that doesn’t exist
- **500** - As a user I want to see an error page when there is a technical issue
- **homepage** - As a user I want to be able to access the homepage so that I see what the app is about and login and signup
- **sign up as student** - As a student I want to sign up on the webpage to complete the survey
- **sign up as teacher** - As a teacher I want to sign up on the webpage to create project teams
- **login** - As a user I want to be able to log in on the webpage so that I can get back to my account
- **logout** - As a user I want to be able to log out from the webpage so that I can make sure no one will access my account
- **survey** - As a student I want to be able to complete the survey
- **student matches** - As a teacher I want to see an overview of all the possible matches
- **match update** - As a teacher I want to create the teams manually based on the matches data
- **teams** - As a teacher I want to be able to acces the created teams and edit them if needed

## Backlog

- Generate automatic team suggestions
- Create random matches
- Make a view for teachers to see which students have signed up already and who has comleted the survey

## ROUTES

Auth routes:

- GET /auth/signup
  - redirects to / if user logged in
  - renders the signup form
- POST /auth/signup
  - redirects to / if user logged in
  - body:
    - first name
    - last name
    - email
    - password
    - Teacher / Student
- GET /auth/login
  - redirects to / if user logged in
  - renders the login form (with flash msg)
- POST /auth/login
  - redirects to / if user logged in
  - body:
    - email
    - password
- POST /auth/logout
  - body: (empty)

Student routes:

- GET /
  - renders the homepage
- GET /survey
  - renders the survey if surveyComlete is false
- POST /survey
  - redirects to /
  - body:
    - greenList []
    - redList []

Teacher routes:

- GET /
  - renders the homepage
- GET /class
  - renders the allStudents view
  - create teams button if teams array is empty
  - edit teams button if teams array not empty
- GET /teams
  - renders the matches view
  - save button to create the teams and push them to DB
- POST /teams
  - creates teams object in DB
- GET /teams/:id
  - renders the teams view with button to edit
- POST /teams/:id
  - updates the current teams object

## Models

Student model

```
firstName: String
lastName: String
passwordHash: String
isTeacher: Boolean
surveyComplete: Boolean
greenList: [ObjectId<Student>]
redList: [ObjectId<Student>]

```

Teacher model

```
firstName: String
lastName: String
passwordHash: String
isTeacher: Boolean
teams: {[ObjectId<Student>]}


## Links

### Trello

https://trello.com/b/G6mRrwXp/ironmatch

### Git

https://github.com/zsorosz/ironmatch

### Slides
```
