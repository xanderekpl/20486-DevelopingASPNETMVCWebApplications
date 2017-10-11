# Module 1: Exploring ASP.NET MVC 5

# Lesson 3: Introduction to ASP.NET MVC 5

### Demonstration: How to Explore an MVC Application

#### Preparation Steps 

1. Ensure that you have cloned the 20486C directory from GitHub. It contains the code segments for this course's labs and demos. "https://github.com/MicrosoftLearning/20486-DevelopingASPNETMVCWebApplications/tree/master/Allfiles".
2. Navigate to **Allfiles/20486C/ Mod01/Democode/PhotoSharingSample**, and then open the **PhotoSharingSample.sln** file.
3. Run the **PhotoSharingSample.sln** application.
4. In the Address bar of the Windows Internet Explorer window, note the port number that appears after "http://localhost:" You will use the port number during this demonstration.
5. Close the Windows Internet Explorer window.


#### Demonstration Steps

1. In the Solution Explorer pane of the **PhotoSharingSample – Microsoft Visual Studio** window, expand **PhotoSharingSample**, and then note that the PhotoSharingSample application does not have the default.htm, the default.aspx, or the default.cshtml files to act as a home page.
2. In the Solution Explorer pane, under PhotoSharingSample, expand **Controllers**, and then click **HomeController.cs**.
3. In the HomeController.cs code window, locate the following code.

  ```cs
       Public ActionResult Index()
       {
          return View();
       }
```

4. In the Solution Explorer pane, expand **Views**, and then expand **Photo**.
5. In the Solution Explorer pane, under Photo, click **Index.cshtml**.
6. In the Index.cshtml code window, locate the following code.

  ```cs
       <h2>@ViewBag.Title</h2>
       <p>
           @Html.ActionLink("Create New", "Create")
       </p>
```
 >**Note:** This code block represents the View that renders the home page.

7. On the toolbar of the **PhotoSharingSample – Microsoft Visual Studio** window, click **Internet Explorer**.
8. In the **http://localhost:[port]/** window, note that the default home page is displayed.
9. On the taskbar, click the **Microsoft Visual Studio** icon.
10. In the **PhotoSharingSample – Microsoft Visual Studio** window, in the Solution Explorer pane, expand **App_Start**, and then click **RouteConfig.cs**.
11. In the RouteConfig.cs code window, locate the following code.

  ```cs
        routes.MapRoute(
            name: "Default",
            url: "{controller}/{action}/{id}",
        )
```
>**Note:** This code block represents the default route that forwards requests to the specified controller.

12. On the taskbar, click the **Internet Explorer** icon.
13. In the Address bar of the Windows Internet Explorer window, type the URL **http://localhost:[port]/home/index**, and then click the **Go to** button.

     >**Note:** The browser window displays the Home page of the **http://localhost:[port]/home/index** web application.

14. On the taskbar, click the **Microsoft Visual Studio** icon.
15. In the **PhotoSharingSample – Microsoft Visual Studio** window, in the Solution Explorer pane, expand **Models**, and then click **Photo.cs**.
16. In the Photo.cs code window, locate the following code.

  ```cs
        [Required]
        public string Title { get; set;}
```
   >**Note:** This code block represents the **Title** property for a photo stored in the application.

17. In the Solution Explorer pane, under Controllers, click **PhotoController.cs**.
18. In the PhotoController.cs code window, locate the following code.

  ```cs
       public class PhotoController : Controller
```
   >**Note:** This code block represents that the **PhotoController** class inherits the System.Web.MVC.Controller base class.

19. In thePhotoController.cs code window, locate the following code.

  ```cs
       public ActionResult Details(int id = 0)
       {
           Photo photo = db.Photos.Find(id);
           if (photo == null)
           {
               return HttpNotFound();
           }
           return View("Details", photo);
       }
```
   >**Note:** This code block represents the **Details** action of the Photo Controller.

20. In the Solution Explorer pane, expand **Views**, expand **Photo**, and then click **Details.cshtml**.
21. In the Details.cshtml code window, locate the following code.

  ```cs
         <h2>"@Model.Title"</h2>
```
   >**Note:**  The Razor view engine runs this code and renders the Photo Title property that you viewed in the model.

22. On the taskbar, click the **Internet Explorer** icon.
23. In the Address bar of the Windows Internet Explorer window, type **http://localhost:[port]/photo/details/2**, and then click the **Go to** button.

    >**Note:** The photo with ID 2 is displayed in the browser window. Note that the title of the photo is rendered at the top.

24. In the Windows Internet Explorer window, click the **Close** button.
25. In the **PhotoSharingSample (Running) – Microsoft Visual Studio** window, click the **Close** button.

©2016 Microsoft Corporation. All rights reserved.

The text in this document is available under the  [Creative Commons Attribution 3.0 License](https://creativecommons.org/licenses/by/3.0/legalcode), additional terms may apply. All other content contained in this document (including, without limitation, trademarks, logos, images, etc.) are  **not**  included within the Creative Commons license grant. This document does not provide you with any legal rights to any intellectual property in any Microsoft product. You may copy and use this document for your internal, reference purposes.

This document is provided &quot;as-is.&quot; Information and views expressed in this document, including URL and other Internet Web site references, may change without notice. You bear the risk of using it. Some examples are for illustration only and are fictitious. No real association is intended or inferred. Microsoft makes no warranties, express or implied, with respect to the information provided here.
