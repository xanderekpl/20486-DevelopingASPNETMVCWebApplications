
# Module 11: Controlling Access to ASP.NET MVC 4 Web Applications

# Lesson 1: Implementing Authentication and Authorization

### Demonstration: How to Authorize Access to Controller Actions

#### Preparation Steps

1.	Sign in to the virtual machine, **20486B-SEA-DEV11**, with the user name, **admin**, and the password, **Pa$$w0rd**.
2.	Start **File Explorer**.
3.	Go to **Allfiles (D):\Democode\Mod11\OperasWebSite**.
4.	Double-click **OperasWebSite.sln**.
5.	Enable the **Allow NuGet to download missing packages during build** option, by performing the following steps:   
  a. On the **TOOLS** menu of the **Microsoft Visual Studio** window, click **Options**.   
  b. In the navigation pane of the **Options** dialog box, click **Package Manager**.   
  c. Under the **Package Restore** section, select the **Allow NuGet to download missing packages during build** checkbox, and then click **OK**.
  
  >**Note**: In Hyper-V Manager, start the **MSL-TMG1** virtual machine if it is not already running.

#### Demonstration Steps

1. On the **DEBUG** menu of the **OperasWebSite - Microsoft Visual Studio** window, click **Start Debugging**.
2. On the **Operas I Have Seen** page, click **All Operas**.
3. On the **Index of Operas** page, click the **Create New** link.

   >**Note:** The **Create an Opera** page is displayed without signing in to the application. This enables anonymous users to create new operas.

4. In the Windows Internet Explorer window, click the **Close** button.
5. In the Solution Explorer pane of the **OperasWebSite - Microsoft Visual Studio** window, expand **OperasWebSite**, expand **Controllers**, and then click **OperaController.cs**.
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
       public ActionResult
       Create(Opera newOpera)
```
9. Place the mouse cursor before the located code, type the following code, and then press Enter.

  ```cs
       [Authorize]
```
10. On the **FILE** menu of the **OperasWebSite - Microsoft Visual Studio** window, click **Save All**.
11. On the **DEBUG** menu of the **OperasWebSite - Microsoft Visual Studio** window, click **Start Debugging**.
12. On the **Operas I Have Seen** page, click **All Operas**.
13. On the **Index of Operas** page, click the **Create New** link.

   >**Note:** The **Login** view is now displayed and this prevents anonymous users from creating new operas.

14. On the **Index of Operas** page, click the **Register** link.
15. In the **User name** text box of the **Register** page, type **David Johnson**.
16. In the **Password** text box, type **Pa$$w0rd**, in the **Confirm password** text box, type **Pa$$w0rd**, and then click **Register**.
17. On the **Operas I Have Seen** page, click **All Operas**.
18. On the **Index of Operas** page, click the **Create New** link.

   >**Note:** The **Add an Opera** page is displayed because the request is authenticated.

19. In the Windows Internet Explorer window, click the **Close** button.
20. In the **OperasWebSite - Microsoft Visual Studio** window, click the **Close** button.


## Lesson 2: Assigning Roles and Membership

### Demonstration: How to Reset a Password

#### Preparation Steps

1.	Sign in to the virtual machine, **20486B-SEA-DEV11**, with the user name, **admin**, and the password, **Pa$$w0rd**.
2.	Start **File Explorer**.
3.	Go to **Allfiles (D):\Democode\Mod11\OperasWebSite**.
4.	Double-click **OperasWebSite.sln**.

  >**Note**: In Hyper-V Manager, start the **MSL-TMG1** virtual machine if it is not already running.

#### Demonstration Steps

1. In the Solution Explorer pane of the **OperasWebSite - Microsoft Visual Studio** window, under **Controllers**, click **AccountController.cs**.
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
6. On the **FILE** menu of the **OperasWebSite - Microsoft Visual Studio** window, click **Save All**.
7. On the **DEBUG** menu of the **OperasWebSite - Microsoft Visual Studio** window, click **Start Debugging**.
8. On the **Operas I Have Seen** page, click the **Log In** link.
9. On the **Logon** page, in the **User name** text box, type **David Johnson**, in the **Password** box, type **Pa$$w0rd**, and then click **Log in**.
10. On the **Operas I Have Seen** page, click the **Reset Password** link.
11. On the **ResetPassword** page, in the **Current password** text box, type **Pa$$w0rd**, and then in the **New password** text box, type **Pa$$w0rd2**.
12. In the **Confirm new password** text box, type **Pa$$w0rd2**, and then click **Change Password**.

   >**Note:** On the ResetPassword page, the message, **Your password has been changed.** is displayed.

13. In the Windows Internet Explorer window, click the **Close** button.
14. In the OperasWebSite – Microsoft Visual Studio window, click the **Close** button.
15. If the Microsoft Visual Studio warning message appears, click **Yes**.

©2016 Microsoft Corporation. All rights reserved.

The text in this document is available under the  [Creative Commons Attribution 3.0 License](https://creativecommons.org/licenses/by/3.0/legalcode), additional terms may apply. All other content contained in this document (including, without limitation, trademarks, logos, images, etc.) are  **not**  included within the Creative Commons license grant. This document does not provide you with any legal rights to any intellectual property in any Microsoft product. You may copy and use this document for your internal, reference purposes.

This document is provided &quot;as-is.&quot; Information and views expressed in this document, including URL and other Internet Web site references, may change without notice. You bear the risk of using it. Some examples are for illustration only and are fictitious. No real association is intended or inferred. Microsoft makes no warranties, express or implied, with respect to the information provided here.
