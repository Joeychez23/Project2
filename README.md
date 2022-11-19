# Tech-blog

## Table of Contents:

[1. Description](#Description)  
[2. Installation](#Installation)  
[3. Usage](#Usage)  
[4. Output](#Output)  
[5. Contributors](#Contributors)  
[6. Questions](#Questions)

## Description

Using Node.js to provision a SQL database that contains tables that're used to in the data management of the website
Using Routes we can allow the user to naviagate the site using handlebars to render the desired partail using the ./homeRoutes.js in the controllers folder
The site provisions a express-session which run when the site is opens and store data base on what the user does while the window is open
The site used authentication to redirect the user back to defined pages if not logged in to the site, the logged_in values in stored in the session
Once the user is logged_in they'll have access to the dashboard to be able to add blogs that are connected to that current users id to validate that was made by a certain user
The User can delete and update blog they have created in their respective dashboard
On the home page if not logged_in, the user can view all the blogs post as previews and click on them to reveal the full blog and its comments and full contents
On the home page if logged_in, the user can still view all the blogs previews the same. when the user click on one of the blogs the user will be sent to the same page as the not logged_in user
But the user will be allowed to add comment using a text box that is provided, once finish the user can submit using the add comment button
The user can see all the comment and if the comment is a user added comment the comment will have an update and delete button that allows the user to interact with the button accordingly

## Installation

1. clone the repo
2. cd into the directory
3. run npm i inside the terminal
4. go to .env --> {  
      DB_HOST= HOST  
      DB_NAME= NAME  
      DB_PASSWORD= PASSWORD  
      DB_USER= USER  
   }

## Usage

1. run "npm start" or "node server.js" in terminal to begin

## Output

Link: <a href="https://tech-blog-sql.herokuapp.com" target="_blank">https://tech-blog-sql.herokuapp.com/</a>

## Contributors

Joeychez23

## Questions

Email: joeychez123@gmail.com

Github: https://github.com/Joeychez23

Repo: https://github.com/Joeychez23/tech-blog

Link: <a href="https://tech-blog-sql.herokuapp.com" target="_blank">https://tech-blog-sql.herokuapp.com/</a>