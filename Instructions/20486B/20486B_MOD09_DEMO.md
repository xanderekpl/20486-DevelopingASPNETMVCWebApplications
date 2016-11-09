# Module 9: Building Responsive Pages in ASP.NET MVC 4 Web Applications

# Lesson 2: Implementing a Caching Strategy

### Demonstration: How to Configure Caching

#### Preparation Steps

1. Log on to the virtual machine, **20486B-SEA-DEV11**, with the user name, **admin**, and the password, **Pa$$w0rd**.
2. Start **File Explorer**.
3. Navigate to **Allfiles (D):\Mod09\Democode\OperasWebSite**.
4. Double-click **OperasWebSite.sln**
5. Enable the **Allow NuGet to download missing packages during build** option, by performing the following steps:  
  a. On the **TOOLS** menu of the **Microsoft Visual Studio** window, click **Options**.  
  b. In the navigation pane of the **Options** dialog box, click **Package Manager**.  
  c. Under the **Package Restore** section, select the **Allow NuGet to download missing packages during build** checkbox, and then click **OK**.
  
  >**Note**: In Hyper-V Manager, start the **MSL-TMG1** virtual machine if it is not already running.

#### Demonstration Steps

1. On the **DEBUG** menu of the **OperasWebSite – Microsoft Visual Studio** window, click **Start Debugging**.
2. On the Operas I Have Seen page, click the **Tools** button, and then click **F12 developer tools**.
3. On the **Cache** menu of the developer window, click **Always refresh from server**.
4. On the **Network** tab of the developer window, click **Start capturing**.
5. On the Operas I Have Seen page, click the **All Operas** link.
6. When the page is fully loaded, in the developer window, click **Stop capturing**.
7. In the URL section of the developer window, click **http://localhost:**&lt;_portnumber&gt;_**/Opera**, and then click **Go to detailed view**.
8. On the **Timings** tab, click the **Request** entry.
9. In the **Duration** column, note the value displayed.
10. On the **Network** tab, click **Clear** , and then click **Start capturing**.
11. On the Operas I Have Seen page, click the **All Operas** link.
12. When the page is fully loaded, in the developer window, click **Stop capturing**.
13. In the URL section of the developer window, click **http://localhost:**&lt;_portnumber&gt;_**/Opera**, and then click **Go to detailed view**.
14. On the **Timings** tab, click the **Request** entry.
15. In the **Duration** column, note the value displayed.

   >**Note**: The time taken by the server to render the **/Opera** page and return the page to the browser is similar to the time taken by the server in the first instance. The page is not cached.

16. In the Windows Internet Explorer window, click the **Close** button.
17. In the Solution Explorer pane of the **OperasWebSite – Microsoft Visual Studio** window, expand **OperasWebSite** , expand  **Controllers** , and then click **OperaController.cs**.
18. In the OperaController.cs code window, locate the following code.

  ```cs
        using System.Web.Mvc;
```
19. Place the mouse cursor at the end of the located code, press Enter, and then type the following code.

  ```cs
        using System.Web.UI;
```
20. In the OperaController.cs code window, locate the following code.

  ```cs
        public ActionResult Index()
```
21. Place the mouse cursor immediately before the located code, press Enter, and then type the following code.

  ```cs
        [OutputCache(Duration=600, Location=OutputCacheLocation.Server, VaryByParam="none")]
```
22. On the **DEBUG** menu of the **OperasWebSite – Microsoft Visual Studio** window, click **Start Debugging**.
23. On the **Cache** menu of the developer window, click **Always refresh from server**.
24. On the **Network** tab, click **Start capturing**.
25. On the Operas I Have Seen page, click the **All Operas** link.
26. When the page is fully loaded, in the developer window, click **Stop capturing**.
27. In the URL section of the developer window, click **http://localhost:**&lt;_portnumber&gt;_**/Opera**, and then click **Go to detailed view**.
28. On the **Timings** tab, click the **Request** entry.
29. In the **Duration** column, note the value displayed.
30. On the **Network** tab, click **Clear** , and then click **Start capturing**.
31. On the Operas I Have Seen page, click the **All Operas** link.
32. When the page is fully loaded, in the developer window, click **Stop capturing**.
33. In the URL section of the developer window, click **http://localhost:**&lt;_portnumber&gt;_**/Opera**, and then click **Go to detailed view**.
34. On the **Timings** tab, click the **Request** entry.
35. In the **Duration** column, note the value displayed.

    >**Note** : Note that the time taken by the server to render the **/Opera** page and return the page to the browser is significantly less than the time taken by the server in the first instance.

36. On the **File** menu of the developer window, click **Exit**.
37. In the Windows Internet Explorer window, click the **Close** button.
38. In the **OperasWebSite – Microsoft Visual Studio** window, click the **Close** button.

©2016 Microsoft Corporation. All rights reserved.

The text in this document is available under the  [Creative Commons Attribution 3.0 License](https://creativecommons.org/licenses/by/3.0/legalcode), additional terms may apply. All other content contained in this document (including, without limitation, trademarks, logos, images, etc.) are  **not**  included within the Creative Commons license grant. This document does not provide you with any legal rights to any intellectual property in any Microsoft product. You may copy and use this document for your internal, reference purposes.

This document is provided &quot;as-is.&quot; Information and views expressed in this document, including URL and other Internet Web site references, may change without notice. You bear the risk of using it. Some examples are for illustration only and are fictitious. No real association is intended or inferred. Microsoft makes no warranties, express or implied, with respect to the information provided here.
