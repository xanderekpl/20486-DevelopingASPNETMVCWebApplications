# Module 5: Developing ASP.NET MVC 4 Views

# Lesson 2: Using HTML Helpers

### Demonstration: How to Use HTML Helpers

#### Demonstration Steps

1. In the Solution Explorer pane of the **OperasWebSite - Microsoft Visual Studio** window, expand **Controllers** , and then click  **OperaController.cs**.
2. On the **BUILD** menu of the **OperasWebSite - Microsoft Visual Studio** window, click **Build Solution**.
3. In the **OperaController.cs** code window, locate the following code, right-click the code, and then click **Add View**.

  ```cs
		public ActionResult Create ()
```
4. In the **View Name** box of the **Add View** dialog box, ensure that the name displayed is **Create**.
5. In the **Add View** dialog box, ensure that the **Create a strongly-typed view** check box is selected.
6. In the **Model class** box, ensure that the value is **Opera (OperasWebSite.Models)**. If not, in the **Model class** box, click **Opera (OperasWebSite.Models)**.
7. In the **Scaffold template** box, ensure that the value is **Empty**.
8. In the **Add View** dialog box, ensure that the **Use a layout or master page** check box is not selected, and then click **Add**.
9. In the **DIV** element of the **Create.cshtml** code window, type the following code.

		<h2>Add an Opera</h2>

10. Place the mouse cursor at the end of the **&lt;/h2&gt;** tag, press Enter twice, and then type the following code.

  ```cs
		@using (Html.BeginForm(
           "Create", "Opera",
           FormMethod.Post))
        {
        }
```
11. In the **using** code block, type the following code.

  ```cs
		<p>
        	@Html.LabelFor(model =>
               model.Title):
			@Html.EditorFor(model =>
			   model.Title)
			@Html.ValidationMessageFor(
			   model => model.Title)
        </p>
```
12. Place the mouse cursor at the end of the **&lt;/p&gt;** tag corresponding to the **model.Title** property, press Enter twice, and then type the following code.

  ```cs
		<p>
        	@Html.LabelFor(model =>
			   model.Year):
			@Html.EditorFor(model =>
		       model.Year)
			@Html.ValidationMessageFor(
			   model => model.Year)
		</p>
```
13. Place the mouse cursor at the end of the **&lt;/p&gt;** tag corresponding to the **model.Year** property, press Enter twice, and then type the following code.

  ```cs
		<p>
        	@Html.LabelFor(model =>
        	   model.Composer):
        	@Html.EditorFor(model =>
        	   model.Composer)
        	@Html.ValidationMessageFor(
        	   model => model.Composer)
        </p>
```
14. Place the mouse cursor at the end of the **&lt;/p&gt;** tag corresponding to the **model.Composer** property, press Enter twice, and then type the following code.

  ```cs
		input type="submit"
          value="Create" />
```
15. Place the mouse cursor at the end of the **&lt;input&gt;** tag, press Enter, and then type the following code.

  ```cs
		@Html.ActionLink("Back to List", "Index")
```
16. On the **DEBUG** menu of the **OperasWebSite - Microsoft Visual Studio** window, click **Start Debugging**.

    >**Note** : The Operas I Have Seen page is displayed.

17. On the Operas I Have Seen page, click **operas I've seen**.

    >**Note** : On the Index page, the list of Operas is displayed.

18. On the Index page, click **Create New**.

    >**Note** : The Add an Opera page is displayed.

19. In the **Year** box of the Add an Opera page, type **1597** , and then click **Create**.

    >**Note** : Messages corresponding to the **Title** , **Year** , and **Composer** boxes are displayed. The web application mandates you to enter values in all the boxes. Alerts are also displayed for any inappropriate entries, with relevant messages.

20. In the **Title** box of the Add an Opera page, type **Rigoletto**.
21. In the **Year** box of the Add an Opera page, type **1851**.
22. In the **Composer** box of the Add an Opera page, type **Verdi** , and then click **Create**.

    >**Note** : The Opera is created with the mentioned values.

23. In the Windows Internet Explorer window, click the **Close** button.
24. In the **OperasWebSite - Microsoft Visual Studio** window, click the **Close** button.
