# Module 14: Implementing Web APIs in ASP.NET MVC 4 Web Applications

# Lesson 1: Developing a Web API

### Demonstration: How to Explore a Web API by Using Internet Explorer

#### Preparation Steps

1. Sign in to the virtual machine, **20486B-SEA-DEV11**, with the user name, **admin**, and the password, **Pa$$w0rd**.
2. Start **File Explorer**.
3. Navigate to **Allfiles(D):\Mod14\Democode\OperasWebSite**.
4. Double-click **OperasWebSite.sln**.
5. Enable the **Allow NuGet to download missing packages during build** option, by performing the following steps:   
  a. On the **TOOLS** menu of the Microsoft Visual Studio window, click **Options**.   
  b. In the navigation pane of the **Options** dialog box, click **Package Manager**.   
  c. Under the **Package Restore** section, select the **Allow NuGet to download missing packages during build** check box, and then click **OK**.
  
  >**Note**: In Hyper-V Manager, start the **MSL-TMG1** virtual machine if it is not already running.

#### Demonstration Steps

1. In the **Solution Explorer** pane, expand **OperasWebSite**.
2. In the **Solution Explorer** pane, under **OperasWebSite**, right-click **Controllers**, point to **Add**, and then click **Controller**.
3. In the **Controller name** box of the **Add Controller** dialog box, type **OperasApiController**, in the **Template** box, click **Empty API Controller**, and then click **Add**.
4. In the OperasApiController.cs code window, locate the following code.

  ```cs
       using System.Web.Http;
```
5. Place the cursor at the end of the located code, press Enter, and then type the following code.

  ```cs
       using OperasWebSite.Models;
```
6. Place the cursor in the **OperasApiController** class code block, press Enter, and then type the following code.

  ```cs
       private OperasDB contextDB = new OperasDB();
```
7. Place the cursor at the end of the code you just typed, press Enter twice, and then type the following code.

  ```cs
       public IEnumerable<Opera> GetOperas()
       {
       }
```
8. Place the cursor in the **GetOperas** action code block, and then type the following code.

  ```cs
       return contextDB.Operas.AsEnumerable();
```
9. Place the cursor at the end of the **GetOperas** action code block, press Enter twice, and then type the following code.

  ```cs
       public Opera GetOperas(int id)
       {
       }
```
10. Place the cursor in the **GetOperas** action code block you just created, and then type the following code.

  ```cs
        Opera opera = contextDB.Operas.Find(id);
```
11. Place the cursor at the end of the code you just entered, press Enter, and then type the following code.

  ```cs
        if (opera == null)
        {
           throw new HttpResponseException(HttpStatusCode.NotFound);
        }
```
12. Place the cursor at the end of the code you just entered, press Enter, and then type the following code.

  ```cs
        return opera;
```
13. On the **FILE** menu of the **OperasWebSite – Microsoft Visual Studio** window, click **Save All**.
14. On the **DEBUG** menu of the **OperasWebSite – Microsoft Visual Studio** window, click **Start Debugging**.
15. In the Address bar of the Internet Explorer window, type **http://localhost:**&lt;_yourPortNumber&gt;_**/api/OperasApi**, and then click **Go to**.
16. In the Navigation bar, click **Open**.
17. If the &quot;How do you want to open this type of file (.json)?&quot; message displays, click **More options**, and then click **Microsoft Visual Studio Version Selector**.
18. On the **EDIT** menu of the **OperasApi.json – Microsoft Visual Studio** window, point to **Find and Replace**, and then click **Quick Find**.
19. In the **Search Item** box of the **Quick Find** dialog box, type **Rigoletto**, and then click **Find Next**.
20. In the **Microsoft Visual Studio** dialog box, click **OK**.
21. In the **Quick Find** dialog box, click the **Close** button.

    >**Note:** Visual Studio finds the JSON data for the **Rigoletto** opera. Note that this is just one entry in the JSON data, which includes all operas in the web application.

22. In the **OperasApi.json – Microsoft Visual Studio** window, click the **Close** button.
23. In the Address bar of the Internet Explorer window, type **http://localhost:**&lt;_yourPortNumber&gt;_**/api/OperasApi/3**, and then click **Go to**.
24. In the Navigation bar, click **Open**.
25. If the &quot;How do you want to open this type of file (.json)?&quot; message displays, click **More options**, and then click **Microsoft Visual Studio Version Selector**.
26. In the **3.json - Microsoft Visual Studio** window, note that only the information relating to the **Nixon in China** opera is displayed.

    >**Note:** The value for the **OperasID** parameter corresponding to the **Nixon in China** opera is **3**.

27. In the **3.json - Microsoft Visual Studio** window, click the **Close** button.
28. In the Internet Explorer window, click the **Close** button.
29. In the **OperasWebSite – Microsoft Visual Studio** window, click the **Close** button.

©2016 Microsoft Corporation. All rights reserved.

The text in this document is available under the  [Creative Commons Attribution 3.0 License](https://creativecommons.org/licenses/by/3.0/legalcode), additional terms may apply. All other content contained in this document (including, without limitation, trademarks, logos, images, etc.) are  **not**  included within the Creative Commons license grant. This document does not provide you with any legal rights to any intellectual property in any Microsoft product. You may copy and use this document for your internal, reference purposes.

This document is provided &quot;as-is.&quot; Information and views expressed in this document, including URL and other Internet Web site references, may change without notice. You bear the risk of using it. Some examples are for illustration only and are fictitious. No real association is intended or inferred. Microsoft makes no warranties, express or implied, with respect to the information provided here.
