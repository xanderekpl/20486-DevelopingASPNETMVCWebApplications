# Module 10: Using JavaScript and jQuery for Responsive MVC 4 Web Applications

# Lesson 1: Rendering and Executing JavaScript Code

### Demonstration: How to Use NuGet to Add a JavaScript Library

#### Demonstration Steps

1. In the **Solution Explorer** pane of the **OperasWebSite - Microsoft Visual Studio** window, expand **OperasWebSite**.

   >**Note:** There is no folder named **Scripts** at the top level of the project.

2. In the **Solution Explorer** pane, expand **Content**.

   >**Note:** The **Content** folder has only one file named **OperaStyles.css** , and there are no sub-folders.

3. On the **Tools** menu of the **OperasWebSite - Microsoft Visual Studio** window, point to **Library Package Manager**, and then click **Package Manager Console**.
4. In **Package Manager Console** window, type the following command, and then press Enter

```cs
       install-package jQuery.UI.Combined – version 1.8.17
```
5. In the **Solution Explorer** pane, expand **Scripts**.

    >**Note:** NuGet Package Manager has added five files for jquery and jqueryUI to the application. Note the version number for jquery and jqueryUI.

6. In the **Solution Explorer** pane, under **Contents**, expand **themes**, expand **base**, and then click **jquery-ui.css**.

    >**Note:** NuGet Package Manager has added style sheets to the **Content** folder. These styles are used to set the styles for jQueryUI widgets, and the most important of these style sheets is **jquery-ui.css**.

7. In the **Solution Explorer** pane, collapse **base**, expand **Views**, and then expand **Shared**.
8. In the **Solution Explorer** pane, under **Shared**, click **_SiteTemplate.cshtml**.
9. In the **_SiteTemplate.cshtml** code window, locate the following code.

```cs
    </head>
```
10. Place the mouse cursor before the located code, type the following code, and then press Enter.

```cs
      <script type="text/javascript" src="@Url.Content("~/Scripts/jquery-ui-1.8.17js")"></scripts>
```
11. In the **_SiteTemplate.cshtml** code window, locate the following code.

```cs
    <title>@ViewBag.Title</title>
```
12. Place the mouse cursor at the end of the located code, press Enter, and then type the following code.

```cs
    <link type="text/css" rel="stylesheet" 
        href="@Url.Content("~/Content/themes/base/jquery-ui.css")" />
```
    >**Note:** You can now use jQueryUI calls on any views in the application. 

13. On the **FILE** menu of the **OperasWebSite - Microsoft Visual Studio** window, click **Save All**.
14. In the **OperasWebSite - Microsoft Visual Studio** window, click **Close**.

# Lesson 2: Using jQuery and jQueryUI

### Demonstration: How to Add a jQueryUI Widget

#### Demonstration Steps

1. On the **DEBUG** menu of the **OperasWebsite – Microsoft Visual Studio** window, click **Start Debugging**.
2. On the **Operas I Have Seen** page, click the **All Operas** link.
3. In the **Main Opera List** section, click the **Details** link corresponding to **Cosi Fan Tutte**.
4. Under **Reviews**, note that there are three opera reviews displayed for **Cosi Fan Tutte**, simultaneously.
5. In the **Internet Explorer** window, click **Close**.
6. In the **Solution Explorer** pane of the **OperasWebsite – Microsoft Visual Studio** window, under **Shared**, click **_ReviewsForOpera.cshtml**.
7. In the **_ReviewsForOpera.cshtml** code window, locate the following code.

```cs
    <h3>Reviews</h3>
```
8. Place the mouse cursor immediately before the located code, type the following code, and then press Enter.

```cs
    <script>
        $(function() {
                $("#reviews-tool").accordion();
            });
        </script>
```
9. On the **DEBUG** menu of the **OperasWebsite – Microsoft Visual Studio** window, click **Start Debugging**.
10. On the **Operas I Have Seen** page, click the **All Operas** link.
11. In the **Main Opera List** section, click the **Details** link corresponding to **Cosi Fan Tutte**.
12. Under **Reviews**, note that there are three expandable sections, and each section contains a review.

     >**Note:** You can expand each section and then read the review content. 

13. In the **Internet Explorer** window, click **Close**.
14. In the **OperasWebSite – Microsoft Visual Studio** window, click the **Close** button.
