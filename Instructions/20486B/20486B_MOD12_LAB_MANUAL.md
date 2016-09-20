# Module 12: Building a Resilient ASP.NET MVC 4 Web Application

# Lab: Building a Resilient ASP.NET MVC 4 Web Application

#### Scenario

The senior developer has asked you to implement the following functionality in your Photo Sharing web application.

- Any visitor of the application, including anonymous users, should be able to mark a photograph as a favorite.
- If a user has marked a favorite, a link should be available to display the favorite photo.
- Favorite photos should be displayed in the slideshow view.

#### Objectives

After completing this lab, you will be able to:

- Store a setting for an anonymous or authenticated user in session state.
- Check a user preference when rendering an action link.
- Render a webpage by checking state values in the application.

#### Lab Setup

Estimated Time: **45 minutes**

Virtual Machine: **20486B-SEA-DEV11**

User name: **Admin**

Password: **Pa$$w0rd**

   >**Note:** In Hyper-V Manager, start the **MSL-TMG1** virtual machine, if it is not already running.

Before starting the lab, you need to perform the following step:

- Download **Manage Nuget packages** from the **Project** menu and note the version number for the **jquery.ui** package.
- Enable the **Allow NuGet to download missing packages during build** ption, by performing the following steps:

  a. On the **TOOLS** menu of the **Microsoft Visual Studio** window, click **Options**.  
b. In the navigation pane of the **Options** dialog box, click **Package Manager**.  
c. Under the **Package Restore** section, select the **Allow NuGet to download missing packages during build** checkbox, and then click **OK**.

### Exercise 1: Creating Favorites Controller Actions

#### Scenario

You have been asked to build functionality that stores the favorite photos of the visitors in the session state of the web application. After users add photos to their favorites, they will be able to view a slideshow of all the photos they selected as favorites.

In this exercise, you will:

- Create the Favorites Slideshow action.
- Create the Add Favorite action.

The main tasks for this exercise are as follows:

1. Create the Favorites Slideshow action.

2. Create the Add Favorite action.

#### Task 1: Create the Favorites Slideshow action.

1. Start the virtual machine, and sign in with the following credentials:

    - Virtual machine: **20486B-SEA-DEV11**
    - User name: **Admin**
    - Password: **Pa$$w0rd**

2. Open the **PhotoSharingApplication.sln** file from the following location:

    - File location: **Allfiles (D:)\Labfiles\Mod12\Starter\PhotoSharingApplication**

3. In the **PhotoController.cs** code file, add a new action by using the following information:

    - Scope: **public**
    - Return type: **ActionResult**
    - Name: **FavoritesSlideShow**

4. In the **FavoritesSlideShow** action, create and instantiate a new enumerable list of **Photo** objects named **favPhotos**.
5. Create a new enumerable list of integers named **favoriteIds**. Set this list to be equal to the **Session[&quot;Favorites&quot;]** variable by casting this variable as a list of integers.
6. If **favoriteIds** is null, set **favoriteIds** to be a new enumerable list of integers.
7. Create a new **Photo** object named **currentPhoto**. Do not instantiate the new object.
8. Create a new **foreach** code block that loops through all the integers in the **favoriteIds** list.
9. For each integer in the **favoriteIds** list, obtain the **Photo** object with the right ID value by using the **context.FindPhotoById()** method. Store the object in the **currentPhoto** variable.
10. If the **currentPhoto** variable is not equal to **null**, then add **currentPhoto** to the **favPhotos** list.
11. At the end of the **FavoritesSlideShow** action, return the **SlideShow** view and pass the **favPhotos** list as a model class.
12. Save all the changes.

#### Task 2: Create the Add Favorite action.

1. Add a new action to the **PhotoController.cs** file by using the following information:

    - Scope: **public**
    - Return type: **ContentResult**
    - Name: **AddFavorite**
    - Parameter: an integer named **PhotoId**

2. Create a new enumerable list of integers named **favoriteIds**. Set this list to be equal to the **Session[&quot;Favorites&quot;]** variable, by casting the variable as a list of integers.
3. If **favoriteIds** is null, set **favoriteIds** to be a new enumerable list of integers.
4. Add the **PhotoId** value to the **favoriteIds** list of integers.
5. Set the **Session[&quot;Favorites&quot;]** variable to equal the **favoriteIds** variable.
6. Return HTML content by using the following information:

    - Method: **Content()**
    - Content: **The picture has been added to your favorites**
    - Content type: **text/plain**
    - Encoding: **System.Text.Encoding.Default**

7. Save all the changes.

>**Results**: After completing this exercise, you should have successfully created controller actions that store values in the session state of the web application, and retrieved values from the same session state.

### Exercise 2: Implementing Favorites in Views

#### Scenario

You have created the necessary controller actions to implement favorite photos. Now, you should implement the user interface components to display a control for adding a favorite. If a user has favorites, you should display a link to the **FavoritesSlideShow** action.

In this exercise, you will:

- Add an AJAX action link in the Photo Display view.
- Add a link and update the site map.

The main tasks for this exercise are as follows:

1. Add an AJAX action link in the Photo Display view.

2. Add a link and update the site map.

3. Test favorites.

#### Task 1: Add an AJAX action link in the Photo Display view.

1. Open the **Display.cshtml** view for the **Photo** controller.
2. At the end of the **&lt;div class=&quot;photo-metadata&quot;&gt;** element, insert a new **&lt;div&gt;** element with the ID, **addtofavorites**.
3. In the **DIV** element, include the **Ajax.ActionLink()** helper to render a link to the **AddFavorite** action by using the following information:

    - Text: **Add this photo to your favorites**
    - Action: **AddFavorite**
    - Controller: **Photo**
    - Route values: Pass the **Model.PhotoID** value to the **PhotoId** action parameter.
    - Pass a new **AjaxOptions** object.
    - Update target ID: **addtofavorites**
    - HTTP method: **GET**
    - Insertion mode: **Replace**

4. Save all the changes.

#### Task 2: Add a link and update the site map.

1. Open the **_MainLayout.cshtml** view for editing.
2. After the breadcrumb trail, add a Razor **@if** statement to ensure that the **Session[&quot;Favorites&quot;]** variable is not null.
3. If the **Session[&quot;Favorites&quot;]** variable is not null, render a **&lt;div&gt;** element with the ID, **favorites-link**.
4. In the **DIV** element, render a link to the **FavoritesSlideShow** action by using the following information:

    - Helper: **Html.ActionLink()**
    - Link text: **Favorite Photos**
    - Action: **FavoritesSlideShow**
    - Controller: **Photo**

5. Save all the changes.
6. Open the **Mvc.sitemap** file.
7. Add a new site map node to the **Mvc.sitemap** file by using the following information:

    - Title: **Favorites**
    - Visibility: **SiteMapPathHelper,!\***
    - Controller: **Photo**
    - Action: **FavoritesSlideShow**

8. Save all the changes.

#### Task 3: Test favorites.

1. Start the web application in debugging mode.
2. Add three photos of your choice to your favorite photos.
3. Go to the home page and click the Favorite Photos link.
4. Stop debugging and close Visual Studio.

>**Results**: After completing this exercise, you will be able to:
>- Create the user interface components for the favorite photos functionality.
>- Test the functionality of the user interface components.