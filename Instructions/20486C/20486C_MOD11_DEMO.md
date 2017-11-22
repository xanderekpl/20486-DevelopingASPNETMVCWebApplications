# Module 11: Controlling Access to ASP.NET MVC 5 Web Applications

# Lesson 1: Implementing Authentication and Authorization

### Demonstration: How to Authorize Access to Controller Actions

#### Preparation Steps

1. Ensure that you have cloned the 20486C directory from GitHub. It contains the code segments for this course's labs and demos. https://github.com/MicrosoftLearning/20486-DevelopingASPNETMVCWebApplications/tree/master/Allfiles	
2. Start **File Explorer**.
3.	Go to **Allfiles/20486C/Mod11/Democode/OperasWebsites**.
4.	Double-click **OperasWebsites.sln**.

#### Demonstration Steps

1. On the **DEBUG** menu of the **OperasWebsites - Microsoft Visual Studio** window, click **Start Debugging**.
2. On the **Operas I Have Seen** page, click **All Operas**.
3. On the **Index of Operas** page, click **Create New**.

   >**Note:** The **Create an Opera** page is displayed without signing in to the application. This enables anonymous users to create new operas.

4. In the Windows Microsoft Edge window, click **Close**.
5. In the Solution Explorer pane of the **OperasWebsites - Microsoft Visual Studio** window, expand **OperasWebsites**, expand **Controllers**, and then click **OperaController.cs**.
6. In the OperaController.cs code window, locate the following code.

  ```cs
       public ActionResult Create()
```
7. Place the mouse cursor before the located code, type the following code, and then press Enter.

  ```cs
       [Authorize]
```
8. In the OperaController.cs code window, locate the following code.

  ```cs
       [HttpPost]
       public ActionResult Create(Opera newOpera)
```
9. Place the mouse cursor before the located code, type the following code, and then press Enter.

  ```cs
       [Authorize]
```
10. On the **FILE** menu of the **OperasWebsites - Microsoft Visual Studio** window, click **Save All**.
11. On the **DEBUG** menu of the **OperasWebsites - Microsoft Visual Studio** window, click **Start Debugging**.
12. On the **Operas I Have Seen** page, click **All Operas**.
13. On the **Index of Operas** page, click **Create New**.

   >**Note:** The **Login** view is now displayed and this prevents anonymous users from creating new operas.

14. On the **Index of Operas** page, click **Register**.
15. In the **User name** text box of the **Register** page, type **David Johnson**.
16. In the **Password** text box, type **Pa$$w0rd**, in the **Confirm password** text box, type **Pa$$w0rd**, and then click **Register**.
17. On the **Operas I Have Seen** page, click **All Operas**.
18. On the **Index of Operas** page, click **Create New**.

   >**Note:** The **Add an Opera** page is displayed because the request is authenticated.

19. In the Windows Microsoft Edge window, click **Close**.
20. In the **OperasWebsites - Microsoft Visual Studio** window, click **Close**.


## Lesson 2: Assigning Roles and Membership

### Demonstration: How to Reset a Password

#### Preparation Steps

1. Ensure that you have cloned the 20486C directory from GitHub. It contains the code segments for this course's labs and demos. https://github.com/MicrosoftLearning/20486-DevelopingASPNETMVCWebApplications/tree/master/Allfiles	
2. Start **File Explorer**.
3.	Go to **Allfiles/20486C/Mod11/Democode/OperasWebsites**.
4.	Double-click **OperasWebsites.sln**.

#### Demonstration Steps

1. In the Solution Explorer pane of the **OperasWebsites - Microsoft Visual Studio** window, under **Controllers**, click **AccountController.cs**.
2. In the AccountController.cs code window, locate the following comment.

  ```cs
       //Add Reset Password Code Here
```
3. In the AccountController.cs code window, replace the located comment with the following code, and then press Enter.

  ```cs
       try
       {
       }
       catch (Exception)
       {
       }
```
4. In the **try** code block, type the following code.

  ```cs
       changePasswordSucceeded = Membership.Provider.ChangePassword(User.Identity.Name, model.OldPassword, model.NewPassword);
```
5. In the **catch** code block, type the following code.

  ```cs
       changePasswordSucceeded = false;
```
6. On the **FILE** menu of the **OperasWebsites - Microsoft Visual Studio** window, click **Save All**.
7. On the **DEBUG** menu of the **OperasWebsites - Microsoft Visual Studio** window, click **Start Debugging**.
8. On the **Operas I Have Seen** page, click **Log In**.
9. On the **Login** page, in the **User name** text box, type **David Johnson**, in the **Password** box, type **Pa$$w0rd**, and then click **Log in**.
10. On the **Operas I Have Seen** page, click **Reset Password**.
11. On the **ResetPassword** page, in the **Current password** text box, type **Pa$$w0rd**, and then in the **New password** text box, type **Pa$$w0rd2**.
12. In the **Confirm new password** text box, type **Pa$$w0rd2**, and then click **Change Password**.

   >**Note:** On the ResetPassword page, the message, **Your password has been changed.** is displayed.

13. In the Windows Microsoft Edge window, click **Close**.
14. In the OperasWebsites – Microsoft Visual Studio window, click **Close**.
15. If the Microsoft Visual Studio warning message appears, click **Yes**.

©2016 Microsoft Corporation. All rights reserved. 

The text in this document is available under the  [Creative Commons Attribution 3.0 License](https://creativecommons.org/licenses/by/3.0/legalcode), additional terms may apply. All other content contained in this document (including, without limitation, trademarks, logos, images, etc.) are  **not**  included within the Creative Commons license grant. This document does not provide you with any legal rights to any intellectual property in any Microsoft product. You may copy and use this document for your internal, reference purposes.

This document is provided &quot;as-is.&quot; Information and views expressed in this document, including URL and other Internet Web site references, may change without notice. You bear the risk of using it. Some examples are for illustration only and are fictitious. No real association is intended or inferred. Microsoft makes no warranties, express or implied, with respect to the information provided here.
