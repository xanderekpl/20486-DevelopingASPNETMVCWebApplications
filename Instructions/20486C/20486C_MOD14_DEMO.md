# Module 14: Implementing Web APIs in ASP.NET MVC 5 Web Applications

# Lesson 1: Developing a Web API

### Demonstration: How to Explore a Web API by Using Internet Explorer

#### Preparation Steps

1. Ensure that you have cloned the 20486C directory from GitHub. It contains the code segments for this course's labs and demos. https://github.com/MicrosoftLearning/20486-DevelopingASPNETMVCWebApplications/tree/master/Allfiles
2. Start **File Explorer**.
3. Navigate to **Allfiles/20486C/Mod14/Democode/OperasWebsites_14_begin**.
4. Double-click **OperasWebsites.sln**.

#### Demonstration Steps

1. In the **Solution Explorer** pane, expand **OperasWebsites**.
2. In the **Solution Explorer** pane, under **OperasWebsites**, right-click **Controllers**, point to **Add**, and then click **Controller**.
3. Select **Web API 2 Controller - Empty** and click **Add**.
4. In the **Controller name** box of the **Add Controller** dialog box, type **OperasApiController** and then click **Add**.
5. In the OperasApiController.cs code window, locate the following code.

  ```cs
       using System.Web.Http;
```
6. Place the cursor at the end of the located code, press Enter, and then type the following code.

  ```cs
       using OperasWebsites.Models;
```
7. Place the cursor in the **OperasApiController** class code block, press Enter, and then type the following code.

  ```cs
       private OperasDB contextDB = new OperasDB();
```
8. Place the cursor at the end of the code you just typed, press Enter twice, and then type the following code.

  ```cs
       public IEnumerable<Opera> GetOperas()
       {
       }
```
9. Place the cursor in the **GetOperas** action code block, and then type the following code.

  ```cs
       return contextDB.Operas.AsEnumerable();
```
10. Place the cursor at the end of the **GetOperas** action code block, press Enter twice, and then type the following code.

  ```cs
       public Opera GetOperas(int id)
       {
       }
```
11. Place the cursor in the **GetOperas** action code block you just created, and then type the following code.

  ```cs
        Opera opera = contextDB.Operas.Find(id);
```
12. Place the cursor at the end of the code you just entered, press Enter, and then type the following code.

  ```cs
        if (opera == null)
        {
           throw new HttpResponseException(HttpStatusCode.NotFound);
        }
```
13. Place the cursor at the end of the code you just entered, press Enter, and then type the following code.

  ```cs
        return opera;
```
14. On the **FILE** menu of the **OperasWebsites – Microsoft Visual Studio** window, click **Save All**.
15. On the **DEBUG** menu of the **OperasWebsites – Microsoft Visual Studio** window, click **Start Debugging**.
16. In the Address bar of the Internet Explorer window, type **http://localhost:[port]/api/OperasApi**, and then click **Go to**.
17. In the Navigation bar, click **Open**.
18. If the &quot;How do you want to open this type of file (.json)?&quot; message displays, click **More options**, and then click **Microsoft Visual Studio Version Selector**.
19. On the **EDIT** menu of the **OperasApi.json – Microsoft Visual Studio** window, point to **Find and Replace**, and then click **Quick Find**.
20. In the **Search Item** box of the **Quick Find** dialog box, type **Rigoletto**, and then click **Find Next**.
21. In the **Microsoft Visual Studio** dialog box, click **OK**.
22. In the **Quick Find** dialog box, click **Close**.

    >**Note:** Visual Studio finds the JSON data for the **Rigoletto** opera. Note that this is just one entry in the JSON data, which includes all operas in the web application.

23. In the **OperasApi.json – Microsoft Visual Studio** window, click **Close**.
24. In the Address bar of the Internet Explorer window, type **http://localhost:[port]/api/OperasApi/3**, and then click **Go to**.
25. In the Navigation bar, click **Open**.
26. If the &quot;How do you want to open this type of file (.json)?&quot; message displays, click **More options**, and then click **Microsoft Visual Studio Version Selector**.
27. In the **3.json - Microsoft Visual Studio** window, note that only the information relating to the **Nixon in China** opera is displayed.

    >**Note:** The value for the **OperasID** parameter corresponding to the **Nixon in China** opera is **3**.

28. In the **3.json - Microsoft Visual Studio** window, click **Close**.
29. In the Internet Explorer window, click **Close**.
30. In the **OperasWebsites – Microsoft Visual Studio** window, click **Close**.

©2016 Microsoft Corporation. All rights reserved.

The text in this document is available under the  [Creative Commons Attribution 3.0 License](https://creativecommons.org/licenses/by/3.0/legalcode), additional terms may apply. All other content contained in this document (including, without limitation, trademarks, logos, images, etc.) are  **not**  included within the Creative Commons license grant. This document does not provide you with any legal rights to any intellectual property in any Microsoft product. You may copy and use this document for your internal, reference purposes.

This document is provided &quot;as-is.&quot; Information and views expressed in this document, including URL and other Internet Web site references, may change without notice. You bear the risk of using it. Some examples are for illustration only and are fictitious. No real association is intended or inferred. Microsoft makes no warranties, express or implied, with respect to the information provided here. 
