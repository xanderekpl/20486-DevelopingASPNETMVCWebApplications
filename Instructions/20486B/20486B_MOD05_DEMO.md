# Module 5: Developing ASP.NET MVC 4 Views

# Lesson 2: Using HTML Helpers

### Demonstration: How to Use HTML Helpers

#### Preparation Steps

1. Log on to the virtual machine, **20486B-SEA-DEV11**, with the user name, **admin**, and the password, **Pa$$w0rd**.
2. Start **File Explorer**.
3. Navigate to **AllFiles (D):\Mod05\DemoCode\OperasWebSite**.
4. Open the **OperasWebSite.sln** project.
5. Enable the **Allow NuGet to download missing packages during build** option, by performing the following steps:     
  - On the **TOOLS** menu of the Microsoft Visual Studio window, click **Options**.     
  - In the navigation pane of the **Options** dialog box, click **Package Manager**.   
  - Under the Package Restore section, select the **Allow NuGet to download missing packages during build** checkbox, and then click **OK**.
6. On the **Build** menu of the **OperasWebSite - Microsoft Visual Studio** window, click **Build Solution**, and then note that the application is built successfully.
  
  >**Note**: In Hyper-V Manager, start the **MSL-TMG1** virtual machine if it is not already running.   

#### Demonstration Steps

1. In the Solution Explorer pane of the **OperasWebSite - Microsoft Visual Studio** window, expand **Controllers** , and then click  **OperaController.cs**.
2. In the **OperaController.cs** code window, locate the following code, right-click the code, and then click **Add View**.

  ```cs
		public ActionResult Create()
```
3. In the **View Name** box of the **Add View** dialog box, ensure that the name displayed is **Create**.
4. In the **Add View** dialog box, ensure that the **Create a strongly-typed view** check box is selected.
5. In the **Model class** box, ensure that the value is **Opera (OperasWebSite.Models)**. If not, in the **Model class** box, click **Opera (OperasWebSite.Models)**.
6. In the **Scaffold template** box, ensure that the value is **Empty**.
7. In the **Add View** dialog box, ensure that the **Use a layout or master page** check box is not selected, and then click **Add**.
8. In the **DIV** element of the **Create.cshtml** code window, type the following code.

		<h2>Add an Opera</h2>

9. Place the mouse cursor at the end of the **&lt;/h2&gt;** tag, press Enter twice, and then type the following code.

  ```cs
	@using (Html.BeginForm("Create","Opera",FormMethod.Post))   
    {
    }
```
10. In the **using** code block, type the following code.

  ```cs
	<p> 
        @Html.LabelFor(model =>model.Title):        
		@Html.EditorFor(model =>model.Title) 
		@Html.ValidationMessageFor(model =>model.Title)   
    </p>
```
11. Place the mouse cursor at the end of the **&lt;/p&gt;** tag corresponding to the **model.Title** property, press Enter twice, and then type the following code.

  ```cs
		<p>
        	@Html.LabelFor(model =>model.Year): 
			@Html.EditorFor(model =>model.Year)
			@Html.ValidationMessageFor(model => model.Year)		   
		</p>
```
12. Place the mouse cursor at the end of the **&lt;/p&gt;** tag corresponding to the **model.Year** property, press Enter twice, and then type the following code.

  ```cs
		<p>
        	@Html.LabelFor(model =>model.Composer):
        	@Html.EditorFor(model =>model.Composer) 
        	@Html.ValidationMessageFor(model => model.Composer)
        </p>
```
13. Place the mouse cursor at the end of the **&lt;/p&gt;** tag corresponding to the **model.Composer** property, press Enter twice, and then type the following code.

  ```cs
		<input type="submit" value="Create"/>
```
14. Place the mouse cursor at the end of the **&lt;input&gt;** tag, press Enter, and then type the following code.

  ```cs
		@Html.ActionLink("Back to List", "Index")
```
15. On the **DEBUG** menu of the **OperasWebSite - Microsoft Visual Studio** window, click **Start Debugging**.

    >**Note** : The Operas I Have Seen page is displayed.

16. On the Operas I Have Seen page, click **operas I've seen**.

    >**Note** : On the Index page, the list of Operas is displayed.

17. On the Index page, click **Create New**.

    >**Note** : The Add an Opera page is displayed.

18. In the **Year** box of the Add an Opera page, type **1597** , and then click **Create**.

    >**Note** : Messages corresponding to the **Title** , **Year** , and **Composer** boxes are displayed. The web application mandates you to enter values in all the boxes. Alerts are also displayed for any inappropriate entries, with relevant messages.

19. In the **Title** box of the Add an Opera page, type **Rigoletto**.
20. In the **Year** box of the Add an Opera page, type **1851**.
21. In the **Composer** box of the Add an Opera page, type **Verdi** , and then click **Create**.

    >**Note** : The Opera is created with the mentioned values.

22. In the Windows Internet Explorer window, click the **Close** button.
23. In the **OperasWebSite - Microsoft Visual Studio** window, click the **Close** button.

©2016 Microsoft Corporation. All rights reserved.

The text in this document is available under the  [Creative Commons Attribution 3.0 License](https://creativecommons.org/licenses/by/3.0/legalcode), additional terms may apply. All other content contained in this document (including, without limitation, trademarks, logos, images, etc.) are  **not**  included within the Creative Commons license grant. This document does not provide you with any legal rights to any intellectual property in any Microsoft product. You may copy and use this document for your internal, reference purposes.

This document is provided &quot;as-is.&quot; Information and views expressed in this document, including URL and other Internet Web site references, may change without notice. You bear the risk of using it. Some examples are for illustration only and are fictitious. No real association is intended or inferred. Microsoft makes no warranties, express or implied, with respect to the information provided here.
