# Backend

Split the Bill project backend

## Table of contents

- [General info](#general-info)
- [Technologies](#technologies)
- [Setup](#setup)
- [Features](#features)
- [Status](#status)
- [Inspiration](#inspiration)
- [Contact](#contact)

## General info

This Backend API handles users and tables in order to help you split your restaurant bill, making it easier to pay at the restraurant and keep track of who owes money to the bill's payer.

## Screenshots

![Example screenshot](./img/screenshot.png)

## Technologies

- Express
- Node.js
- JavaScript ES6

## Setup

The project is hosted at:
    https://split-thebill.herokuapp.com


## Features

List of features ready-- TODOs for future development below.

- Auth Router
    - POST /auth/register
        - Accepts an object in req.body
        -   {
                "username": "", 
                "password": "", 
                "firstName": "", 
                "lastName": "", 
                "email": "", 
                "phoneNumber": ""
            }
        - Returns a token and userId for created user
    - POST /auth/login
        -Accepts an object in req.body
        -   {
                "username": "",
                "password": ""
            }
        - Returns a token and a welcome message containing the current account username
- Users Router 
    - GET /users/all
        - Requires "privilege":"admin" in req.headers 
        - Requires a valid token
        - Returns a list of all userIds and their usernames
    - GET /users/choices
        - Open enpoint, returns an array of all usernames in the database
        - For creating list of users to add to a table
- Tables Router
    - POST /tables/new
        - Requires a valid token
        - Accepts an object in req.body
        -   {
                "restaurant": "",
                "amountDue":"",
                "peopleCount":"",
                "createdBy":""
            }
        - Returns the created table as an object
    - GET /tables/
        - Requires a valid token
        - Returns an array of all the tables in the database
    - GET /tables/:id
        - Requires a valid token
        - Returns an the table with the corresponding tableId
- UsernamePaid Router
    - POST /upr/
        - Requires a valid token
        - Accepts an object in req.body
        -   {
                "tableId": "",
                "username":"",
            }
        - Returns an array with all tables the entered username is active on, and their paid status
    - GET /upr/ledgers/:id
        - Requires a valid token
        - Returns the ledger of the payee (restaurant name, restaurantId, paid boolean) 
    - PUT /upr/ledgers/:id/pay
        - Requires a valid token
        - Accepts an Object in req.body, to indicate the ledger has been paid 
        -   {
                "paid":"1"
            }
        - Returns the updated ledger
    - POST /upr/ledgers/
        - Requires a valid token
        - Accepts an Object in req.body
        -   {
                "username":""
            }
        - Returns a list of all the ledgers a username is on

To-do list:

- Automate a push notification for users who have been added to a tab via the email/text info on their user accounts
- Ability for the creator of a table to enter specific amounts for each person at the table to pay, and will notify automatically, preventing the table creator from asking for more money than the total amount due/paid on the bill
