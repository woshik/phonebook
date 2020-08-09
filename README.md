# Phonebook REST App

## Tools and Technologies

- Node.js (v12.18.3 LTS)
- Express (v4.17.1)
- mongodb (v4.2.8)
- swagger (v2.0)

# Getting started for developers

## Prerequisites

To setup the project, you will need the following tools and machine configurations:

- Minimum ubuntu 14.04
- Minimum windows 7
- Mac OS

## Project Clone

- Clone **phonebook** from GitHub using,

        git clone https://github.com/woshik/phonebook.git

- Go to the cloned project directory using,

        cd phonebook

## Setup Configuration & Project Instasll (For Development)

1. run `npm i` command on you tarminal and install all packages
2. copy `.env.example` file and past it root of the project as `.env`
3. change port number, application enviroment, and most important set database connection string and database name
4. lastly run `npm start`, if every thing is currectly setup you will see server log in your terminal

## Project Version

    currently this project running on API v1.0.0

## API urls:

For geting all API endpoint details please go this url you can get the API Documentation `/api/v1/docs`

if you are running on port 3000 goto `http://localhost:3000/api/v1/docs/`

## Production deployment

Currently there is no automation process setup for this project. Deploy it manually and use ubunty systemctl
