# CS568 Final Project
## Sirak Tekle & Jeremy Chronister

## Product Review Application - React

## Description
1. Users can add, delete, update and fetch all the products in the application.
a. For delete and update: Only the creator of the product can do these operations.
2. Users can add, delete, update and fetch reviews of a product.
a. For delete and update: Only the creator of the review can do these operations.
3. Products have reputation points:
a. An excellent rating adds 2 points to the product’s reputation score.
b. A bad rating deducts 1 point from the product’s reputation score.
c. A good rating does not change a product’s reputation score.
4. Users sign in / sign up before they can use the application.
5. Products can be sorted by reputation.
6. All backend API request are logged to file.

## SuperUser Account
1. The user collection in the database has a superuser account. (Role is superuser).
2. Superuser may log in to the Application to see a dashboard with the following functionalities:
a. List all users’ accounts, activates/deactivates, and reset their password.
b. List all the requests from the log.

## Technical Details
1. Redux manages the state.
2. JWT for authentication and authorization.
3. Server Follows the REST convention.

