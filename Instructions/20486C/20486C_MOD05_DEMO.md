# Module 5: Developing ASP.NET MVC 5 Views

# Lesson 2: Using HTML Helpers

### Demonstration: How to Use HTML Helpers

1. Start **File Explorer**.
2. Navigate to **AllFiles (D):\Mod05\DemoCode\OperasWebsites**.
3. Open the **OperasWebSite.sln** project.

#### Demonstration Steps

1. In the Solution Explorer pane of the **OperasWebsites - Microsoft Visual Studio** window, expand **Controllers** , and then click  **OperaController.cs**.
2. In the **OperaController.cs** code window, locate the following code, right-click the code, and then click **Add View**.

  ```cs
		public ActionResult Create()
```
3. In the **View Name** box of the **Add View** dialog box, ensure that the name displayed is **Create**.
4. In the **Template** box, ensure that the name displayed is **Empty**
5. In the **Model class** box, ensure that the value is **Opera (OperasWebsites.Models)**. If not, in the **Model class** box, click **Opera (OperasWebsites.Models)**.
6. In the **Add View** dialog box, ensure that the **Use a layout page** check box is not selected, and then click **Add**.
7. In the **DIV** element of the **Create.cshtml** code window, type the following code.

		<h2>Add an Opera</h2>

8. Place the mouse cursor at the end of the **&lt;/h2&gt;** tag, press Enter twice, and then type the following code.

  ```cs
	@using (Html.BeginForm("Create","Opera",FormMethod.Post))   
    {
    }
```
9. In the **using** code block, type the following code.

  ```cs
		<p> 
		    @Html.LabelFor(model =>model.Title):        
		    @Html.EditorFor(model =>model.Title) 
		    @Html.ValidationMessageFor(model =>model.Title)   
		</p>
```
10. Place the mouse cursor at the end of the **&lt;/p&gt;** tag corresponding to the **model.Title** property, press Enter twice, and then type the following code.

  ```cs
		<p>
		    @Html.LabelFor(model =>model.Year): 
		    @Html.EditorFor(model =>model.Year)
		    @Html.ValidationMessageFor(model => model.Year)		   
		</p>
```
11. Place the mouse cursor at the end of the **&lt;/p&gt;** tag corresponding to the **model.Year** property, press Enter twice, and then type the following code.

  ```cs
		<p>
		    @Html.LabelFor(model =>model.Composer):
		    @Html.EditorFor(model =>model.Composer) 
		    @Html.ValidationMessageFor(model => model.Composer)
		</p>
```
12. Place the mouse cursor at the end of the **&lt;/p&gt;** tag corresponding to the **model.Composer** property, press Enter twice, and then type the following code.

  ```cs
		<input type="submit" value="Create"/>
```
13. Place the mouse cursor at the end of the **&lt;input&gt;** tag, press Enter, and then type the following code.

  ```cs
		@Html.ActionLink("Back to List", "Index")
```
14. On the **DEBUG** menu of the **OperasWebSite - Microsoft Visual Studio** window, click **Start Debugging**.

    >**Note** : The Operas I Have Seen page is displayed.

15. On the Operas I Have Seen page, click **operas I've seen**.

    >**Note** : On the Index page, the list of Operas is displayed.

16. On the Index page, click **Create New**.

    >**Note** : The Add an Opera page is displayed.

17. In the **Year** box of the Add an Opera page, type **1597** , and then click **Create**.

    >**Note** : Messages corresponding to the **Title** , **Year** , and **Composer** boxes are displayed. The web application mandates you to enter values in all the boxes. Alerts are also displayed for any inappropriate entries, with relevant messages.

18. In the **Title** box of the Add an Opera page, type **Rigoletto**.
19. In the **Year** box of the Add an Opera page, type **1851**.
20. In the **Composer** box of the Add an Opera page, type **Verdi** , and then click **Create**.

    >**Note** : The Opera is created with the mentioned values.

21. In the Windows Internet Explorer window, click the **Close** button.
22. In the **OperasWebSite - Microsoft Visual Studio** window, click the **Close** button.

©2016 Microsoft Corporation. All rights reserved.

The text in this document is available under the  [Creative Commons Attribution 3.0 License](https://creativecommons.org/licenses/by/3.0/legalcode), additional terms may apply. All other content contained in this document (including, without limitation, trademarks, logos, images, etc.) are  **not**  included within the Creative Commons license grant. This document does not provide you with any legal rights to any intellectual property in any Microsoft product. You may copy and use this document for your internal, reference purposes.

This document is provided &quot;as-is.&quot; Information and views expressed in this document, including URL and other Internet Web site references, may change without notice. You bear the risk of using it. Some examples are for illustration only and are fictitious. No real association is intended or inferred. Microsoft makes no warranties, express or implied, with respect to the information provided here.
