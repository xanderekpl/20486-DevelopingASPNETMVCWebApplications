# Module 4: Developing ASP.NET MVC 4 Controllers

# Lesson 1:Writing Controllers and Actions

### Demonstration: How to create a Controller

#### Demonstration Steps

1. In the Solution Explorer pane of the **OperasWebSite - Microsoft Visual Studio** window, right-click **Controllers** , point to **Add** , and then click **Controller**.
2. In the **Controller Name** text box of the **Add Controller** dialog box, type **OperaController**.
3. In the **Template** box, click **Empty MVC controller** , and then click **Add**.
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
       private OperasDB contextDB =
          new OperasDB();
```
7. In the **Index** action code block, select the following code.

  ```cs
       return View();
```
8. Replace the selected code with the following code.

  ```cs
       return View(&quot;Index&quot;,
          contextDB.Operas.ToList());
```
9. Ensure that the cursor is at the end of the **Index** action code block, press Enter, and then type the following code.

  ```cs
       public ActionResult Details (int id)
       {
       }
```
10. n the **Details** action code block, type the following code.

  ```cs
        Opera opera =
           contextDB.Operas.Find(id);
        if (opera != null)
        {
           return View(&quot;Details&quot;, opera);
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
        return View(&quot;Create&quot;, newOpera);
```
13. Place the mouse cursor at the end of the **Create** action code block, press Enter twice, and then type the following code.

  ```cs
        [HttpPost]
        public ActionResult Create
           (Opera newOpera)
        {
        }
```
14. Place the mouse cursor in the **Create** action code block with the HTTP verb **POST** , and then type the following code.

  ```cs
        if (ModelState.IsValid)
        {
           contextDB.Operas.Add(newOpera);
           contextDB.SaveChanges();
           return
              RedirectToAction(&quot;Index&quot;);
        }
        else
        {
           return View(&quot;Create&quot;, newOpera);
        }
```
15. On the **FILE** menu of the **OperasWebSite - Microsoft Visual Studio** window, click **Save Controllers\OperaControllers.cs**.
16. In the **OperasWebSite - Microsoft Visual Studio** window, click the **Close** button.
17. In the **Microsoft Visual Studio** dialog box, note that the message, **Save changes to the following items?** is displayed, and then click **Yes**.