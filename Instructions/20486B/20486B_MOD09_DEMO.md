# Module 9: Building Responsive Pages in ASP.NET MVC 4 Web Applications

# Lesson 2: Implementing a Caching Strategy

### Demonstration: How to Configure Caching

#### Demonstration Steps

1. On the **DEBUG** menu of the **OperasWebSite – Microsoft Visual Studio** window, click **Start Debugging**.
2. On the Operas I Have Seen page, click the **Tools** button, and then click **F12 developer tools**.
3. On the **Cache** menu of the developer window, click **Always refresh from server**.
4. On the **Network** tab of the developer window, click **Start capturing**.
5. On the Operas I Have Seen page, click the **All Operas** link.
6. When the page is fully loaded, in the developer window, click **Stop capturing**.
7. In the URL section of the developer window, click **http://localhost:** &lt;_portnumber&gt;_ **/Opera** , and then click **Go to detailed view**.
8. On the **Timings** tab, click the **Request** entry.
9. In the **Duration** column, note the value displayed.
10. On the **Network** tab, click **Clear** , and then click **Start capturing**.
11. On the Operas I Have Seen page, click the **All Operas**
12. When the page is fully loaded, in the developer window, click **Stop capturing**.
13. In the URL section of the developer window, click **http://localhost:** &lt;_portnumber&gt;_ **/Opera** , and then click **Go to detailed view**.
14. On the **Timings** tab, click the **Request** entry.
15. In the **Duration** column, note the value displayed.

   >**Note** : The time taken by the server to render the **/Opera** page and return the page to the browser is similar to the time taken by the server in the first instance. The page is not cached.

16. In the Windows Internet Explorer window, click the **Close** button.
17. In the Solution Explorer pane of the **OperasWebSite – Microsoft Visual Studio** window, expand **OperasWebSite** , expand **Controllers** , and then click **OperaController.cs**.
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
27. In the URL section of the developer window, click **http://localhost:** &lt;_portnumber&gt;_ **/Opera** , and then click **Go to detailed view**.
28. On the **Timings** tab, click the **Request** entry.
29. In the **Duration** column, note the value displayed.
30. On the **Network** tab, click **Clear** , and then click **Start capturing**.
31. On the Operas I Have Seen page, click the **All Operas**
32. When the page is fully loaded, in the developer window, click **Stop capturing**.
33. In the URL section of the developer window, click **http://localhost:** &lt;_portnumber&gt;_ **/Opera** , and then click **Go to detailed view**.
34. On the **Timings** tab, click the **Request** entry.
35. In the **Duration** column, note the value displayed.

    >**Note** : Note that the time taken by the server to render the **/Opera** page and return the page to the browser is significantly less than the time taken by the server in the first instance.

36. On the **File** menu of the developer window, click **Exit**.
37. In the Windows Internet Explorer window, click the **Close** button.
38. In the **OperasWebSite – Microsoft Visual Studio** window, click the **Close** button.