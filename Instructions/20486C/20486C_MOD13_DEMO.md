# Module 13: Using Windows Azure Web Services in ASP.NET MVC 5 Web Applications

# Lesson 3: Consuming Windows Azure Services in a Web Application

#### Demonstration: How to Call a Windows Azure Service by Using jQuery

#### Preparation Steps

1. Ensure that you have cloned the 20486C directory from GitHub. It contains the code segments for this course's labs and demos. https://github.com/MicrosoftLearning/20486-DevelopingASPNETMVCWebApplications/tree/master/Allfiles
2. Open **File Explorer**.
3. Go to **Allfiles/20486C/Mod13/Democode/OperasWebsites**.
4. Double-click **OperasWebsites.sln**.


#### Demonstration Steps

1. In the **Solution Explorer** pane of the **OperasWebsites – Microsoft Visual Studio** window, expand **OperasWebsites**, expand **Views**, expand **Home**, and then double-click **Index.cshtml**.

2. In the **Index.cshtml** code window, locate the following code.
 
  ```cs
        @Html.ActionLink("operas I've seen.", "Index", "Opera")
        </p>
```
3. Place the cursor after the located code, press Enter twice, and then type the following code.

  ```cs
        <form>
        </form>
```
4. Place the cursor in the **FORM** element code block you just created, and then type the following code.

  ```cs
		<input type="button" value="Get Latest Quote" name="GetLatestQuote" onclick="callWebService();" />
```
5. Place the cursor at the end of the **INPUT** element, press Enter, and then type the following code.

  ```cs
		<p id="quote-display"></p>
```
6. In the **Index.cshtml** code window, locate the following code.

  ```cs
		</form>
```
7. Place the cursor at the end of the located code, press Enter twice, and then type the following code.

  ```cs
        <script type="text/javascript">
        </script>
```
8. Place the cursor in the **SCRIPT** element code block that you just created, and then type the following code.

  ```cs
        function callWebService() {
        }
```
9. Place the cursor in the **callWebService** function code block, and then type the following code.

  ```cs
		var serviceUrl = '@Url.Content("~/WebServices/QuotesService.asmx")';
```
10. In the **callWebService** function code block, place the cursor at the end of the variable that you just created, press Enter, and then type the following code.

  ```cs
        $.ajax({
           type: "POST",
           url: serviceUrl + "/LatestQuote",
           data: {},
           contentType: "application/json; charset=utf-8",
           dataType: "json",
           success: OnSuccess,
           error: OnError
        });
```
11. Place the cursor at the end of the **callWebService** function code block, but within the **SCRIPT** element, press Enter twice, and then type the following code.

  ```cs
        function OnSuccess(response) {
        }
```
12. Place the cursor in the **OnSuccess** function code block, and then type the following code.

  ```cs
		$('#quote-display').html(response.d);
```
  >**Note: response.d** is the property you use to access JSON data from the server.

13. Place the cursor at the end of the **OnSuccess** function code block, but within the **SCRIPT** element, press Enter twice, and then type the following code.

  ```cs
        function OnError(response) {
        }
```
14. Place the cursor within the **OnError** function, and then type the following code.

  ```cs
		$('#quote-display').html("Could not obtain the latest quote");
```
15. On the **DEBUG** menu of the **OperasWebsites – Microsoft Visual Studio** window, click **Start Debugging**.
16. On the **Operas I Have Seen** page, click **Get Latest Quote**.

  >**Note:** jQuery calls the web service and displays a quote on the home page. Note that you need not reload the page to display the quote.

17. In the **Internet Explorer** window, click **Close**.
18. In the **OperasWebsites – Microsoft Visual Studio** window, click **Close**.

©2016 Microsoft Corporation. All rights reserved.

The text in this document is available under the  [Creative Commons Attribution 3.0 License](https://creativecommons.org/licenses/by/3.0/legalcode), additional terms may apply. All other content contained in this document (including, without limitation, trademarks, logos, images, etc.) are  **not**  included within the Creative Commons license grant. This document does not provide you with any legal rights to any intellectual property in any Microsoft product. You may copy and use this document for your internal, reference purposes.

This document is provided &quot;as-is.&quot; Information and views expressed in this document, including URL and other Internet Web site references, may change without notice. You bear the risk of using it. Some examples are for illustration only and are fictitious. No real association is intended or inferred. Microsoft makes no warranties, express or implied, with respect to the information provided here.
