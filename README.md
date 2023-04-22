# URL Shortener 
This API allows users to shorten long URLs, similar to services like bit.ly or goo.gl. Users can register and log in to manage their URLs and view usage statistics.

## Features
- User registration and authentication with JSON Web Tokens (JWT)
- URL shortening and redirection
- Usage statistics for each user

## Technologies
- Node.js
- Express
- PostgreSQL
- bcrypt
- jsonwebtoken
- nanoid

## API Endpoints
### User
- Register a new user: POST /api/v1/urlshortener/register
- Log in: POST /api/v1/urlshortener/login

### URL
- Shorten a long URL: POST /api/v1/urlshortener/shorten
- Redirect to the original URL: GET /api/v1/urlshortener/:short_id
- Fetch usage statistics: GET /api/v1/urlshortener/statistics

# Testing the API
To test the API endpoints, I used Postman. In testing the authentication method, I set the x-auth-token header for authenticated requests with JWTs.

# Contributing
To contribute to this project, create a fork, make your changes, and submit a pull request.

This README provides a brief overview of my URL Shortener API project.


