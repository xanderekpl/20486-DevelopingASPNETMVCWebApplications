# Module 9: Building Responsive Pages in ASP.NET MVC 5 Web Applications

# Lesson 2: Implementing a Caching Strategy

### Demonstration: How to Configure Caching

#### Preparation Steps

1. Ensure that you have cloned the 20486C directory from GitHub. It contains the code segments for this course's labs and demos. https://github.com/MicrosoftLearning/20486-DevelopingASPNETMVCWebApplications/tree/master/Allfiles
2. Start **File Explorer**.
3. Navigate to **Allfiles\20486c\Mod09\Democode\OperasWebsites_09_begin**.
4. Double-click **OperasWebsites.sln**

#### Demonstration Steps

1. On the **DEBUG** menu of the **OperasWebsites – Microsoft Visual Studio** window, click **Start Debugging**.
2. On the Operas I Have Seen page, click **Tools**, and then click **F12 developer tools**.
3. On the **Network** tab of the developer window, click **Always refresh from server** (fourth button from the left).
4. When the page is fully loaded, in the developer window, click **Stop profiling session**.
5. On the **Network** tab of the developer window, click **Start profiling session**.
6. On the Operas I Have Seen page, click **All Operas**.
7. When the page is fully loaded, in the developer window, click **Stop profiling session**.
8. In the **Name/Path** column of the developer Microsoft Edge window, locate **http://localhost:[port]/**.
9. In the **Time** column, note the value displayed.

   >**Note**: The time taken by the server to render the **/Opera** page and return the page to the browser is similar to the time taken by the server in the first instance. The page is not cached.

10. In the Windows Microsoft Edge window, click **Close**, and then click **OK**.
11. On the **DEBUG** menu of the **OperasWebsites – Microsoft Visual Studio** window, click **Stop Debugging**.
12. In the Solution Explorer pane of the **OperasWebsites – Microsoft Visual Studio** window, expand **OperasWebsites**, expand  **Controllers**, and then click **OperaController.cs**.
13. In the OperaController.cs code window, locate the following code.

  ```cs
        using System.Web.Mvc;
```
14. Place the mouse cursor at the end of the located code, press Enter, and then type the following code.

  ```cs
        using System.Web.UI;
```
15. In the OperaController.cs code window, locate the following code.

  ```cs
        public ActionResult Index()
```
16. Place the mouse cursor immediately before the located code, press Enter, and then type the following code.

  ```cs
        [OutputCache(Duration=600, Location=OutputCacheLocation.Server, VaryByParam="none")]
```
17. On the **DEBUG** menu of the **OperasWebsites – Microsoft Visual Studio** window, click **Start Debugging**.
18. On the **Network** tab of the developer window, click **Always refresh from server** (fourth button from the left).
19. On the **Network** tab of the developer window, click **Stop profiling session**.
20. On the **Network** tab of the developer window, click **Start profiling session**.
21. On the Operas I Have Seen page, click **All Operas**.
22. When the page is fully loaded, in the developer window, click **Stop capturing**.
23. In the **Name/Path** column of the developer window, locate **http://localhost:[port]/**.
24. In the **Time** column, note the value displayed.

    >**Note** : Note that the time taken by the server to render the **/Opera** page and return the page to the browser is significantly less than the time taken by the server in the first instance.

25. On the **File** menu of the developer window, click **Close**.
26. In the Microsoft Edge window, click **Close**.
27. In the **OperasWebsites – Microsoft Visual Studio** window, click **Close**.
28. In the **Microsoft Visual Studio** window, click **Yes**.

©2016 Microsoft Corporation. All rights reserved.

The text in this document is available under the  [Creative Commons Attribution 3.0 License](https://creativecommons.org/licenses/by/3.0/legalcode), additional terms may apply. All other content contained in this document (including, without limitation, trademarks, logos, images, etc.) are  **not**  included within the Creative Commons license grant. This document does not provide you with any legal rights to any intellectual property in any Microsoft product. You may copy and use this document for your internal, reference purposes.

This document is provided &quot;as-is.&quot; Information and views expressed in this document, including URL and other Internet Web site references, may change without notice. You bear the risk of using it. Some examples are for illustration only and are fictitious. No real association is intended or inferred. Microsoft makes no warranties, express or implied, with respect to the information provided here.
