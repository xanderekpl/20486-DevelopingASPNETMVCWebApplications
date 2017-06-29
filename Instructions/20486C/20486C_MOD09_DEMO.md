# Module 9: Building Responsive Pages in ASP.NET MVC 5 Web Applications

# Lesson 2: Implementing a Caching Strategy

### Demonstration: How to Configure Caching

#### Preparation Steps

1. Start **File Explorer**.
1. Navigate to **Allfiles (D):\Mod09\Democode\OperasWebsites**.
1. Double-click **OperasWebsites.sln**

#### Demonstration Steps

1. On the **DEBUG** menu of the **OperasWebsites – Microsoft Visual Studio** window, click **Start Debugging**.
2. On the Operas I Have Seen page, click the **Tools** button, and then click **F12 developer tools**.
3. On the **Network** tab of the developer window, click the **Always refresh from server** button (forth burron from the left).
4. On the **Network** tab of the developer window, click **Start profiling session**.
5. On the Operas I Have Seen page, click the **All Operas** link.
6. When the page is fully loaded, in the developer window, click **Stop profiling session**.
7. In the **Name/Path** column of the developer window, locate **http://localhost:**&lt;_portnumber&gt;_**/Opera**.
8. On the **Time** column, note the value displayed.

   >**Note**: The time taken by the server to render the **/Opera** page and return the page to the browser is similar to the time taken by the server in the first instance. The page is not cached.

9. In the Windows Internet Explorer window, click the **Close** button.
10. In the Solution Explorer pane of the **OperasWebsites – Microsoft Visual Studio** window, expand **OperasWebsites** , expand  **Controllers** , and then click **OperaController.cs**.
11. In the OperaController.cs code window, locate the following code.

  ```cs
        using System.Web.Mvc;
```
12. Place the mouse cursor at the end of the located code, press Enter, and then type the following code.

  ```cs
        using System.Web.UI;
```
13. In the OperaController.cs code window, locate the following code.

  ```cs
        public ActionResult Index()
```
14. Place the mouse cursor immediately before the located code, press Enter, and then type the following code.

  ```cs
        [OutputCache(Duration=600, Location=OutputCacheLocation.Server, VaryByParam="none")]
```
15. On the **DEBUG** menu of the **OperasWebsites – Microsoft Visual Studio** window, click **Start Debugging**.
16. On the **Network** tab of the developer window, click the **Always refresh from server** button (forth burron from the left).
17. On the **Network** tab of the developer window, click **Start profiling session**.
18. On the Operas I Have Seen page, click the **All Operas** link.
19. When the page is fully loaded, in the developer window, click **Stop capturing**.
20. In the **Name/Path** column of the developer window, locate **http://localhost:**&lt;_portnumber&gt;_**/Opera**.
21. On the **Time** column, note the value displayed.

    >**Note** : Note that the time taken by the server to render the **/Opera** page and return the page to the browser is significantly less than the time taken by the server in the first instance.

22. On the **File** menu of the developer window, click **Exit**.
23. In the Windows Internet Explorer window, click the **Close** button.
24. In the **OperasWebsites – Microsoft Visual Studio** window, click the **Close** button.

©2016 Microsoft Corporation. All rights reserved.

The text in this document is available under the  [Creative Commons Attribution 3.0 License](https://creativecommons.org/licenses/by/3.0/legalcode), additional terms may apply. All other content contained in this document (including, without limitation, trademarks, logos, images, etc.) are  **not**  included within the Creative Commons license grant. This document does not provide you with any legal rights to any intellectual property in any Microsoft product. You may copy and use this document for your internal, reference purposes.

This document is provided &quot;as-is.&quot; Information and views expressed in this document, including URL and other Internet Web site references, may change without notice. You bear the risk of using it. Some examples are for illustration only and are fictitious. No real association is intended or inferred. Microsoft makes no warranties, express or implied, with respect to the information provided here.
