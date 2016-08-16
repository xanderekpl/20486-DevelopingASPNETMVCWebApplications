# Module 6: Testing and Debugging ASP.NET MVC 4 Web Applications

# Lesson 1:Unit Testing MVC Components

### Demonstration: How to run unit tests

#### Demonstration Steps

1. In the Solution Explorer pane of the **OperasWebSite - Microsoft Visual Studio** window, right-click **Solution &#39;OperasWebSite&#39; (1 project)**, point to **Add** , and then click **New Project**.
2. In the navigation pane of the **Add New Project** dialog box, under Installed, expand **Visual C#** , and then click **Test**.
3. In the result pane of the **Add New Project** dialog box, click **Unit Test Project** , in the **Name** box, type **OperasWebSiteTests** , and then click **OK**.
4. In the Solution Explorer pane, under OperasWebSiteTests, right-click **References** , and then click **Add Reference**.
5. In the navigation pane of the **Reference Manager - OperasWebSiteTests** dialog box, click **Solution**.
6. In the **Name** column of the result pane, click **OperasWebSite** , select the check box corresponding to OperasWebSite, and then click **OK**.
7. In the Solution Explorer pane, under **OperasWebSiteTests** , right-click **References** , and then click **Add Reference**.
8. In the navigation pane of the **Reference Manager - OperasWebSiteTests** dialog box, click **Assemblies** , and then click **Extensions**.
9. In the **Name** column of the result pane, click **System.Web.Mvc** with version number **4.0.0.0** , select the corresponding check box, and then click **OK**.
10. In the Solution Explorer pane, under **OperasWebSiteTests** , right-click **UnitTest1.cs** , and then click **Rename**.
11. In the Solution Explorer pane, replace **UnitTest1** with **HomeControllerTests.cs** , and then press Enter.
12. In the **Microsoft Visual Studio** dialog box, click **Yes**.
13. In the HomeControllerTests.cs code window, locate the following code.

  ```cs
        public void TestMethod1()
```
14. Replace the code with the following code.

  ```cs
        public void Test_Index_Return_View()
```
15. Ensure that the cursor is at the end of the Microsoft.VisualStudio.TestTools.UnitTesting namespace, press Enter, and then type the following code.

  ```cs
        using System.Web.Mvc;
        using OperasWebSite.Controllers;
        using OperasWebSite.Models;
```
16. In the **Test\_Index\_Return\_View** code block, press Enter, and then type the following code.

  ```cs
        HomeController controller = 
            new HomeController();
        var result = controller.Index()
            as ViewResult;
        Assert.AreEqual("WrongName", 
            result.ViewName);
```
   >**Note** : This test is created to show the students a failing test.

17. On the **TEST** menu of the **OperasWebSite - Microsoft Visual Studio** window, point to **Run** , and then click **All Tests**.
18. In the Failed Tests (1) section of the Test Explorer pane, note that **Test\_Index\_Return\_View** is listed.
19. In the Test Explorer pane, click **Test\_Index\_Return\_View**.
20. At the bottom of the Test Explorer pane, drag the separator upward, and then view the test results.
21. In the Test Explorer pane, click the **Close** button.
22. In the Solution Explorer pane, under OperasWebSiteTests, click **HomeControllerTests.cs**.
23. In the HomeControllerTests.cs code window, lcate the following code.

  ```cs
        Assert.AreEqual("WrongName", result.ViewName);
```
24. Replace the code with the following code.

  ```cs
        Assert.AreEqual("Index", result.ViewName);
```
25. On the **TEST** menu of the **OperasWebSite - Microsoft Visual Studio** window, point to **Run** , and then click **All Tests**.
26. In the Passed Tests (1) section of the Test Explorer pane, note that **Test\_Index\_Return\_View** is listed.
27. In the Test Explorer pane, click **Test\_Index\_Return\_View** , and then, in the lower part of the Test Explorer pane, view the test results.
28. In the Test Explorer pane, click the **Close** button.
29. In the **OperasWebSite**  **- Microsoft Visual Studio** window, click the **Close** button.