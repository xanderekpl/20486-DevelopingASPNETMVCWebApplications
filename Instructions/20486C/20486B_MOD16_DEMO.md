# Module 16: Deploying ASP.NET MVC 5 Web Applications

# Lesson 1: Deploying a Web Application

### Demonstration: How to Create a Microsoft Azure Web App

#### Demonstration Steps

1. On the taskbar, click the **Internet Explorer** icon.

2. In the Address bar of the Internet Explorer window, type **https://portal.azure.com**, and then press Enter.
3. If a page appears, prompting you to enter your email address, type your email address, and then click **Continue**. Wait for the **Sign In** page to appear, type your email address and password, and then click **Sign In**.

  >**Note:** During the sign-in process, if a page appears prompting you to choose from a list of previously used accounts, select the account that you previously used, and then continue to type your credentials.

4. In the left pane of the Microsoft Azure page, click **WEB APPS**.
5. In the lower-left pane of the Microsoft Azure page, click **NEW**, and then click **CUSTOM CREATE**.
6. In the **URL** box of the **Create Web App** page, type _&lt;your username&gt;_ **operas**.
7. From the **APP SERVICE PLAN** drop-down list on the **Create Web App** page, select **Create new App Service plan**, and then in the **REGION** box, click _&lt;A region near you&gt;_.
8. In the **DATABASE** box of the **Create Web App** page, click **Create a new SQL database**, in the **DB CONNECTION STRING NAME** box, type **OperasDB**, and then click the **Next** button.
9. In the **NAME** box of the **Specify database settings** page, type **OperasDB**, in the **SERVER** box, click **New SQL database server**, and then, in the **SERVER LOGIN NAME** box, type _&lt;your first name&gt;_.
10. In the **SERVER LOGIN PASSWORD** box of the **Specify database settings** page, type **Pa$$w0rd**, in the **CONFIRM PASSWORD** box, type **Pa$$w0rd**, and then click the **Complete** button.

  >**Note:** Microsoft Azure creates the new web app and database to support the Operas web app.

11. In the Internet Explorer window, click the **Close** button.

# Lesson 2: Deploying an ASP.NET MVC 5 Web Application

### Demonstration: How to Deploy a Website to Microsoft Azure

#### Preparation Steps

1. Sign in to the virtual machine, **20486B-SEA-DEV11**, with the user name, **admin**, and the password, **Pa$$w0rd**.
2. Start File Explorer.
3. Navigate to **Allfiles(D):\Mod16\Democode\OperasWebSite**.
4. Open the **OperasWebSite.sln** project.
5. In the Solution Explorer pane, under **OperasWebSite\App\_Data**, delete the **aspnetdb.mdf** file. Also, delete the **aspnetdb\_log.ldf** file, if present.
6. Enable the **Allow NuGet to download missing packages during build** option, by performing the following steps:

   a. On the **TOOLS** menu of the Microsoft Visual Studio window, click **Options**.     
   b. In the navigation pane of the **Options** dialog box, click **Package Manager**.  
   c. Under the Package Restore section, select the **Allow NuGet to download missing packages during build** check box, and then click **OK**.

  >**Note** : In Hyper-V Manager, start the **MSL-TMG1** virtual machine if it is not already running.

#### Demonstration Steps

1. On the taskbar, click the **Internet Explorer** icon.

2. In the Address bar of the Internet Explorer window, type **https://manage.windowsazure.com**, and then press Enter.
3. If a page appears, prompting you to enter your email address, type your email address, and then click **Continue**. Wait for the **Sign In** page to appear, type your email address and password, and then click **Sign In**.

  >**Note:** During the sign-in process, if a page appears prompting you to choose from a list of previously used accounts, select the account that you previously used, and then continue to type your credentials. ** **

4. In the left pane of the **Microsoft Azure** page, click **WEB APPS**.
5. In the **NAME** column of the **web apps – Microsoft Azure** page, click _&lt;your username&gt;_ **operas**.
6. On the Microsoft Azure page, click **DASHBOARD**.

  >**Note:** If the quick start page appears, repeat steps 5 and 6 before proceeding to the next step.

7. In the quick glance section of the Microsoft Azure page, click the **Download the publish profile** link.
8. In the navigation bar, click **Save**, and then click the **Close** button.
9. On the taskbar, click the **Microsoft Visual Studio** icon.
10. In the Solution Explorer pane of the OperasWebSite - Microsoft Visual Studio window, right-click **OperasWebSite**, and then click **Publish**.
11. On the **Profile** page of the Publish Web wizard, click **Import**.
12. In the **Import Publish Settings** dialog box, click _&lt;your username&gt;_ **operas.azurewebsites.net.PublishSettings**, and then click **Open**.
13. On the **Connection** page of the Publish Web wizard, click **Validate Connection**.
14. If the **Certificate Error** dialog box appears, click **Accept**.
15. On the **Connection** page, click **Next**.
16. On the **Settings** page, click **Next**.
17. On the **Preview** page, click **Start Preview**.
18. On the **Preview** page, click **Publish**.

  >**Note:** Visual Studio publishes the website. This process can take several minutes. When the publish operation is complete, the website is displayed in the Internet Explorer window.

19. If the **Certificate Error** dialog box appears, click **Accept**.
20. In the Internet Explorer window, if the **Server Error in &#39;/&#39; Application** error displays, click the **Refresh** button.

  >**Note:** If the **Operas I Have Seen** page does not appear, you need to re-publish the **OperasWebSite** project.

21. On the **Operas I Have Seen** page, click **All Operas**.
22. In the Navigation bar, if the message **Intranet settings are turned off by default.** is displayed, click **Turn on Intranet settings**.
23. If the message **Are you sure you want to turn on intranet-level security settings?** appears, click **Yes**.
24. On the **Index of Operas** page, click the **Details** link corresponding to **Cosi Fan Tutte**.
25. On the **Opera: Cosi Fan Tutte** page, click the **Back to List** link.
26. On the **Index of Operas** page, click the **Details** link corresponding to **Nixon in China**.
27. In the Internet Explorer window, click the **Close** button.
28. In the **OperasWebSite - Microsoft Visual Studio** window, click the **Close** button.

©2016 Microsoft Corporation. All rights reserved.

The text in this document is available under the  [Creative Commons Attribution 3.0 License](https://creativecommons.org/licenses/by/3.0/legalcode), additional terms may apply. All other content contained in this document (including, without limitation, trademarks, logos, images, etc.) are  **not**  included within the Creative Commons license grant. This document does not provide you with any legal rights to any intellectual property in any Microsoft product. You may copy and use this document for your internal, reference purposes.

This document is provided &quot;as-is.&quot; Information and views expressed in this document, including URL and other Internet Web site references, may change without notice. You bear the risk of using it. Some examples are for illustration only and are fictitious. No real association is intended or inferred. Microsoft makes no warranties, express or implied, with respect to the information provided here.
