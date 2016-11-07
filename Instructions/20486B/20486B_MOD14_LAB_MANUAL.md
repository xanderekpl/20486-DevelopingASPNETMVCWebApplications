# Module 14: Implementing Web APIs in ASP.NET MVC 4 Web Applications

# Lab: Implementing APIs in ASP.NET MVC 4 Web Applications

#### Scenario

Your manager wants to ensure that the photos and information stored in the Photo Sharing application can be integrated with other data in web mash-ups, mobile applications, and other locations. To re-use such data, while maintaining security, you need to implement a RESTful Web API for the application. You will use this Web API to display the locations of photos on a Bing Maps page.

#### Objectives

After completing this lab, you will be able to:

- Create a Web API by using the new features of ASP.NET MVC 4.
- Add routes and controllers to an application to handle REST requests.
- Call a REST Web API from jQuery client-side code.

#### Lab Setup

Estimated Time: **60 minutes**

Virtual Machine: **20486B-SEA-DEV11**

User name: **Admin**

Password: **Pa$$w0rd**

**Note:** In Hyper-V Manager, start the **MSL-TMG1** virtual machine if it is not already running.

Before initiating this lab, perform the following steps:

1. Apply the Snapshot of the virtual machine, **20486B-SEA-DEV11**, that was taken after completing the lab in module 13.
2. Navigate to **Allfiles(D):\Mod 13\Labfiles\Starter\PhotoSharingApplication\PhotoSharingApplication**, and then copy the **web.config** file.
3. Navigate to **Allfiles(D):\Mod 14\Labfiles\Starter\PhotoSharingApplication\PhotoSharingApplication**, and then paste the **web.config** file.
4. Enable the **Allow NuGet to download missing packages during build** option by performing the following steps:

   a.  On the **TOOLS** menu of the Microsoft Visual Studio window, click **Options**.  
   b.  In the navigation pane of the **Options** dialog box, click **Package Manager**.  
   c.  Under the **Package Restore** section, select the **Allow NuGet to download missing packages during build** check box, and then click **OK**.

### Exercise 1: Adding a Web API to the Photo Sharing Application

#### Scenario

You have been asked to implement a Web API for the Photo Sharing application to ensure that photos can be used in third-party websites, mobile device applications, and other applications.

In this exercise, you will:

- Add a Web API controller for the Photo model class.
- Configure formatters and routes to support the Web API.
- Test the API by using Internet Explorer.

The main tasks for this exercise are as follows:

1. Add a Photo API controller.

2. Configure API routes.

3. Configure media-type formatters.

4. Test the Web API with Internet Explorer.

#### Task 1: Add a Photo API controller.

1. Start the virtual machine and sign in with the following credentials:

    - Virtual machine: **20486B-SEA-DEV11**
    - User name: **Admin**
    - Password: **Pa$$w0rd**

2. Open the **PhotoSharingApplication** solution from the following location:

    - File location: **Allfiles(D):\Mod14\Labfiles\Starter\PhotoSharingApplication**

3. Add a new API controller to the **PhotoSharingApplication** project by using the following information:

    - Name: **PhotoApiController**
    - Template: **Empty API controller**

4. In **PhotoApiController.cs**, add a **using** statement for the following namespace:

    - **PhotoSharingApplication.Models**

5. Add a new variable to the **PhotoApiController** class by using the following information:

    - Scope: **private**
    - Type: **IPhotoSharingContext**
    - Name: **context**
    - Initial value: a new **PhotoSharingContext** object

6. Add a new action to **PhotoApiController** by using the following information:

    - Scope: **public**
    - Return type: **IEnumerable&lt;Photo&gt;**
    - Name: **GetAllPhotos**
    - Parameters: none

7. In the **GetAllPhotos** action, return the **context.Photos** collection as an enumerable object.
8. Add a new action to **PhotoApiController** by using the following information:

    - Scope: **public**
    - Return type: **Photo**
    - Name: **GetPhotoById**
    - Parameters: an integer named **id**

9. In the **GetPhotoById** action, pass the **id** parameter to the **context.FindPhotoById()** method. Store the returned **Photo** object in a variable named **photo**.
10. If the **photo** variable is **null**, throw a new **HttpResponseException** and pass the **HttpStatusCode.NotFound** value.
11. At the end of the **GetPhotoById** action, return the **photo** object.
12. Add a new action to **PhotoApiController** by using the following information:

    - Scope: **public**
    - Return type: **Photo**
    - Name: **GetPhotoByTitle**
    - Parameters: a string named **title**

13. In the **GetPhotoByTitle** action, pass the **title** parameter to the **context.FindPhotoByTitle()** method. Store the returned **Photo** object in a variable named **photo**.
14. If the **photo** variable is **null**, throw a new **HttpResponseException** and pass the **HttpStatusCode.NotFound** value.
15. At the end of the **GetPhotoByTitle** action, return the **photo** object.
16. Save all the changes.

#### Task 2: Configure API routes.

1. In the WebApiConfig.cs code file, in the **Register** method, remove all existing route registrations.
2. Add a new route to the **Register** method by using the following information:

    - Name: **PhotoApi**
    - Route template: **api/photos/{id}**
    - Default controller: **PhotoApi**
    - Default action: **GetPhotoById**
    - Constraint: **id= &quot;[0-9]+&quot;**

3. After the **PhotoApi** route, add a new route to the **Register** method by using the following information:

    - Name: **PhotoTitleApi**
    - Route template: **api/photos/{title}**
    - Default controller: **PhotoApi**
    - Default action: **GetPhotoByTitle**

4. After the **PhotoTitleApi** route, add a new route to the **Register** method by using the following information:

    - Name: **PhotosApi**
    - Route template: **api/photos**
    - Default controller: **PhotoApi**
    - Default action: **GetAllPhotos**

5. Save all the changes.

#### Task 3: Configure media-type formatters.

1. In the **WebApiConfig.cs** code file, at the end of the **Register** method, create a new variable named **json**. Set this variable to **config.Formatters.JsonFormatter**.
2. Set the **json.SerializerSettings.PreserveReferencesHandling** property to **Newtonsoft.Json.PreserveReferencesHandling.Objects**.
3. Remove the **XmlFormatter** object from the **config.Formatters** collection.
4. Save all the changes.

#### Task 4: Test the Web API with Internet Explorer.

1. Start that web application in the debugging mode.
2. Request the photo with ID 4 by using the Web API. Display the returned JSON file by using Visual Studio and check that the **Title** property is **Sample Photo 4**.
3. Request the photo with title **Sample Photo 5** by using the Web API. Display the returned JSON file by using Visual Studio and check that the **Title** property is **Sample Photo 5**.
4. Request all photos by using the Web API. Display the returned JSON file by using Visual Studio, and check that both **Sample Photo 9** and **Sample Photo 13** are present.
5. Close Visual Studio and stop debugging.

>**Results**: After completing this exercise, you should have successfully created a simple Web API for an ASP.NET MVC 4 web application.

### Exercise 2: Using the Web API for a Bing Maps Display

#### Scenario

You need to use the new Web API to obtain the photos in the client-side jQuery code. You will use the latitude and longitude properties to display these photos as pins on a Bing API map.

To create the map display in the Photo Sharing application, you must add a new view and action for the photo controller. You must also add a new template view because the Bing Maps AJAX control requires a different **&lt;!DOCTYPE&gt;** directive to the one in use elsewhere in the Photo Sharing application. You will import a JavaScript file with basic Bing Maps code in it. To this JavaScript file, you will add code to call the Web API, obtain photo details, and display them on the map.

In this exercise, you will:

- Create a new template view.
- Create a map action, view, and script file.
- Obtain and display photos.
- Test the Bing Maps control.

The main tasks for this exercise are as follows:

1. Create a new template view.

2. Create a map action, a view, and a script file.

3. Configure the Bing Maps Key

4. Obtain and display photos.

5. Test the Bing Maps control.

#### Task 1: Create a new template view.

1. In the **Views/Shared** folder, create a copy of the **_MainLayout.cshtml** view file and name the copy as **_MapLayout.cshtml**.
2. In the **_MapLayout.cshtml** file, replace the **&lt;!DOCTYPE html&gt;** declaration with **&lt;!DOCTYPE html PUBLIC &quot;-//W3C/DTD XHTML 1.0 Transitional//EN&quot; &quot;http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd&quot;&gt;**.
3. In the **onload** event of the **BODY** element, call the **GetMap()** JavaScript function.
4. Remove the links to jQueryUI and Unobtrusive AJAX.
5. Add a new link to the Bing Maps AJAX control in the **HEAD** element by using the following information:

    - Charset: **UTF-8**
    - Type: **text/javascript**
    - SRC: **http://www.bing.com/api/maps/mapcontrol?branch=release**

6. Save all the changes.

#### Task 2: Create a map action, a view, and a script file.

1. Add a new action to the **PhotoController** class by using the following information:

    - Scope: **public**
    - Return type: **ViewResult**
    - Name: **Map**
    - Parameters: none

2. In the new **Map** action, return a **View** named **Map**.
3. Add a new view for the **Map** action by using the following information:

    - View name: **Map**
    - Type: Do not create a strongly-typed view
    - Layout: **_MapLayout.cshtml**

4. Remove the **H2** element from the **Map.cshmtl** view.
5. Add a new JavaScript block to the **Map.cshtml** view.
6. In the new JavaScript block, create a new variable named **webApiUrl** by using the **Url.Content()** helper and set the **webApiUrl** variable to **~/api/photos**.
7. Create a new variable named **pictureUrl** by using the **Url.Action()** helper and set the **pictureUrl** variable to the URL of the **GetImage** action of the **Photo** controller. Include a forward slash at the end of the URL.
8. Create a new variable named **displayUrl** by using the **Url.Action()** helper and set the **displayUrl** variable to the URL of the **Display** action of the **Photo** controller. Include a forward slash at the end of the URL.
9. Add a new JavaScript script, with an empty **src** attribute, to the **Map.cshtml** view.
10. Use the **Url.Content()** helper to set the **src** attribute in the new JavaScript code to **~/Scripts/MapDisplay.js**.
11. Create a new **DIV** element by using the following information:

    - ID: **mapDiv**
    - Style position: **absolute**
    - Style width: **650px**
    - Style height: **400px**

12. Add the **MapDisplay.js** JavaScript file to the **Scripts** folder from the following location:

- **Allfiles(D):\Mod14\Labfiles\Bing Maps Script**

13. Add a new node to the site map by using the following information:

- Title: **Map**
- Visibility: **\***
- Controller: **Photo**
- Action: **Map**

14. Save all the changes.

#### Task 3: Configure the Bing Maps Key

1. Go to the following webpage:

    - **https://www.bingmapsportal.com**.

2. Sign in to your Microsoft account by using the following credentials:

    - User name: _&lt;Your Windows Live account name&gt;_
    - Password: &lt;_Your Windows Live account password_&gt;

3. From the **Bing Maps Account Center** page, copy the key you created for the Photo Sharing application in the previous lab.
4. In the **MapDisplay.js** file, paste the key that was copied from the **Bing Maps Account Center** page as a value for **Credentials**.
5. Save all the changes.
6. Start the web application in the debugging mode and browse to the **Map** page.
7. Stop debugging.

#### Task 4: Obtain and display photos.

1. In the **MapDisplay.js** script file, add a new function by using the following information:

    - Name: **GetPhotos**
    - Parameter: **serviceUrl**

2. Set the **$.support.cors** value to **true**.
3. Use the **$.ajax()** jQuery function to call the **GetPhotos** Web API by using the following information:

    - URL: **serviceUrl**
    - Type: **GET**
    - Data type: **json**
    - Success: **DisplayPics**
    - Error: **OnError**

4. Add a new function by using the following information:

    - Name: **DisplayPics**
    - Parameter: **response**

5. In the **DisplayPics** function, create two variables named **location** and **pin**.
6. Use the jQuery **$.each** function to loop through all the **photo** objects in the **response** collection.
7. For each **photo** object in the **response** collection, set the **location** variable to a new location by using the following information:

    - Object: **Microsoft.Maps.Location**
    - Latitude: **photo.Latitude**
    - Longitude: **photo.Longitude**

8. Set the **pin** variable to a new push pin by using the following information:

    - Object: **Microsoft.Maps.Pushpin**
    - Location: **location**

9. Set the **pin.Title** property to **photo.Title** and the **pin.ID** property to **photo.PhotoID**.
10. Ensure that the **DisplayInfoBox** method handles the **click** event for pushpins by using the following information:

    - Method: **Microsoft.Maps.Events.addHandler**
    - Object: **pin**
    - Event: **&#39;click&#39;**
    - Handler method: **DisplayInfoBox**

11. Add the **pin** object to the **entities** property of the **map** object by using the **push** function.
12. Add a new function by using the following information:

    - Name: **OnError**
    - Parameter: **response**

13. In the **OnError** function, use the **alert** function to inform the user that the picture coordinates could not be obtained.
14. At the end of the **GetMap** function, call the **GetPhotos** function and pass the **webApiUrl** variable.
15. Save all the changes.

#### Task 5: Test the Bing Maps control.

1. Start the web application in the debugging mode and browse to the **Map** page to check the map control.
2. Click a pin of your choice.
3. Click the thumbnail.
4. Stop debugging and close Visual Studio.

>**Results**: After completing this exercise, you should have successfully created a template view to display a Bing Map AJAX control, and created a view and script file to display a Bing Map. You should have also used jQuery to call a Web API and obtain the details of photos. You should have then mashed up the data from a web API with Bing Maps data.

©2016 Microsoft Corporation. All rights reserved.

The text in this document is available under the  [Creative Commons Attribution 3.0 License](https://creativecommons.org/licenses/by/3.0/legalcode), additional terms may apply. All other content contained in this document (including, without limitation, trademarks, logos, images, etc.) are  **not**  included within the Creative Commons license grant. This document does not provide you with any legal rights to any intellectual property in any Microsoft product. You may copy and use this document for your internal, reference purposes.

This document is provided &quot;as-is.&quot; Information and views expressed in this document, including URL and other Internet Web site references, may change without notice. You bear the risk of using it. Some examples are for illustration only and are fictitious. No real association is intended or inferred. Microsoft makes no warranties, express or implied, with respect to the information provided here.
