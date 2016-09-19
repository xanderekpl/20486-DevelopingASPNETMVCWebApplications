# Module 10: Using JavaScript and jQuery for Responsive MVC 4 Web Applications

# Lab: Using JavaScript and jQuery for Responsive MVC 4 Web Applications

#### Scenario

You have been asked to add a slideshow page to the web application that will show all the photos in the database. Unlike the **All Photos** gallery, which shows thumbnail images, the slideshow will display each photo in a large size. However, the slideshow will display only one photo at a time, and cycle through all the photos in the order of ID.

You want to use jQuery to create this slideshow because you want to cycle through the photos in the browser, without reloading the page each time. You also want to animate slide transitions and show a progress bar that illustrates the position of the current photo in the complete list. You will use jQueryUI to generate the progress bar.

Begin by importing a partially complete view that will display all photos simultaneously in the correct format. Then, change styles and add jQuery code to the application to create your slideshow.

#### Objectives

After completing this lab, you will be able to:

- Render and execute JavaScript code in the browser.
- Use the jQuery script library to update and animate page components.
- Use jQueryUI widgets in an MVC application.

#### Lab Setup

Estimated Time: **40 minutes**

Virtual Machine: **20486B-SEA-DEV11**

User name: **Admin**

Password: **Pa$$w0rd**

   >**Note:** In Hyper-V Manager, start the **MSL-TMG1** virtual machine, if it is not already running.

Before starting the lab, you need to enable the **Allow NuGet to download missing packages during build** option, by performing the following steps:

a. On the **TOOLS** menu of the **Microsoft Visual Studio** window, click **Options**.  
b. In the navigation pane of the **Options** dialog box, click **Package Manager**.  
c. Under the **Package Restore** section, select the **Allow NuGet to download missing packages during build** checkbox, and then click **OK**.

### Exercise 1: Creating and Animating the Slideshow View

#### Scenario

Your team has created a view that displays photos of the right size and format. However, the view displays all photos simultaneously, one below the other.

In this exercise, you will:

- Import the view and modify the style sheet so that the photos are displayed on top of each other.
- Using jQuery, set the order for each photo so that each photo is displayed sequentially.

The main tasks for this exercise are as follows:

1. Import and test the slideshow view.

2. Modify the style sheet.

3. Animate the photo cards in the slideshow.

4. Link to the script and test the animation.

#### Task 1: Import and test the slideshow view.

1. Start the virtual machine, and sign in with the following credentials:

   - Virtual machine: **20486B-SEA-DEV11**
   - User name: **Admin**
   - Password: **Pa$$w0rd**

2. Open the **PhotoSharingApplication.sln** file from the following location:

   - File location: **Allfiles (D):\Labfiles\Mod10\Starter\PhotoSharingApplication**

3. Add the **SlideShow.cshtml** view file to the **Photo** folder, from the following location:

   - File location: **Allfiles (D):\Labfiles\Mod10\Slide Show View**

4. In the **PhotoController.cs** file, edit the **SlideShow** action method. Instead of throwing an exception, return the **SlideShow** view you just added. Pass a list of all the photos in the **context** object as the model.
5. Add a new site map node to the **Mvc.sitemap** file to link to the **SlideShow** action by using the following information:

   - Tag: **&lt;mvcSiteMapNode&gt;**
   - Title: **Slideshow**
   - Visibility: **\***
   - Controller: **Photo**
   - Action: **SlideShow**

6. Start the web application in debugging mode, clear the browser cache, and then go to the **Slideshow** view to examine the results.
7. Stop debugging.

#### Task 2: Modify the style sheet.

1. In the **Content** folder, open the **PhotoSharingStyles.css** style sheet. Add the following properties to the style that selects **&lt;div&gt;** tags with the **slide-show-card** class:

   - position: absolute
   - top: **0**
   - left: **0**
   - z-index: **8**

2. Add a new style to the **PhotoSharingStyles.css** style sheet by using the following information:

   - Selector: **#slide-show DIV.active-card**
   - z-index: **10**

3. Add a new style to the **PhotoSharingStyles.css** style sheet by using the following information:
 
   - Selector: **#slide-show DIV.last-active-card**
   - z-index: **9**

4. Start debugging, and then clear the Internet Explorer browser cache to ensure that the style sheet is reloaded.
5. Navigate to the **Slideshow** view and examine the results.
6. Stop debugging.

#### Task 3: Animate the photo cards in the slideshow.

1. Add a new top-level folder, named **Scripts**, to the Photo Sharing application.
2. Add a new JavaScript file, **SlideShow.js**, to the **Scripts** folder.
3. In the **SlideShow.js** file, create the following global variables:

   - **percentIncrement**
   - **percentCurrent**

   Set the **percentCurrent** value to **100**.

4. Create a new **function** named **slideSwitch** with no parameters.
5. Within the **slideSwitch** function, add a line of code that selects the first **&lt;div&gt;** element with **active-card** class that is a child of the element with an ID of **slide-show**. Store this element in a new variable named **$activeCard**.
6. Add an **if** statement stating that if the **$activeCard** contains no elements, use the last **DIV** element with **slide-show-card** class that is a child of the element with an ID of **slide-show**.
7. Add a line of code that selects the next element after **$activeCard**. Store this element in a new variable named **$nextCard**.
8. Add an **if** statement stating that if **$nextCard** contains no elements, use the first **DIV** element with **slide-show-card** class and ID **slide-show**.
9. Add the **last-active-card** class to the **$activeCard** element.
10. Set the opacity of the **$nextCard** element to **0.0** by using the **css()** jQuery function.
11. Add the **active-card** class to the **$nextCard** element. This applies the **z-order** value **10**, from the style sheet.
12. Use the **animate()** function to fade the **$nextCard** element to opacity **1.0** over a time period of 1 second. When the **animate()** function is complete, remove the following classes from the **$activeCard** element:

    - **active-card**
    - **last-active-card**

13. Create a new anonymous function that runs when the document is fully loaded.
14. In the new anonymous function, use the **setInterval()** function to run the **slideSwitch()** function every 5 seconds.
15. Save all the changes.

#### Task 4: Link to the script and test the animation.

1. Open the **SlideShow.cshtml** view file.
2. Add a **SCRIPT** element that links to the **SlideShow.js** script file.
3. Start the application in debugging mode and go to the **Slideshow** view. Observe the fade effects.
4. Stop debugging.

  >**Results** : After completing this exercise, you should have successfully created a Photo Sharing application with a slideshow page that displays all the photos in the application, sequentially.

### Exercise 2: Optional—Adding a jQueryUI ProgressBar Widget

#### Scenario

The slideshow pages you added work well. Now, you have been asked to add some indication of progress through the slideshow. You want to use a progress bar to show the position of the current photo in the list of photos in the application. In this exercise, you will:

- Create a display by using the JQueryUI progress bar.
- Test the script that you created.

Complete this exercise if time permits.

The main tasks for this exercise are as follows:

1. Complete the slideshow view and template view.

2. Modify the slideshow script.

3. Test the slideshow view.

#### Task 1: Complete the slideshow view and template view.

1. Open the **SlideShow.cshtml** view file from the **Photo** folder.
2. Within the **&lt;div id=&quot;slideshow-progress-bar-container&quot;&gt;** element, add a new **&lt;div&gt;** element with the ID **slide-show-progress-bar.**
3. Add a **&lt;script&gt;** tag to the **Views/Shared/\_MainLayout.cshtml** view to link the view to jQuery UI. Ensure that the **&lt;script&gt;** tag appears after the other **&lt;script&gt;** tags in the **HEAD** element. Link the view to the following location: **http://ajax.aspnetcdn.com/ajax/jquery.ui/1.10.0/jquery-ui.min.js**
4. Add a **&lt;link&gt;** tag to link to the jQuery UI style sheet by using the following information:

   - Type: **text/css**
   - Rel: **stylesheet**
   - Href: **http://code.jquery.com/ui/1.9.2/themes/base/jquery-ui.css**

5. Save all the changes.

#### Task 2: Modify the slideshow script.

1. Open the **SlideShow.js** JavaScript file.
2. Create a new function named **calculateIncrement** that takes no parameters.
3. In the new function, create a new variable named **cardCount**. Use this variable to store the number of **&lt;div class=&quot;slide-show-card&quot;&gt;** elements within the **&lt;div id=&quot;slide-show&quot;&gt;** element.
4. Divide 100 by the **cardCount** variable, and store the result in **percentIncrement**.
5. Run the jQueryUI **progressbar()** function on the **&lt;div id=&quot;slidehow-progress-bar&quot;&gt;** element. Set the **value** to **100**.
6. Before the call to **setInterval()**, insert a call to the new **calculateIncrement()** function.
7. At the beginning of the **slideSwitch()** function, add the value of **percentIncrement** to the value of **percentCurrent**.
8. Add an **if** statement stating that if **percentCurrent** is more than **100**, set **percentCurrent** is to equal **percentIncrement**.
9. Run the jQueryUI **progressbar()** function on the **&lt;div id=&quot;slideshow-progress-bar&quot;&gt;** element. Set the value to **percentCurrent**.
10. Save all the changes.

#### Task 3: Test the slideshow view.

1. Start the web application in debugging mode and clear the browser cache. Go to the **Slideshow** view and examine the results.
2. Stop debugging and close Visual Studio.

  >**Results** : After completing this exercise, you should have successfully created a slideshow page with a progress bar that displays the position of the current photo in the list of photos.