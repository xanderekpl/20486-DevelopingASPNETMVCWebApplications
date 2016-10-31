# Module 4: Developing ASP.NET MVC 4 Controllers

# Lesson 1:Writing Controllers and Actions

### Demonstration: How to create a Controller
#### Preparation Steps
1. Sign in to the virtual machine, **20486B-SEA-DEV11**, with the user name, **admin**, and the password, **Pa$$w0rd**.
2. Start **File Explorer**.
3. Go to **AllFiles (D):\DemoCode\Mod04\OperasWebSite**.
4. Open the **OperasWebSite.sln** project.
5. Enable the **Allow NuGet to download missing packages during build** option, by performing the following steps:   
   - On the **TOOLS** menu of the Microsoft Visual Studio window, click **Options**.   
   - In the navigation pane of the **Options** dialog box, click **Package Manager**.   
   - Under the **Package Restore** section, select the **Allow NuGet to download missing packages during build** check box, and then click **OK**.
   
  >**Note**: In Hyper-V Manager, start the **MSL-TMG1** virtual machine if it is not already running.  

#### Demonstration Steps

1. In the Solution Explorer pane of the **OperasWebSite - Microsoft Visual Studio** window, right-click **Controllers**, point to  **Add**, and then click **Controller**.
2. In the **Controller Name** text box of the **Add Controller** dialog box, type **OperaController**.
3. In the **Template** box, click **Empty MVC controller**, and then click **Add**.
4. In the OperaController.cs code window, locate the following code.

  ```cs
       using System.Web.MVC;
```
5. Ensure that the cursor is at the end of the System.Web.MVC namespace, press Enter, and then type the following code.

  ```cs
       using System.Data.Entity;
       using OperasWebSite.Models;
```
6. In the **OperaController** class code block, press Enter, type the following code, and then press Enter.

  ```cs
       private OperasDB contextDB = new OperasDB();
```
7. In the **Index** action code block, select the following code.

  ```cs
       return View();
```
8. Replace the selected code with the following code.

  ```cs
       return View("Index", contextDB.Operas.ToList());
```
9. Ensure that the cursor is at the end of the **Index** action code block, press Enter, and then type the following code.

  ```cs
       public ActionResult Details (int id)
       {
       }
```
10. In the **Details** action code block, type the following code.

  ```cs
        Opera opera = contextDB.Operas.Find(id);
        if (opera != null)
        {
           return View("Details", opera);
        }
        else
        {
           return HttpNotFound();
        }
```
11. Place the mouse cursor at the end of the **Details** action code block, press Enter twice, and then type the following code.

  ```cs
        public ActionResult Create()
        {
        }
```
12. In the **Create** action code block, type the following code.

  ```cs
        Opera newOpera = new Opera();
        return View("Create", newOpera);
```
13. Place the mouse cursor at the end of the **Create** action code block, press Enter twice, and then type the following code.

  ```cs
        [HttpPost]
        public ActionResult Create(Opera newOpera)
        {
        }
```
14. Place the mouse cursor in the **Create** action code block with the HTTP verb **POST**, and then type the following code.

  ```cs
        if (ModelState.IsValid)
        {
           contextDB.Operas.Add(newOpera);
           contextDB.SaveChanges();
           return
              RedirectToAction("Index");
        }
        else
        {
           return View("Create", newOpera);
        }
```
15. On the **FILE** menu of the **OperasWebSite - Microsoft Visual Studio** window, click **Save Controllers\OperaControllers.cs**.
16. In the **OperasWebSite - Microsoft Visual Studio** window, click the **Close** button.
17. In the **Microsoft Visual Studio** dialog box, note that the message, **Save changes to the following items?** is displayed, and then click **Yes**.

©2016 Microsoft Corporation. All rights reserved.

The text in this document is available under the  [Creative Commons Attribution 3.0 License](https://creativecommons.org/licenses/by/3.0/legalcode), additional terms may apply. All other content contained in this document (including, without limitation, trademarks, logos, images, etc.) are  **not**  included within the Creative Commons license grant. This document does not provide you with any legal rights to any intellectual property in any Microsoft product. You may copy and use this document for your internal, reference purposes.

This document is provided &quot;as-is.&quot; Information and views expressed in this document, including URL and other Internet Web site references, may change without notice. You bear the risk of using it. Some examples are for illustration only and are fictitious. No real association is intended or inferred. Microsoft makes no warranties, express or implied, with respect to the information provided here.
