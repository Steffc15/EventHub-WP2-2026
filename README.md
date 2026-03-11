# EventHub

## Project Description

EventHub is a web application that allows users to discover and reserve seats for various events such as concerts, conferences, workshops, or local activities. The platform provides a simple and intuitive interface where visitors can create accounts, browse available events, and manage their reservations.

Registered users can log into their accounts, view event details, reserve seats, and keep track of their reservations. The system ensures secure authentication using Spring Security with encrypted passwords and user sessions.

Administrators have additional privileges that allow them to manage the platform. They can create new events, update event details, upload images related to events, manage the number of available seats, and view or manage user accounts.

The application will have a responsive interface built with Bootstrap so it can be easily used on both desktop and mobile devices. The backend will be developed using Spring Boot and will communicate with a relational database such as MySQL or PostgreSQL. The entire application will be containerized using Docker to simplify deployment.

## Technologies

The following technologies will be used to develop the application:

* **Spring Boot** – backend framework used to build the REST API and business logic
* **Spring Security** – used for authentication, authorization, and password encryption
* **MySQL / PostgreSQL** – relational database used to store users, events, and reservations
* **Bootstrap** – frontend framework used to build a responsive user interface
* **Docker** – used to containerize and deploy the entire application

## User Roles

### Client

Clients are registered users of the platform. They can:

* create an account and log in securely
* browse available events
* view event details such as description, location, and available seats
* reserve seats for events
* view and manage their reservations
* access their personal profile page

### Admin

Administrators manage the content and users of the platform. They can:

* add new events
* edit or delete existing events
* upload event images
* update the number of available seats for events
* manage user accounts

## User Stories

* **As a visitor**, I want to create an account and log into the platform so that I can reserve seats for events and manage my reservations.

* **As a client**, I want to browse available events and reserve seats so that I can attend events that interest me.

* **As an admin**, I want to add, edit, and manage events so that users can view and reserve places for upcoming events.
