## Module 16: Deploying ASP.NET MVC 4 Web Applications

## Lab: Deploying ASP.NET MVC 4 Web Applications

#### Scenario

You have completed the development and testing of the photo sharing application. Your managers and senior developers have signed off the project, and have requested you to deploy the application to the Adventure Works Microsoft Azure account.

#### Objectives

After completing this lab, you will be able to:

- Prepare an MVC web application for deployment.
- Deploy an MVC web application to Microsoft Azure.

#### Lab Setup

Estimated Time: **45 minutes**

Virtual Machine: **20486B-SEA-DEV11**

User name: **Admin**

Password: **Pa$$w0rd**

  >**Note:** In Hyper-V Manager, start the **MSL-TMG1** virtual machine if it is not already running.

In this lab, you will create a web application in Microsoft Azure that runs in Free mode. Free mode is an excellent tool for testing and running small, non-intensive web applications. However, there is a limit of data transfer per day on the Free mode tool. After completing Exercise 2, you are encouraged to further test the deployed web application. However, if you do a lot of extra testing, you may encounter the limit and the application may become unavailable.

Also, before initiating this lab, perform the following steps:

1. Apply the Snapshot of the virtual machine, **20486B-SEA-DEV11**, that was taken after completing the lab in module 13.

2. Enable the **Allow NuGet to download missing packages during build** option, by performing the following steps:

   a. On the **TOOLS** menu of the Microsoft Visual Studio window, click **Options**.  

   b. In the navigation pane of the **Options** dialog box, click **Package Manager**.  
   c. Under the Package Restore section, select the **Allow NuGet to download missing packages during build** checkbox, and then click **OK**.

### Exercise 1: Deploying a Web Application to Microsoft Azure

#### Scenario

In this exercise, you will:

- Reconfigure the Photo Sharing application for release deployment.
- Configure the **Entity Framework initializer** class, which fills the database with initial data, and ensure that the build configuration and connection strings are correct.
- Create a new web application in Microsoft Azure and deploy the Photo Sharing application to the new site.

The main tasks for this exercise are as follows:

1. Prepare the Photo Sharing application project for deployment.

2. Create a new web app in Microsoft Azure.

3. Deploy the Photo Sharing application.

#### Task 1: Prepare the Photo Sharing application project for deployment.

1. Start the virtual machine, and log on with the following credentials:

	- Virtual machine: **20486B-SEA-DEV11**
	- User name: **Admin**
	- Password: **Pa$$w0rd**

2. Open the Photo Sharing application solution from the following location:

	- File location: **Allfiles(D):\Mod16\Labfiles\Starter\PhotoSharingApplication**.

3. In the **Build** properties of the **PhotoSharingApplication** project, select the **Release** configuration.

	- Sign in to the Microsoft Azure portal by using the following URL: **https://manage.windowsazure.com**

4. Copy the **ADO.NET** connection string for the **PhotoSharingDB** to the clipboard.
5. In the Web.config file, paste the connection string into the **connectionString** attribute of the **PhotoSharingDB** connection string. Set the password in the pasted connection string to **Pa$$w0rd**.
6. Log on to the Bing Maps Account Center web application by using the following information:

	- URL: **https://www.bingmapsportal.com**
	- User name: _&lt;Your Windows Live account name&gt;_
	- Password: _&lt;Your Windows Live account password&gt;_

7. Copy the Bing Maps key.
8. Replace the text, **{Your Bing Key}**, in the MapDisplay.js file, with the copied key.
9. Save all the changes.

#### Task 2: Create a new web app in Microsoft Azure.

- In Microsoft Azure, create a new web app by using the following information:

	- URL: _&lt;your username&gt;_ **PhotoSharing**
	- Region: _&lt;a region near you&gt;_
	- Database: **PhotoSharingDB**
	- Database connection string name: **PhotoSharingDB**.
	- Database user: _&lt;Your first name&gt;_
	- Password: **Pa$$w0rd**

#### Task 3: Deploy the Photo Sharing application.

1. In Windows Internet Explorer, download the publish profile for the _&lt;your username&gt;_ **PhotoSharing** web application.

2. In Microsoft Visual Studio, start the Publish Web wizard and import the publish profile you just downloaded.
3. Preview the files that require changes, and then publish the web application.

  >**Results** : After completing this exercise, you will be able to prepare an ASP.NET MVC web application for production deployment, create a web application in Microsoft Azure, and deploy an MVC web application to Microsoft Azure.

### Exercise 2: Testing the Completed Application

#### Scenario

You have completed and fully deployed the Photo Sharing web application in Microsoft Azure. Now, you want to perform some final functionality tests before you confirm the completion of the application to your manager.

The main tasks for this exercise are as follows:

1. Add a photo and a comment.

2. Use the slideshow and favorites options.

#### Task 1: Add a photo and a comment.

1. Log on to the **Adventure Works Photo Sharing** web application by using the following information:

	- User name: **David Johnson**
	- Password: **Pa$$w0rd2**

2. Add a new photo to the web application by using the following information:

	- Title: **Test New Photo**
	- Photo: **Allfiles(D):\Mod16\Labfiles\Sample Photos\track.JPG**
	- Description: **This is the first photo added to the deployed web application**

3. Display the new photo and check if the data is displayed correctly.
4. Add a new comment to the new photo by using the following information:

	- Subject: **Functionality Check**
	- Body: **The photo metadata is displayed correctly**

#### Task 2: Use the slideshow and favorites options.

1. Examine the Slideshow webpage and check that the display of all photos functions as designed.

2. Add three photos to your favorites list.
3. View the **Favorites** slideshow.

  >**Results** : After completing this exercise, you will be able to confirm that all the functionalities that you built in the Photo Sharing application run correctly in the Microsoft Azure deployment.
  
©2016 Microsoft Corporation. All rights reserved.

The text in this document is available under the  [Creative Commons Attribution 3.0 License](https://creativecommons.org/licenses/by/3.0/legalcode), additional terms may apply. All other content contained in this document (including, without limitation, trademarks, logos, images, etc.) are  **not**  included within the Creative Commons license grant. This document does not provide you with any legal rights to any intellectual property in any Microsoft product. You may copy and use this document for your internal, reference purposes.

This document is provided &quot;as-is.&quot; Information and views expressed in this document, including URL and other Internet Web site references, may change without notice. You bear the risk of using it. Some examples are for illustration only and are fictitious. No real association is intended or inferred. Microsoft makes no warranties, express or implied, with respect to the information provided here.
