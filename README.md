# MealMaster
Intern: Aniyah Bunn

----------------------------------------------------------------------------

## Overview

A user friendly web app designed to simplify meal planning and enhance your culinary experience whether you’re a guest or registered user. 
Category: Food, Meal Planning 

Story: Many People struggle with planning meals, finding new recipes, and organizing shopping lists effectively. This often leads to repetitive meals, wasted food, and unnecessary stress in the kitchen. 

Market: Home Cooks, Busy people and families, Health-Conscious Customers, Food Enthusiasts

Habit: Daily or Weekly, Season Variations

Scope: Recipe Search/Display/Favoriting User Authentication, API and Database Integration

----------------------------------------------------------------------------


## Product Spec

### Required Features
User Authentication
- Secure sign-up and login functionality for registered users.

Recipe Finder and Display
- Functionality: Allow users to search for recipes by keywords, ingredients, cuisine types, and dietary preferences.
- Integration: Utilize an API for a recipe database and nutritional information.
- Display: Show detailed information for each recipe including ingredients, instructions, cooking time, and nutritional facts.
- User Interaction: Enable users to save favorite recipes.

Favorite Recipes
- Design and develop UI for favoriting page.
- Implement functionality to add and remove meals from favorites.

Search Feature
- Implement search bar in the user interface.
- Develop backend functionality to process search queries.
- Display search results and navigate to a new page.

Load More Feature
- Implement "Load More" button on the Homepage.
- Develop backend pagination support for the "Load More" functionality.

WALK THROUGH VIDEO:
<div>
    <a href="https://www.loom.com/share/6536778d16c743dfa9d206ec86cc11b3">
      <p>Aniyah Bunn- MealMaster - Watch Video</p>
    </a>
    <a href="https://www.loom.com/share/6536778d16c743dfa9d206ec86cc11b3">
      <img style="max-width:300px;" src="https://cdn.loom.com/sessions/thumbnails/6536778d16c743dfa9d206ec86cc11b3-0287f7e6765c5cdc-full-play.gif">
    </a>
  </div>

----------------------------------------------------------------------------

## User Profile:

Registered User: Authenticated users who have created an account and logged in

- Search for recipes by keywords, ingredients, cuisine types, and dietary preferences
- View recipe details including ingredients and instructions
- Use the "Load More" feature on the Homepage to browse more recipes
- Save and manage favorite recipes
- Receive automatic email notifications about updates to favorited recipes

----------------------------------------------------------------------------

## User Stories:

- As a user, I want to securely sign up and log in to my account so that I can access personalized features
- As a user, I want to search for recipes using keywords, ingredients, cuisine types, or dietary preferences so that I can find specific meal ideas
- As a user, I want to view detailed recipe information, including ingredients and instructions
- As a user, I want to use the "Load More" button on the Homepage to browse additional recipes without leaving the page
- As a user, I want to save my favorite recipes so that I can easily find them later
- As a user, I want to remove recipes from my favorites list so that I can keep my saved recipes organized
- As a user, I want to view all my favorite recipes on a dedicated page so that I can quickly access my preferred meals
- As a user, I want to receive automatic email notifications about updates to my favorited recipes so that I'm aware of any changes or improvements
- As a user, I want the app to store my data locally and synchronize it efficiently so that I have a seamless experience across sessions
- As a user, I want the search results to be displayed on a new page so that I can easily compare different recipes
- As a user, I want the app to handle data merging when differences are detected between local storage and server data so that my information remains consistent


----------------------------------------------------------------------------
## Screen Archetypes

<img src="https://github.com/aniyahb/AniyahBunn_Capstone/assets/114838551/8ea3b187-3769-4b3a-8d3d-f1cea8409fdd" width="400" height="200">

<img src="https://github.com/aniyahb/AniyahBunn_Capstone/assets/114838551/bc9fc72c-e0ea-4e0d-92e6-74f016cebba4" width="400" height="200">

<img src="https://github.com/aniyahb/AniyahBunn_Capstone/assets/114838551/aa08f230-ff48-494f-868f-a96c874a25c5" width="400" height="200">

----------------------------------------------------------------------------

## Server Endpoints

| HTTP Verb | Endpoint | Description |
|-----------|----------|-------------|
| POST | `/signup` | Registers a new user |
| POST | `/login` | Logs in an existing user |
| GET | `/check-favorite/:recipeId` | Checks if a recipe is favorited by the user |
| POST | `/add-favorite` | Adds a recipe to user's favorites |
| DELETE | `/remove-favorite/:recipeId` | Removes a recipe from user's favorites |
| GET | `/favorite-recipes` | Retrieves all favorite recipes for a user |


----------------------------------------------------------------------------
## Technical Challenges

1. Data Storage and Synchronization
   - Store data in local storage.
   - Implement read/write operations from/to local storage.
   - Handle merging of data when differences are detected.

2. Automatic User Notifications
   - Create a cron job to automatically email users about updates to their favorited recipes.
     
**Database Integration**

- PostgresSQL
- Prisma

 **External APIs**
 
- Spoonacular API

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

______________________________________
## Visuals and Interactions

- Interesting Cursor Interaction: Hovering over recipe cards, favorite icon, home icon

- UI Component with Custom Visual Styling: Footer containing contact information with cooresponding linked icons

- Loading State: Loading screen used when navigating between pages, fetching user's favorites, and searching for recipes.

_______________________________________
## Timeline

**Week 5: July 1 - July 7**

User Authentication 
- Implement sign-up and login functionality.

**Week 6: July 8 - July 14**

Recipe Finder and Display
- Integrate API into the project.
- Design and implement UI for displaying recipe details (ingredients, instructions, cooking time, nutritional facts).
- Implement recipe search functionality (by keywords, ingredients, cuisine types, dietary preferences).
- Enable users to save favorite recipes.

**Week 7: July 15 - July 21**

Favorite Recipes
- Design and develop UI for favoriting page.
- Implement functionality to add and remove meals from the favorites.

Search Feature
- Design and implement a search bar in the user interface.
- Develop backend functionality to process search queries.
- Implement search results display and navigate to a new page.

Load More Feature
- Implement the "Load More" button on the Homepage.
- Develop backend pagination support for the "Load More" functionality.

**Week 8: July 22 - July 26**

Technical Challenge 1 
- Store data in local storage, and when you fetch data, ensure that you write / read from local storage. If the data is different, handle the merging. 

Technical Challenge 2
- Create a cron job to automatically email users on updates of their favorited recipes.

----------------------------------------------------------------------------



