# Module 8: Applying Styles to ASP.NET MVC 5 Web Applications

# Lesson 2: Applying CSS Styles to an MVC Application

### Demonstration: How to Apply a Consistent Look and Feel

#### Preparation Steps

1. Ensure that you have cloned the 20486C directory from GitHub. It contains the code segments for this course's labs and demos. https://github.com/MicrosoftLearning/20486-DevelopingASPNETMVCWebApplications/tree/master/Allfiles
2. Open **File Explorer**.
3. Navigate to **Allfiles/20486C/Mod08/Democode/OperasWebsites	**.
4. Double-click **OperasWebsites.sln**.

#### Demonstration Steps

1. On the **DEBUG** menu of the **OperasWebsites - Microsoft Visual Studio** window, click **Start Debugging**.

   >**Note:** On the **Operas I Have Seen** page, note that the main heading, the menu list, and the breadcrumb control are displayed. 

2. On the **Operas I Have Seen** page, click **All Operas**.

   >**Note:** On the localhost page, the main heading, the menu list, and the breadcrumb controls are not displayed. 

3. On the localhost page, click **Details** corresponding to any opera.

   >**Note:** On the localhost page, the details of the opera are displayed. The main heading, the menu list, and the breadcrumb controls are not displayed. 

4. In the Internet Explorer window, click **Close**.
5. In the Solution Explorer pane, expand **OperasWebsites**, and then expand **Views**.
6. In the Solution Explorer pane, under Views, right-click **Shared**, point to **Add**, and then click **View**.
7. In the **View name** box of the **Add View** dialog box, type **_SiteTemplate**.
8. In the **Template** box, ensure that the value is **Empty (without model)**.
9. In the **Add View** dialog box, clear the **User a layout page** check box.
10. In the **_SiteTemplate.cshtml** code window, locate the following code, select the code, and then press Delete.

  ```cs
        @{
            Layout = null;
        }
```
11. In the **_SiteTemplate.cshtml** code window, locate the following code.

  ```cs
		<title>_SiteTemplate</title>
```
12. Replace the **TITLE** element with the following code.

  ```cs
		<title>@ViewBag.Title</title>
```
13. In the Solution Explorer pane, under Views, expand **Home**, and then click **Index.cshtml**.
14. In the **Index.cshtml** code window, locate the following code, and then select the code.

  ```cs
        <h1>Operas I Have Seen</h1>
        <div class="topmenu">
           @Html.MvcSiteMap().Menu(false, true, true)
        </div>
        <div class="clear-floats" />
        <div class="breadcrumb">
           Breadcrumb Trail: @Html.MvcSiteMap().SiteMapPath()
        </div>
```
15. On the **EDIT** menu of the **OperasWebsites - Microsoft Visual Studio** window, click **Cut**.
16. In the Solution Explorer pane, under Shared, click **_SiteTemplate.cshtml**.
17. In the **_SiteTemplate.cshtml** code window, place the cursor in the **DIV** element.
18. On the **EDIT** menu of the **OperasWebsites - Microsoft Visual Studio** window, click **Paste**.
19. In the **_SiteTemplate.cshtml** code window, place the cursor at the end of the code you just pasted, press Enter, and then type the following code.

  ```cs
        <div>
           @RenderBody()
        </div>
```
20. Place the cursor after the **&lt;/title&gt;** tag, press Enter, and then type the following code.

  ```cs
		<link type="text/css" rel="stylesheet" href="~/content/OperasStyles.css" />
```
21. In the Solution Explorer pane, under Home, click **Index.cshtml**.
22. In the Razor code block of the **Index.cshtml** code window, locate the following code, select the code, and then press Delete.

  ```cs
		Layout = null;
```
23. In the Razor code block, type the following code.

  ```cs
		ViewBag.Title = "Operas I Have Seen";
```
24. In the **Index.cshtml** code window, locate the following code, select the code, and then press Delete.

  ```cs
        <!DOCTYPE html>
        <html>
        <head>
           <meta name="viewport" content="width=device-width" />
           <title>Operas I Have Seen</title>
        </head>
        <body>
           <div>
```
25. In the **Index.cshtml** code window, locate the following code, select the code, and then press Delete.

  ```cs
		   </div>
        </body>
        </html>
```
26. In the Solution Explorer pane, right-click **Views**, point to **Add**, and then click **View**.
27. In the **View name** box of the **Add View** dialog box, type **_ViewStart**.
28. In the **Add View** dialog box, ensure that the **Use a layout page** check box is cleared, and then click **Add**.
29. In the **_ViewStart.cshtml** code window, locate the following code.

  ```cs
		Layout = null;
```
30. Replace the code with the following code.

  ```cs
		Layout = "~/Views/Shared/_SiteTemplate.cshtml";
```
31. In the **_ViewStart.cshtml** code window, locate the following code.

  ```cs
		<!DOCTYPE html>
```
32. In the **_ViewStart.cshtml** code window, select from the code located to the end tag of the HTML element, and then press Delete.
33. On the **DEBUG** menu of the **OperasWebsites - Microsoft Visual Studio** window, click **Start Debugging**.
34. On the **Operas I Have Seen** page, note the main heading, the menu list, and the breadcrumb control.
35. On the **Operas I Have Seen** page, click **All Operas**, and then, on the **Index of Operas** page, note that the main heading, the menu list, and the breadcrumb controls are displayed.
36. On the **Index of Operas** page, click **Details** corresponding to any opera, and then note that the main heading, the menu list, and the breadcrumb controls are displayed along with the details of the opera.
37. In the Internet Explorer window, click **Close**.
38. In the **OperasWebsites - Microsoft Visual Studio** window, click **Close**.

©2016 Microsoft Corporation. All rights reserved.

The text in this document is available under the  [Creative Commons Attribution 3.0 License](https://creativecommons.org/licenses/by/3.0/legalcode), additional terms may apply. All other content contained in this document (including, without limitation, trademarks, logos, images, etc.) are  **not**  included within the Creative Commons license grant. This document does not provide you with any legal rights to any intellectual property in any Microsoft product. You may copy and use this document for your internal, reference purposes.

This document is provided &quot;as-is.&quot; Information and views expressed in this document, including URL and other Internet Web site references, may change without notice. You bear the risk of using it. Some examples are for illustration only and are fictitious. No real association is intended or inferred. Microsoft makes no warranties, express or implied, with respect to the information provided here.
