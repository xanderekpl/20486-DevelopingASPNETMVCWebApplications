# Module 7: Structuring ASP.NET MVC 4 Web Applications

# Lesson 2: Configuring Routes

### Demonstration: How to Add Routes

#### Preparation Steps

1. Sign in to the virtual machine, **20486B-SEA-DEV11**, with the user name, **admin**, and the password, **Pa$$w0rd**.
2. Open **File Explorer**.
3. Go to **AllFiles (D):\Mod07\DemoCode\OperasWebSite**.
4. Double-click **OperasWebSite.sln**.
5. Enable the **Allow NuGet to download missing packages during build** option, by performing the following steps:  
  a. On the **TOOLS** menu of the **Microsoft Visual Studio** window, click **Options**.  
  b. In the navigation pane of the **Options** dialog box, click **Package Manager**.  
  c. Under the **Package Restore** section, select the **Allow NuGet to download missing packages during build** checkbox, and then click **OK**.
6. On the **Build** menu of the **OperasWebSite - Microsoft Visual Studio** window, click **Build Solution**, and then note that the application is built successfully.
  
  >**Note**: In Hyper-V Manager, start the **MSL-TMG1** virtual machine, if it is not already running.

#### Demonstration Steps

1. On the **DEBUG** menu of the **OperasWebSite - Microsoft Visual Studio** window, click **Start Debugging**.
2. On the **Operas I Have Seen** page, click the **operas I&#39;ve seen** link.
3. On the **Index** page, click the **Details** link corresponding to **Cosi Fan Tutte**.
4. In the Address bar of the **Internet Explorer** window, note that the URL is **http://localhost:&lt;portnumber&gt;/Opera/Details/1**.

   >**Note:** This URL indicates that the controller is **Opera**, the action is **Details**, and the ID is **1**.

5. In the **Internet Explorer** window, click the **Close** button.
6. In the **Solution Explorer** pane, expand **OperasWebSite**, expand **Controllers**, and then click **OperaController.cs**.
7. In the **OperaController.cs** code window, place the mouse cursor at the end of the **Details** action code block, press Enter twice, and then type the following code.

  ```cs
       public ActionResult DetailsByTitle(string title)
       {
       }
```
8. In the **DetailsByTitle** action code block, type the following code, and then press Enter.

  ```cs
       Opera opera = (Opera)(from o in contextDB.Operas where o.Title == title select o).FirstOrDefault();      
```
9. In the **DetailsByTitle** action code block, after the code that you just typed, type the following code.

  ```cs
       if (opera == null)
       {
          return HttpNotFound();
       }
       return View("Details", opera);
```
10. In the **Solution Explorer** pane, under OperasWebSite, expand **App_Start**, and then click **RouteConfig.cs**.
11. In the **RouteConfig.cs** code window, locate the following code.

  ```cs
        routes.IgnoreRoute("{resource}.axd/{*pathInfo}");
```
12. Place the mouse cursor at the end of the call to the **IgnoreRoute()** method, press Enter twice, and then type the following code.

  ```cs
       routes.MapRoute(name: "OperaTitleRoute",url: "opera/title/{title}",defaults: new { controller = "Opera", action ="DetailsByTitle" });     
```
13. On the **FILE** menu of the **OperasWebSite - Microsoft Visual Studio** window, click **Save All**.
14. On the **DEBUG** menu of **OperasWebSite - Microsoft Visual Studio** window, click **Start Debugging**.
15. On the Operas I Have Seen page, click the **operas I&#39;ve seen** link.
16. In the Address bar of the **Internet Explorer** window, append the existing URL with **/title/rigoletto**, and then click **Go**.

   >**Note:** The details of the **Rigoletto** opera are displayed.

17. In the **Internet Explorer** window, click **Close**.
18. In the **OperasWebSite - Microsoft Visual Studio** window, click **Close**.

# Lesson 3: Creating a Navigation Structure

### Demonstration: How to Build Site Navigation

#### Preparation Steps

1. Sign in to the virtual machine, **20486B-SEA-DEV11**, with the user name, **admin**, and the password, **Pa$$w0rd**.
2. Open **File Explorer**.
3. Go to **AllFiles (D):\Mod07\DemoCode\OperasWebSite**.
4. Double-click **OperasWebSite.sln**.
5. Enable the **Allow NuGet to download missing packages during build** option, by performing the following steps:  
  a. On the **TOOLS** menu of the **Microsoft Visual Studio** window, click **Options**.  
  b. In the navigation pane of the **Options** dialog box, click **Package Manager**.  
  c. Under the **Package Restore** section, select the **Allow NuGet to download missing packages during build** checkbox, and then click **OK**.
6. On the **Build** menu of the **OperasWebSite - Microsoft Visual Studio** window, click **Build Solution**, and then note that the application is built successfully.
  
  >**Note**: In Hyper-V Manager, start the **MSL-TMG1** virtual machine, if it is not already running.

#### Demonstration Steps

1. On the **Tools** menu of the **OperasWebSite - Microsoft Visual Studio** window, point to **Library Package Manager** and then click **Package Manager Console**.
2. In **Package Manager Console** window, type the following command and then press Enter

  ```cs
       install-package mvcsitemapprovider –version 3.3.4.0
```
3. In the **Solution Explorer** pane of the **OperasWebSite - Microsoft Visual Studio** window, expand **OperasWebSite**, collapse **App_Start**, and then collapse **Controllers**.
4. In the **Solution Explorer** pane, under **Global.asax**, click **Mvc.sitemap**.
5. In the **Mvc.sitemap** code window, locate the following code.

  ```cs
       <mvcSiteMapNode title="Home" controller="Home" action="Index">
```
6. Place the mouse cursor at the end of the located code, press Enter, and then type the following code.

  ```cs
       <mvcSiteMapNode title="All Operas" controller="Opera" action="Index" key="AllOperas" />
```
7. On the **BUILD** menu of the **OperasWebSite - Microsoft Visual Studio** window, click **Build Solution**.
8. In the **Solution Explorer** pane, expand **Views**, expand **Home**, and then click **Index.cshtml**.
9. In the **Index.cshtml** code window, place the mouse cursor after the **&lt;div&gt;** tag, press Enter, and then type the following code.

  ```cs
       Menu: @Html.MvcSiteMap().Menu(false, false, true)
```
10. Place the mouse cursor at the end of the site map menu code block, press Enter, and then type the following code.

  ```cs
        Breadcrumb Trail: @Html.MvcSiteMap().SiteMapPath()
```
11. In the **Solution Explorer** pane, under **Views**, expand **Opera**, and then click **Index.cshtml**.
12. In the **Index.cshtml** code window, place the mouse cursor at the end of the **&lt;body&gt;** tag, press Enter, and then type the following code.

  ```cs
        Menu: @Html.MvcSiteMap().Menu(false, false, true)
```
13. Place the mouse cursor at the end of the site map menu code block, press Enter, and then type the following code.

  ```cs
        Breadcrumb Trail: @Html.MvcSiteMap().SiteMapPath()
```
14. On the **DEBUG** menu of the **OperasWebSite - Microsoft Visual Studio** window, click **Start Debugging**.

    >**Note:** On the **Operas I Have Seen** page, ensure that a menu is added.

15. On the **Operas I Have Seen** page, under **Menu**, click the **All Operas** link.
16. On the **Index** page, note that the **Main Opera List** is displayed.

    >**Note:** On the **Index** page, you can also view the menu.

17. In the **Breadcrumb Trail** section of the Index page, click the **Home** link.

    >**Note:** The **Operas I Have Seen** page is displayed.

18. On the **Operas I Have Seen** page, under **Menu**, click the **About** link.

    >**Note:** The **About** page of the web application is displayed.

19. In the **Internet Explorer** window, click the **Close** button.
20. In the **OperasWebSite - Microsoft Visual Studio** window, click **Close**.

©2016 Microsoft Corporation. All rights reserved.

The text in this document is available under the  [Creative Commons Attribution 3.0 License](https://creativecommons.org/licenses/by/3.0/legalcode), additional terms may apply. All other content contained in this document (including, without limitation, trademarks, logos, images, etc.) are  **not**  included within the Creative Commons license grant. This document does not provide you with any legal rights to any intellectual property in any Microsoft product. You may copy and use this document for your internal, reference purposes.

This document is provided &quot;as-is.&quot; Information and views expressed in this document, including URL and other Internet Web site references, may change without notice. You bear the risk of using it. Some examples are for illustration only and are fictitious. No real association is intended or inferred. Microsoft makes no warranties, express or implied, with respect to the information provided here.
