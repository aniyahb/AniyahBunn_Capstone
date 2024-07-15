# MealMaster
Intern: Aniyah Bunn

----------------------------------------------------------------------------

## Overview

A user friendly web app designed to simplify meal planning and enhance your culinary experience whether you’re a guest or registered user. 
Category: Food, Meal Planning 

Story: Many People struggle with planning meals, finding new recipes, and organizing shopping lists effectively. This often leads to repetitive meals, wasted food, and unnecessary stress in the kitchen. 

Market: Home Cooks, Busy people and families, Health -Conscious Customers, Food Enthusiasts

Habit: Daily or Weekly, Season Variations

Scope: Recipe Search/ Display, Meal Planning, Shopping List Generation, User Authentication, Profile Management, API and Database Integration

----------------------------------------------------------------------------


## Product Spec

 **Required Features**

Recipe Finder 
- Functionality: Allow users to search for recipes by keywords, ingredients, cuisine types, and dietary preferences.
- Integration: Utilize an  API for a recipe database and nutritional information.
  
Recipe Display
- Functionality: Display detailed information for each recipe including ingredients, instructions, cooking time, and nutritional facts.
- User Interaction: Enable users to save favorite recipes
  
User Authentication and Profile
- Authentication: Secure sign-up and login functionality for registered users.
- User Profiles: Enable users to update personal information, dietary preferences, and manage saved recipes and meal plans.

Meal Planner
- Functionality: Enable users to plan meals for specific days of the week.
- Management: Allow editing, adding, and removing meals from the planner.
- Integration: Link with saved recipes to seamlessly add recipes to the meal plan.

----------------------------------------------------------------------------


## User Profiles:

Guest User: Unauthenticated users who can look through recipes and use basic features 
- Search for recipes
- View recipes details 

Registered User: Authenticated users who have created an account and logged in 
- All guest user abilities 
- Save favorite recipes 
- Create and manage meal plans 

----------------------------------------------------------------------------

## User Stories:
- As a guest user, I want to search for recipes so that I can find meal inspiration 

- As a guest user, I want to view the details of a recipe so that I can see the ingredients and cooking instructions

- As a guest user, I want to look through popular  recipes so that I can discover new foods to try 

- As a guest user, I want to filter recipes by dietary preferences (e.g., vegetarian, gluten-free, haram)  so that I can find suitable options 

- As a registered user, I want to save my favorite recipes so that I can easily find them later. 

- As a registered user, I want to create meal plans for the week so that I can organize my meals ahead of time.

- As a registered user, I want to edit my meal plan so that I can make changes if needed.

- As a registered user, I want to log in and out of my account securely so that my personal data is protected. 

----------------------------------------------------------------------------
## Screen Archetypes
<img src="https://github.com/aniyahb/AniyahBunn_Capstone/assets/114838551/b5b723f5-023d-4f91-820d-af0cbb560920" width="450" height="250">

<img src="https://github.com/aniyahb/AniyahBunn_Capstone/assets/114838551/8ea3b187-3769-4b3a-8d3d-f1cea8409fdd" width="450" height="250">

<img src="https://github.com/aniyahb/AniyahBunn_Capstone/assets/114838551/bc9fc72c-e0ea-4e0d-92e6-74f016cebba4" width="450" height="250">

<img src="https://github.com/aniyahb/AniyahBunn_Capstone/assets/114838551/aa08f230-ff48-494f-868f-a96c874a25c5" width="450" height="250">

----------------------------------------------------------------------------

## Server Endpoints:
| HTTP Verb | Name | Description | User Story | 
------------|------|-------------|------------|
POST | /LogIn | Logs in an existing user.| 10
POST | /SignUp| Registers a new user. |10
POST | /LogOut | Logs out the current user.| 10
GET | /users | Retrieves the profile information of a user.| 9
PUT | /users | Updates the profile information of a user | 9
GET | /recipe_search | Searches for recipes based on query parameters. |1
GET | /recipe | Retrieves details of a specific recipe. | 2
GET | /recipe_popular | Retrieves a list of popular recipes. | 3
GET | /recipr_filter | Filters recipes by dietary preferences. | 4
POST | /meal_plans | Creates a new meal plan for the user. | 6
GET | /meal_plans | Retrieves all meal plans for a specific user. | 6
PUT | /meal_plans | Updates a specific meal plan | 8
DELETE | /meal_plans | Deletes a specific meal plan. | 8

----------------------------------------------------------------------------
## Technical Challenges


## Database Integration
- Sequelize

## External APIs
- EDAMAM API

----------------------------------------------------------------------------
## Authentication
In MealMaster, user authentication ensures that registered users can securely access their personal features, while guest users can explore basic functionalities. Here's a simplified description of how user authentication is managed, including session and cookie management, and its effect on navigation between different screens.

**Sign Up Process:**

  User Registration Form: Users fill out a form with their email, password, and name.
  
  Form Submission: When the form is submitted, the data is sent to the server with a `POST /SignUp` request.
  
  Server Processing:
- The server checks if the data is valid.
- If valid, the server saves the user information and creates a secure token (called JWT).
- The server sends back the user information and the token.
     
  Client-Side Handling: The client (the app) stores this token securely, either in an HttpOnly cookie or in local storage.

**Log In Process:**

  User Login Form: Users fill out a form with their email and password.
  
  Form Submission: When the form is submitted, the data is sent to the server with a `POST /LogIn` request.
  
  Server Processing:
- The server checks if the credentials are correct.
- If correct, the server creates a secure token (JWT) and sends it back.
  
  Client-Side Handling: The client stores this token securely.

**Log Out Process:**

  Log Out Request: The user clicks a log out button, which sends a `POST /LogOut` request to the server.
  Server Processing: The server invalidates the current token.
  Client-Side Handling: The client clears the stored token.

**Cookie / Session Management**

  Session Management with JWT
  Token Storage: The secure token (JWT) is stored on the client-side, either in an HttpOnly cookie or in local storage.


----------------------------------------------------------------------------
## Visuals and Interactions


----------------------------------------------------------------------------



