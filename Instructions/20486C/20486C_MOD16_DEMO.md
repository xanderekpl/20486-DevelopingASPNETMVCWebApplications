# Module 16: Deploying ASP.NET MVC 5 Web Applications

# Lesson 1: Deploying a Web Application

### Demonstration: How to Create a Microsoft Azure Web App

#### Demonstration Steps

1. On the taskbar, click the **Internet Explorer** icon.

2. In the Address bar of the Internet Explorer window, type **https://portal.azure.com**, and then press Enter.
3. If a page appears, prompting you to enter your email address, type your email address, and then click **Continue**. Wait for the **Sign In** page to appear, type your email address and password, and then click **Sign In**.

  >**Note:** During the sign-in process, if a page appears prompting you to choose from a list of previously used accounts, select the account that you previously used, and then continue to type your credentials.


4. In the left pane of the Microsoft Azure page, click **New**.
5. In the **Search the Marketplace** box, search for **Web App + SQL**, and click **Create**.
6. In the **App name** box of the **Web Ap + SQL Create** dialog, type _&lt;your username&gt;_ **operas**.

7. From the **APP SERVICE PLAN** drop-down list on the **Create Web App** page, select **Create new App Service plan**, and then click on **Create New**.
8. In the **App Service plan** box type a unique name.
9. In the **Location** drop down, select a location near you.
10. In the **Pricing tier** select **D1 Shared** and click **OK**.

11. Click the **SQL Database** box of the **Web App + SQL Create** page, then click on **Create new database**.
12. In the **Name** text box, type **OperasDB**.
13. Click on **Target server** and click **Create a new server**.
14. In the **Server name** box type a unique name.
15. In the **Server admin login** box type _&lt;your first name&gt;_.
16. In the **Password** and **Confirm password** text boxes, type **Pa$$w0rd**, then click **Select** to create the new server.
17. In the **SQL Database** dialog, click **Select**.
18. In the **Web App + SQL Create** dialog, click **Create** to create the web app.

  >**Note:** Microsoft Azure creates the new web app and database to support the Operas web app.

19. In the Internet Explorer window, click the **Close** button.

# Lesson 2: Deploying an ASP.NET MVC 5 Web Application

### Demonstration: How to Deploy a Website to Microsoft Azure

#### Preparation Steps

1. Navigate to **Allfiles(D):\Mod16\Democode\OperasWebSite**.
2. Open the **OperasWebSite.sln** project.
3. In the Solution Explorer pane, under **OperasWebSite\App\_Data**, delete the **aspnetdb.mdf** file. Also, delete the **aspnetdb\_log.ldf** file, if present.

#### Demonstration Steps

1. On the taskbar, click the **Microsoft Visual Studio** icon.
2. In the Solution Explorer pane of the OperasWebSite - Microsoft Visual Studio window, right-click **OperasWebsites**, and then click **Publish**.
3. On the **Publish** dialog, make sure that **Microsoft Azure App Service** is selected.
4. Select **Select Existing** and click on **Publish**.
5. Login to your Microsoft Account.
6. In the **Subscription** drop down, ensure that **Azure Pass** is selected**.
7. Locate  _&lt;your username&gt;_ **operas** and select it, then click **OK**.
8. Wait for the publish process to finish.

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
