# Question 1: Average Calculator Microservice

This project implements a REST API /numbers/{numberId} that fetches numbers from a third-party server, maintains a window of size 10, and calculates their average.

## Setup
1. Clone the repository.
2. Navigate to question1/.
3. Run npm install to install dependencies.
4. Create a .env file with the required environment variables (PORT, AUTH_TOKEN).
5. Run npm start to start the server.

## API
- *GET /numbers/{numberId}*: Fetches numbers based on numberId (p, f, e, r), maintains a window of size 10, and returns the average.

## Screenshots
![WhatsApp Image 2025-05-08 at 13 05 27_5559bbc1](https://github.com/user-attachments/assets/52a4a59d-3811-4ac6-9002-46fe12e0807a)
![WhatsApp Image 2025-05-08 at 13 05 27_db06999b](https://github.com/user-attachments/assets/c5c88adb-c508-4d11-bb83-e77c4b97b114)

