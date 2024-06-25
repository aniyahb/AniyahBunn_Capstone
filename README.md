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

**Features**

Recipe Finder 
- Functionality: Allow users to search for recipes by keywords, ingredients, cuisine types, and dietary preferences.
- Integration: Utilize an  API for a recipe database and nutritional information.
  
Recipe Display
- Functionality: Display detailed information for each recipe including ingredients, instructions, cooking time, and nutritional facts.
- User Interaction: Enable users to save favorite recipes and share recipes via social media.

Meal Planner
- Functionality: Enable users to plan meals for specific days of the week.
- Management: Allow editing, adding, and removing meals from the planner.
- Integration: Link with saved recipes to seamlessly add recipes to the meal plan.

Shopping List
- Functionality: Automatically generate a shopping list based on selected recipes and meal plans.
- Customization: Allow users to modify the shopping list by adding, removing, or editing items.

User Authentication and Profile
- Authentication: Secure sign-up and login functionality for registered users.
- User Profiles: Enable users to update personal information, dietary preferences, and manage saved recipes and meal plans.

Social Sharing
Functionality: Integrate sharing options for users to share recipes and meal plans with friends and family.

----------------------------------------------------------------------------


## User Profiles:

Guest User: Unauthenticated users who can look through recipes and use basic features 
- Search for recipes
- View recipes details 

Registered User: Authenticated users who have created an account and logged in 
- All guest user abilities 
- Save favorite recipes 
- Create and manage meal plans 
- Generate and manage shopping lists 
- Access and edit profile and preferences

----------------------------------------------------------------------------

## User Stories:
- As a guest user, I want to search for recipes so that I can find meal inspiration 

- As a guest user, I want to view the details of a recipe so that I can see the ingredients and cooking instructions

- As a guest user, I want to look through popular  recipes so that I can discover new foods to try 

- As a guest user, I want to filter recipes by dietary preferences (e.g., vegetarian, gluten-free, haram)  so that I can find suitable options 

- As a registered user, I want to save my favorite recipes so that I can easily find them later. 

- As a registered user, I want to create meal plans for the week so that I can organize my meals ahead of time.

- As a registered user, I want to generate a shopping list based on my meal plan so that I can have all the ingredientsI need.

- As a registered user, I want to edit my meal plan so that I can make changes if needed.

- As a registered user, I want to access my profile to update my personal information and preferences.

- As a registered user, I want to log in and out of my account securely so that my personal data is protected. 

- As a registered user, I want to share recipes I like to my friends via text, link sharing, email, etc..


----------------------------------------------------------------------------
## Screen Archetypes
<img src="https://github.com/aniyahb/AniyahBunn_Capstone/assets/114838551/b5b723f5-023d-4f91-820d-af0cbb560920" width="400" height="200">

<img src="https://github.com/aniyahb/AniyahBunn_Capstone/assets/114838551/8ea3b187-3769-4b3a-8d3d-f1cea8409fdd" width="400" height="200">

<img src="https://github.com/aniyahb/AniyahBunn_Capstone/assets/114838551/bc9fc72c-e0ea-4e0d-92e6-74f016cebba4" width="400" height="200">

<img src="https://github.com/aniyahb/AniyahBunn_Capstone/assets/114838551/aa08f230-ff48-494f-868f-a96c874a25c5" width="400" height="200">







----------------------------------------------------------------------------

## Server Endpoints:
| HTTP Verb | Name | Description | User Story | 
------------|------|-------------|------------|
POST | LogIn | Logs in an existing user.| 10
POST | SignUp| Registers a new user. |10
POST | LogOut | Logs out the current user.| 10
GET | users | Retrieves the profile information of a user.| 9
PUT | users | Updates the profile information of a user | 9
GET | recipe_search | Searches for recipes based on query parameters. |1
GET | recipe | Retrieves details of a specific recipe. | 2
GET | recipe_popular | Retrieves a list of popular recipes. | 3
GET | recipr_filter | Filters recipes by dietary preferences. | 4
POST | meal_plans | Creates a new meal plan for the user. | 6
GET | meal_plans | Retrieves all meal plans for a specific user. | 6
PUT | meal_plans | Updates a specific meal plan | 8
DELETE | meal_plans | Deletes a specific meal plan. | 8
POST | shopping_list | Generates a shopping list based on a meal plan. | 7
GET | shopping_list | Retrieves a specific shopping list. | 7
PUT | shopping_list | Updates a specific shopping list. | 7 
DELETE | shopping_list | Deletes a specific shopping list. | 7
POST | recipes_share | Shares a recipe with others via various methods. | 11




