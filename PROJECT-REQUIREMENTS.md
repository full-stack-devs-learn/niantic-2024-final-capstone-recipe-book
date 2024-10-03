# Project Requirements

This is a high level description of your project. You should create detailed requirements and update this document
with those requirements. This will guide your development throughout the remainder of the project.

## Recipe Book

No sure what to cook? Turn to the Recipe Book. The recipe book lets users search for a food item 
(like Pasta or Chicken) and it will display a list of suggested recipes that include that food.

Users can create new recipes and add them to the app. Each recipe includes a list of ingredients 
and instructions on how to prepare the food.

But wait... there's more... users can add recipes to their daily or weekly menu and have a schedule 
for what they want to cook. Then, they can create a shopping list of all the ingredients that they 
need to purchase for the week.


## Organize Requirements Below

### External API: [Spoonacular](https://spoonacular.com/food-api/docs)

### 4 Main Features

#### Recipe Search with Filters
A search page where visitors can search for certain recipes and filter recipes based on preferences. Visitors can preview a recipe before deciding to be redirected to the recipe details page. 
* Filters: equipment, cuisine, max ready time, diet, intolerances
* Search Bar: specific recipe (title match & keyword search)

#### Personal Library
Logged in users have access to a personal list of bookmarked recipes.
* Saved recipes include custom recipes & recipes from the external API
* Search bar to lookup a bookmarked recipe
* Add recipe button
* Recipe card creation & display

#### Custom Recipe
Logged in users can add their own custom recipes to their personal library.
* Form: Instructions, Ingredients, Equipment, Ready Time, Cuisine
* Custom database

#### STRETCH GOAL - Meal Planner & Shopping List
Logged in users can meal plan on a weekly basis and generate a shopping list based on ingredients from recipes.
* Meal Planner Calendar
* Add to Shopping List / Generate Shopping List


### Users
#### Non-User
* Can see recipes from External API
#### User
* Can see recipes from External API
* Personal Library
* Custom Recipe
#### Admin
* Can see recipes from External API
* Sees all custom recipes from all users
* Delete recipes based on guidelines