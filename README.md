# Final Capstone

No sure what to cook? 

Turn to Honey Butter - Brought to You by the Rolling Scones! 

Honey Butter allows users to search for a food item (like Pasta or Chicken) and will display a list of suggested recipes that include that food item.

Users can create custom recipes and add them to their personal library. Each recipe includes an image, a list of ingredients, and instructions on how to prepare the food.

## Table of Contents

1. [Project Design](#project-design)
2. [Front End](#front-end)
3. [Development Stack](#development-stack)
4. [Database Design](#database-design)
5. [API Architecture](#api-architecture)
6. [Favorite Code](#favorite-code)
7. [Challenges](#challenges)

## Project Design

This is a group project created by [Robin](https://github.com/riotbrrrd), [Jane](https://github.com/jane-le-huynh), and [Roxy](https://github.com/roxyabedi) as part of the Niantic Voyager Bootcamp.

### Design Tools

Tools used for diagramming: 

* Excalidraw - used for wireframing and early-stage UI design
  * sketched out page layouts, navigation flows, and interface components
  * quickly iterated on designs during the brainstorming phase
![website-wireframe-diagram](https://github.com/user-attachments/assets/3e046765-aeac-43f0-8021-db1532e404bd)
* draw.io - used for website flow diagram and entity relationship diagrams for database modeling
  * defined entities (tables) and their attributes (columns)
  * illustrated relationships between entities
  * visualized foreign key constraints and database schema design
  * ensured the integrity and organization of the database structure
<img width="1218" alt="website-flow" src="https://github.com/user-attachments/assets/ed3a4733-2fd6-450c-b18d-8d0029a35549">

### Project Management

* Trello - used for project tasks and workflow
  * created boards to represent the overall project
  * used lists to define phases like Backlog, To Do, Doing, and Done
  * organized individual tasks as cards, with due dates, descriptions, and task assignments
 
<img width="1146" alt="trello" src="https://github.com/user-attachments/assets/3891e233-eec6-444e-acc8-cbca9c5b8c00">

## Front End

<img width="1792" alt="home-page" src="https://github.com/user-attachments/assets/d4ff91e0-084d-4dae-9ff6-e80ede58277b"> <br />

On the Search Recipe page, users can search for food items or specific recipes. Users can filter results based on Total Time to Cook, Cuisine, Diet, and Intolerances.

<img width="1792" alt="search-page" src="https://github.com/user-attachments/assets/fed282c3-8907-40ff-99f7-cf5fec4e8705"> <br />

Each recipe card opens up a Recipe Details page which gives the user more information about the recipe such as ingredients required and instructions.

<img width="1792" alt="recipe-details" src="https://github.com/user-attachments/assets/27de9b08-1d1f-4c5e-92bd-b32381a5960b"> <br />

Users can add recipes to their personal library.

<img width="1790" alt="user-library" src="https://github.com/user-attachments/assets/e1b7120b-424b-45e2-94dc-bb7586785df5"> <br />

Users can also add custom recipes to their personal library.

<img width="1790" alt="add-modal" src="https://github.com/user-attachments/assets/e61e1caa-3496-4e75-a961-45d94cec870d"> <br />

On their profile page, a user can see a preview of their personal library as well as some profile information. 

<img width="1792" alt="profile-page" src="https://github.com/user-attachments/assets/201ad250-010a-40b5-8702-eea77c95c360"> <br />

## Development Stack

The project utilizes a modern and scalable tech stack, combining backend, frontend, and database technologies to deliver a responsive and efficient web application.

### Backend
* Java: The backend is built with Java, using the Spring Boot framework. It provides RESTful APIs, handles business logic, and manages data persistence.
* Spring Boot: Simplifies Java application development with features like dependency injection, data access, and web security.
* Maven: Dependency management and build automation.
  
### Database
* MySQL: The application uses MySQL as the relational database management system to store and retrieve data. The database is designed with optimized schemas and relationships to ensure data integrity and performance.

### Frontend
* React: The frontend is built using React, a popular JavaScript library for building interactive user interfaces. It allows for the creation of reusable UI components and efficient management of application state.
* TypeScript: Adds static typing to JavaScript, helping to catch errors early in the development process and improving code maintainability.
* Bootstrap: Used for responsive and mobile-first UI design. Provides a grid system, pre-built components, and utilities for consistent styling across the app.

### External API

This project utilizes the [Spoonacular API](https://spoonacular.com/food-api/docs)

![Spring](https://img.shields.io/badge/spring-%236DB33F.svg?style=for-the-badge&logo=spring&logoColor=white)
![MySQL](https://img.shields.io/badge/mysql-4479A1.svg?style=for-the-badge&logo=mysql&logoColor=white)
![Java](https://img.shields.io/badge/java-%23ED8B00.svg?style=for-the-badge&logo=openjdk&logoColor=white)
![typescript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Apache Maven](https://img.shields.io/badge/Apache%20Maven-C71A36?style=for-the-badge&logo=Apache%20Maven&logoColor=white)
![Bootstrap](https://img.shields.io/badge/bootstrap-%238511FA.svg?style=for-the-badge&logo=bootstrap&logoColor=white)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![IntelliJ IDEA](https://img.shields.io/badge/IntelliJIDEA-000000.svg?style=for-the-badge&logo=intellij-idea&logoColor=white)
![Visual Studio Code](https://img.shields.io/badge/visual%20studio%20code-%230078d7.svg?logo=visual-studio-code&logoColor=white&style=for-the-badge)

## Database Design

<img width="1541" alt="database" src="https://github.com/user-attachments/assets/1543bf05-d249-4e56-9444-6c353bf78377">

### Users Table
This table stores information about the user.

### Recipes List Table
This table stores information about all recipes, custom and external, as well as which user the recipe belongs to.

### Custom Recipes Table
This table stores information about the custom recipe details and which user created it.

### External Recipes Table
This table stores information about the external recipe details. 

## API Architecture

The RecipeListController is a REST Controller that handles incoming requests and sends responses back to the client. The REST Controller maps requests to the handler methods to process incoming data and return responses. The MySqlRecipeListDao and the MySqlUserDao are responsible for database interactions. 

## Favorite Code

### Robin's Favorite Code

```java
public List<RecipeSearch> getUserLibrary(int userId)
    {
        List<RecipeSearch> library = new ArrayList<RecipeSearch>();

        String sql = """
                SELECT
                        r.id
                        , r.is_custom
                        , r.custom_id
                        , e.api_id
                        , c.title AS custom_title
                        , e.title AS external_title
                        , c.image AS custom_image
                        , e.image AS external_image
                        , e.external_id AS external_id
                    FROM recipes_list as r
                    LEFT JOIN custom_recipes as c ON r.user_id = c.user_id and r.custom_id = c.id and r.is_custom = 1
                    LEFT JOIN external_recipes e ON e.user_id=r.user_id and r.external_id = e.external_id and r.is_custom = 0
                    WHERE r.user_id = ?;
                """;

        var row = jdbcTemplate.queryForRowSet(sql, userId);

        while(row.next())
        {
            boolean isCustom = row.getBoolean("is_custom");
            int customId = row.getInt("custom_id");
            int apiId = row.getInt("api_id");
            String customTitle = row.getString("custom_title");
            String externalTitle = row.getString("external_title");
            String customImage = row.getString("custom_image");
            String externalImage = row.getString("external_image");
            int id = row.getInt("id");
            int externalId = row.getInt("external_id");

            library.add(new RecipeSearch(id, userId, isCustom, customId, apiId, customTitle, externalTitle, customImage, externalImage, externalId));
        }
        return library;
    }
```

### Jane's Favorite Code

```typescript
const [recipes, setRecipes] = useState<SearchResults[]>([]);
    const [action, setAction] = useState<string>("");
    const [search, setSearch] = useState<string>("");
    const [filter, setFilter] = useState<string>("");

    useEffect(() => {

        loadRecipes();

    }, [action])

    async function loadRecipes() {
        const searchResults = await spoonacularService.getRecipesByUserInput(action + "&number=9&instructionsRequired=true");
        setRecipes(searchResults.results);
    }

    function searchHandler(event: FormEvent) {
        event.preventDefault();
    }

    function buildFilters(filterStr: string) {
        setFilter(filterStr);
        setAction(search + filterStr);
    }

    function buildSearch(searchStr: string) {
        setSearch("&query=" + searchStr);
    }
```
```typescript
export default function Diet(props: {onDietApply: any}) {
const map = new Map<string, boolean>();
    const [dietMap, setDietMap] = useState<Map<string, boolean>>(map);

    function dietQuery(event: FormEvent)
    {
        event.preventDefault();

        let dietQueryString = "&diet=";

        for (let key of dietMap.keys())
        {
            if (dietMap.get(key)) dietQueryString = dietQueryString + key + ','
        }

        // if there is no checked boxes, set it to empty string
        if (dietQueryString === "&diet=") dietQueryString = ""
        
        if (props.onDietApply) props.onDietApply(dietQueryString);
    }
```

### Roxy's Favorite Code

```typescript
async function getRecipe() {

        const library = await recipesListService.getUserLibrary();
        const externalLibrary = library.filter((card: LibraryRecipeCard) => !card.isCustom)
            .map((card: LibraryRecipeCard) => card.apiId)

        setUserExternalLibrary(externalLibrary)

        if (+custom == 0) {
            const selectedRecipe = await spoonacularService.getRecipeById(+id);
            setRecipeData(selectedRecipe);
            setHtmlInstructions(selectedRecipe.instructions);

            if (userExternalLibrary.includes(+id)) {
                setAction('delete')
            }
            else {
                setAction('add')
            }
        }

        else {
            const selectedCustomRecipe = await recipesListService.getCustomRecipeById(+id)
            setCustomRecipeData(selectedCustomRecipe);
            setHtmlInstructions(selectedCustomRecipe.instructions);
            setHtmlIngredients(typeof selectedCustomRecipe.extendedIngredients === "string" ? selectedCustomRecipe.extendedIngredients : "no ingredients")
        }
    }
```

```typescript
async function editCustomRecipe(event: FormEvent) {
        event.preventDefault();

        let instructionsString = instructions.replace(/\n/g, "<br />\r\n");
        let ingredientsString = ingredients.replace(/\n/g, "<br />\r\n");

        const newRecipe = {
            id: +id,
            title: title ? title : customRecipeData!.title,
            image: imageUrl ? imageUrl : customRecipeData!.image,
            instructions: instructions ? instructionsString : customRecipeData!.instructions,
            extendedIngredients: ingredients ? ingredientsString : customRecipeData!.extendedIngredients,
        }

        await recipesListService.editCustomRecipe(newRecipe);

        setAction(newRecipe.title + newRecipe.instructions + newRecipe.image + newRecipe.extendedIngredients);
    }
```

## Challenges

* Asynchronous Functions - remembering to await the return of data to use it properly. Also important when using state to grab information that may still be processing in the background.
* Passing Props - how to structure a prop using typeScript. Previously we had done this with javaScript, so it was a learning process trying to pass props using typeScript.
* Setting up Filter Functionality Through Checkboxes - initially we tried to do individual states for each checkbox, then we tried to use an array of booleans, and ultimately settled on using a map.
* Database Design - figuring out how to hold information about custom and external recipes in each table. This was also important for the various CRUD operations that were required.
