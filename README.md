## What I'm building & why  
I'm making a ***recipe tracker***, which can help me track, well, recipes. I can start "drafting" a recipe, and the finished ones will be in another group/page. There will also be a feature to filter recipes based on what you listed as what you currently have. The special thing about it is (if I'm able to implement it as hoped) that it can recognize substitutes, optional, and must-have ingredients in a certain recipe. The filtered search will ask the user (me) what they want when it comes to that feature. Due to limited capabilities of what I know, I'll ask the user to only put the singular version of their ingredients, to help with the search algorithm. I wanted to make this program because I thought it might help in deciding what to eat, based on what I have.  

*Core idea:* In a lot of recipes, there might be flexibility in certain listed ingredients in terms of substitutes or optionality. The burden of that decision is on the user. Ex: "are chocolate chips optional on a brownie?"—— if listed as a must-have, for example, someone who has all the baking ingredients but lacking chocolate chips may be able to still bake brownies, but an algorithm that does not consider optionality/substitutes may not show that, if the specific recipe calls for chocolate chips. Maybe this is okay if the user really requires chocolate chips! But the user may want to mark it optional. For my current plan, I'm thinking of doing an account system, for the user creates "an account" (username and password) and uses that to log-in later. I believe a low-security version of this is doable if I figure out persistence in Javascript (won't be localStorage, as that kind of defeats the purpose of having an "account"). That will be the first page the user encounters. There will be 3 more pages that I've planned to facilitate the purpose of the website.  

**Page 1: Pantry - Ingredients list**: Here will be rendered cards of all ingredients the user has entered. The purpose is not what they *currently have* per se, but more so common ingredients they may refer to often. They will then be able to drag-and-drop those ingredients into the **cart** (or basket?). Those things in the cart actually represent what they *do* currently have. The point is to avoid having to re-type "eggs", "milk", "chicken", "paprika", "water" over and over, as they are common ingredients most households have almost all the time. The user may continue to remove things out of the basket via also drag-n-drop. I'm also thinking of a feature where new ingredients introduced in recipes automatically show up in the pantry, but this is **tentative**.  

**Page 2: Pending Recipes**: Recipes in draft. The user may create an instance of an empty "recipe" then edit it as they wish. They will only be able to mark it complete once all the required fields are entered. Once marked complete, the pending recipe will be "sent" to **Recipes Collection (Page 3)**. Some uses for this page may include writing down a name of a dish the user has just heard about but has no other information about it. Another use may be writing up a nameless recipe, or testing out a new recipe in writing. **This is the only page where they can edit a recipe, and the first place any recipe goes to**. I'm thinking of referring to an **external API** for pre-made recipes, but I haven't found a good one yet. Once I do, those "imported recipes" will still show up here. I might add another page for importing recipes, where the user selects which ones they want to take to this **Pending Recipes** page. Editing a draft will bring them to the **full page of the recipe**. When making the ingredients list, each ingredient will have a drop-down for whether it's optional. For substitutes, there will render a place to enter each substitute item (**max 3 per ingredient**).  

**Page 3: Recipes Collection**: This is where the search algorithm searches for recipes based on user input (by ingredient OR by name). It will filter by ingredients the user has in their cart, and whether they allow substitutes and recipes whose optional ingredients are missing from the cart. The user may **reset** their search filters. The recipe cards' recipe titles will be a link to the **full page of the recipe**, which will be formatted similar to recipe websites we can already find online (but way, way simpler and without a 3-page backstory), and uses **query strings** to render the appropriate recipe. Substitutes will be listed as (Substitutes: item1 / item 2 / item 3...). The side panel of the **Recipes Collection** page will also be a sliding side panel to see what you've got currently in your cart. ~~The user can press "Cook!" on a recipe to note that they made it (this is so I can incorporate a table in somehow)~~  

~~**Page 4: Stats**: Where the user can see dishes they've cooked the most. (Bonus if I could do it: make this stat include amount of times other people also cooked their recipe)~~  
**Page 4: Import Recipes** from an external API. Will render recipe cards based on user search, then the user may pick which ones to send to **Pending Recipes** (where they can make it their own)

## Project Plan
### 1) Week of 4/6  
> 1.1) Design layouts of Page 1, 2, 3, 4, and full Recipe page. Share a main layout  
> 1.2) Do placeholder styling for those 4 pages  
> 1.3) Get started on Page 2's functionality  
> 1.4) Structure data to maybe prepare for an account-based system via my own API later  
### 2) Week of 4/13
> 2.1) Page 2: user can create an "instance" of a recipe draft. A unique ID is generated for it.  
> 2.2) Page 2: user may click on a recipe draft card to edit its contents  
> 2.3) Page 2: user may "finish" the draft once all requirements are met. Once finished, the **full recipe page** turns into the non-Pending version, and that recipe gets sent to the **Recipes Collection** (in memory, it won't render there yet unless searched).  
> 2.4) Recipe cards have the same design for both Pending and Complete.  
> 2.5) Page 4: render recipes from external API according to user input
> 2.6) Page 4: user can "send to **Pending Recipes**" a recipe
### 3) Week of 4/20
> 3.1) Page 3: filters recipes based on input. Has pagination. User may enter a page number to skip to  
> 3.2) Page 3: can send a recipe back to the **Pending Recipes** (for editing/removing)  
> 3.3) Page 3: sliding side panel to see the basket  
> 3.4) Page 3: can keep track of how many times a recipe has been "Cooked!"  
> ~~3.5) Page 4: renders the top dishes by times-cooked table~~  
> 3.6) Page 3: each recipe card can redirect user to the right full-recipe page via **query string**  
### 4) Week of 4/27  
> 4.1) Page 1: user can enter ingredient. Will not allow duplicates (unable to distinguish singular vs. plural nouns, but will ask the user to only use singular versions)  
> 4.2) Page 1: user drag-and-drop ingredients into cart  
> 4.3) Polish up the account system (if still implementing that)  

## Requirements fulfilled  
### HTML Mastery  
> form: 3.1), 4.1), 2.2)  
> img: 2.2)  
> ~~table: 3.5)~~  
> ul/ol/dl: 4.2)  
> figure: 2.2)  
> section/article: 4.1), 4.2)  
> aside: 2.5) (as a brief explanation of the API search)  
> nav: 1.1)  

### CSS Mastery - should already use most of these by nature...  
> transitions: 3.3)  
> hover: buttons like in 2.3), 3.2), 3.4)  
> nth child: styling recipe cards  

### Javascript Mastery  
> map/filter: 3.1)  
> DOM manipulation: any rendering involved  
> event listeners: buttons like in 2.3), 3.2), 3.4), or forms like in 2.1)  
> multiple JS files & code organization: domain, ui, svc (may separate ui files for each page) **tentative**  
> async await and promises, network requests/ call API: via using external API (if I can't find a good recipe API to use, I might just use PokeAPI for the user to pick a profile picture, or something) **tentative**  
> query string: 3.6)  
> localStorage: for persistence? Or 4.2) **tentative**  

### Functional Requirements  
> multiple pages: see above  
> filter bar: 3.1)  
> external API: refer to **Javascript Mastery**  
> drag and drop: 4.2)  
> shared page layout: 1.1)  

## Hard Things - tentative  
> 15pts: back-end api  
> 10pts: Use static site generator (hugo, jekyll, etc.) for html and css

