# Module 6: Testing and Debugging ASP.NET MVC 5 Web Applications

# Lesson 1: Unit Testing MVC Components

### Demonstration: How to run unit tests

#### Preparation Steps

1. Ensure that you have cloned the 20486C directory from GitHub. It contains the code segments for this course's labs and demos. 
https://github.com/MicrosoftLearning/20486-DevelopingASPNETMVCWebApplications/tree/master/Allfiles
2. Go to **Allfiles/20486C/Mod06/DemoCode/OperasWebsites**.
3. Double-click **OperasWebsites.sln**.

#### Demonstration Steps

1. In the Solution Explorer pane of the **OperasWebsites - Microsoft Visual Studio** window, right-click **Solution &#39;OperasWebsites&#39; (1 project)**, point to **Add**, and then click **New Project**.
2. In the navigation pane of the **Add New Project** dialog box, under Installed, expand **Visual C#**, and then click **Test**.
3. In the result pane of the **Add New Project** dialog box, click **Unit Test Project (.NET Framework)**, in the **Name** box, type  **OperasWebsitesTests**, and then click **OK**.
4. In the Solution Explorer pane, under OperasWebsitesTests, right-click **References**, and then click **Add Reference**.
5. In the navigation pane of the **Reference Manager - OperasWebsitesTests** dialog box, click **Project**, and then click **Solution**.
6. In the **Name** column of the result pane, click **OperasWebsites**, select the check box corresponding to OperasWebsites, and then click **OK**.
7. In the Solution Explorer pane, under **OperasWebsitesTests**, right-click **References**, and then click **Manage NuGet Packages**.
8. In the **NuGet: OperasWebsitesTests** window, click **Browse**, type **MVC** in the **Search** box, and then press enter.
9. Select **Microsoft.AspNet.Mvc** version **v5.2.3**.
10. Click **Install**.
11. If a **Preview** dialogs box appears, click **OK**.
12. Click on **I Accept** to install MVC version 5.
13. Close the **NuGet: OperasWebsitesTests** window.



14. In the Solution Explorer pane, under **OperasWebsitesTests**, right-click **UnitTest1.cs**, and then click **Rename**.
15. In the Solution Explorer pane, replace **UnitTest1** with **HomeControllerTests.cs**, and then press Enter.
16. In the **Microsoft Visual Studio** dialog box, click **Yes**.
17. In the HomeControllerTests.cs code window, locate the following code.

  ```cs
        public void TestMethod1()
```
18. Replace the code with the following code.

  ```cs
        public void Test_Index_Return_View()
```
19. Ensure that the cursor is at the end of the Microsoft.VisualStudio.TestTools.UnitTesting namespace, press Enter, and then type the following code.

  ```cs
        using System.Web.Mvc;
        using OperasWebsites.Controllers;
        using OperasWebsites.Models;
```
20. In the **Test\_Index\_Return\_View** code block, press Enter, and then type the following code.

  ```cs
        HomeController controller = new HomeController();
        var result = controller.Index() as ViewResult;
        Assert.AreEqual("WrongName", result.ViewName);         
```
   >**Note** : This test is created to show the students a failing test.

21. On the **TEST** menu of the **OperasWebsites - Microsoft Visual Studio** window, point to **Run**, and then click **All Tests**.
22. In the Failed Tests (1) section of the Test Explorer pane, note that **Test\_Index\_Return\_View** is listed.
23. In the Test Explorer pane, click **Test\_Index\_Return\_View**.
24. At the bottom of the Test Explorer pane, drag the separator upward, and then view the test results.
25. In the Test Explorer pane, click the **Close** button.
26. In the Solution Explorer pane, under OperasWebsitesTests, click **HomeControllerTests.cs**.
27. In the HomeControllerTests.cs code window, locate the following code.

  ```cs
        Assert.AreEqual("WrongName", result.ViewName);
```
28. Replace the code with the following code.

  ```cs
        Assert.AreEqual("Index", result.ViewName);
```
29. On the **TEST** menu of the **OperasWebsites - Microsoft Visual Studio** window, point to **Run**, and then click **All Tests**.
30. In the Passed Tests (1) section of the Test Explorer pane, note that **Test\_Index\_Return\_View** is listed.
31. In the Test Explorer pane, click **Test\_Index\_Return\_View**, and then, in the lower part of the Test Explorer pane, view the test results.
32. In the Test Explorer pane, click **Close**.
33. In the **OperasWebsites - Microsoft Visual Studio** window, click **Close**.

©2016 Microsoft Corporation. All rights reserved.

The text in this document is available under the  [Creative Commons Attribution 3.0 License](https://creativecommons.org/licenses/by/3.0/legalcode), additional terms may apply. All other content contained in this document (including, without limitation, trademarks, logos, images, etc.) are  **not**  included within the Creative Commons license grant. This document does not provide you with any legal rights to any intellectual property in any Microsoft product. You may copy and use this document for your internal, reference purposes.

This document is provided &quot;as-is.&quot; Information and views expressed in this document, including URL and other Internet Web site references, may change without notice. You bear the risk of using it. Some examples are for illustration only and are fictitious. No real association is intended or inferred. Microsoft makes no warranties, express or implied, with respect to the information provided here.
