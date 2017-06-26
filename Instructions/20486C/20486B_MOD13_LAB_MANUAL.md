# Module 13: Using Windows Azure Web Services in ASP.NET MVC 4 Web Applications

# Lab: Using Microsoft Azure Web Services in ASP.NET MVC 4 Web Applications

#### Scenario

In the Photo Sharing application, the users have the option to add location information for a photo when they upload it. The senior developer wants you to store the longitude, latitude, and the address of the location so that other applications can use the data in mash-ups. You have been asked to create a service, hosted in Microsoft Azure, which will perform this conversion. You have to call this service from the Photo Upload page in the Photo Sharing application.

#### Objectives

After completing this lab, you will be able to:

- Install the Windows Azure software development kit (SDK).
- Create a Bing Maps developer account and trial key.
- Write a web service in Visual Studio that is hosted in Microsoft Azure.
- Call a Microsoft Azure web service from the server-side code in a web application.

#### Lab Setup

Estimated Time: **75 minutes**

Virtual Machine: **20486B-SEA-DEV11**

User name: **Admin**

Password: **Pa$$w0rd**

 >**Note:** In Hyper-V Manager, start the **MSL-TMG1** virtual machine if it is not already running.

Before starting this lab, you need to perform the following steps:

a. Apply the snapshot of the virtual machine, **20486B-SEA-DEV11**, that was taken after completing the lab in Module 11.  
b. Go to **Allfiles(D):\Mod11\Labfiles\Starter\PhotoSharingApplication\PhotoSharingApplication**, and then copy the **web.config** file.  
c. Go to **Allfiles(D):\Mod13\Labfiles\Starter\PhotoSharingApplication\PhotoSharingApplication**, and then paste the **web.config** file.  
d. Enable the **Allow NuGet to download missing packages during build** ption by performing the following steps:  

   i. On the **TOOLS** menu of the **Microsoft Visual Studio** window, click **Options**.  
   ii. In the navigation pane of the **Options** dialog box, click **Package Manager**.  
   iii. Under the **Package Restore** section, select **Allow NuGet to download missing packages during build**, and then click **OK**.

After completing this lab, you need to take the snapshot of the virtual machine. You need to apply this snapshot before starting the labs in Modules 14, 15, and 16.

### Exercise 1: Accessing Microsoft Azure and Bing Maps

#### Scenario

To develop a Windows Communication Foundation (WCF) service that is hosted in Microsoft Azure, you must install the Windows Azure SDK. To resolve address details to latitude and longitude data, you will use the Bing Maps Location API. You will call this API from the WCF service hosted in Microsoft Azure so that you can re-use your web service from other Adventure Works websites and applications.

In this exercise, you will:

- Install the Windows Azure SDK.
- Create a Bing Maps developer account.
- Create a Bing Maps Key.

The main tasks for this exercise are as follows:

1. Install the Windows Azure SDK.

2. Create a Bing Maps developer account.

3. Create a Bing Maps key.

#### Task 1: Install the Windows Azure SDK.

1. Start the following virtual machine, and sign in by using the following credentials:

   - Virtual Machine: **20486B-SEA-DEV11**
   - User name: **Admin**
   - Password: **Pa$$w0rd**

2. Go to the following folder:

   - **Allfiles(D):\Mod13\Labfiles\Windows Azure SDK Installation**

3. Run the **WindowsAzureAuthoringTools-x64.msi** Windows Installer Package.
4. Run the **WindowsAzureEmulator-x64.msi** application.
5. Run the **WindowsAzureLibsForNet-x64.msi** Windows Installer Package.
6. Run the **WindowsAzureTools.VS110.exe** application.

#### Task 2: Create a Bing Maps developer account.

1. Go to the following webpage:

   - **https://www.bingmapsportal.com**

2. Create a new Microsoft account  by using the following credentials:

   - User name: _&lt;Your Windows Live account name&gt;_
   - Password: &lt;_Your Windows Live account password_&gt;

3. Register a new Bing Maps developer account by using the following information:

   - Account Name: _&lt;Your account name&gt;_
   - Email Address: _&lt;Your Windows Live account name&gt;_

#### Task 3: Create a Bing Maps key.

- Create a new Bing Maps key in the Photo Sharing application by using the following information:

   - Application name: **Photo Sharing Application**
   - Key type: **Basic**
   - Application type: **Public website**

  >**Results** : After completing this exercise, you should have successfully registered an application to access the Bing Maps API.

### Exercise 2: Creating a WCF Service for Microsoft Azure

#### Scenario

You want to create a WCF service to resolve a locality string to a latitude and longitude by looking up the information in the Bing Maps Geocode REST service. After creating the WCF service, you need to host the service in Microsoft Azure by using the Windows Azure Cloud Service project template from the Windows Azure SDK.

In this exercise, you will:

- Add a new Windows Azure Cloud Service project to the web application.
- Create the Location Checker Service interface.
- Write the Location Checker service.
- Publish the service in Microsoft Azure.

The main tasks for this exercise are as follows:

1. Add a new Windows Azure Cloud Service project to the web application.

2. Create the Location Checker Service interface.

3. Write the Location Checker service.

4. Publish the service in Microsoft Azure.

#### Task 1: Add a new Windows Azure Cloud Service project to the web application.

1. Open the **PhotoSharingApplication.sln** file from the following location:

   - File location: **Allfiles(D):\Mod13\Labfiles\Starter\PhotoSharingApplication**

2. Add a new project to the **PhotoSharingApplication** web application by using the following information:

   - Template: **Windows Azure Cloud Service**
   - Name: **LocationChecker**
   - .NET Framework 4.5 role: **WCF Service Web Role**

3. Rename the **WCFServiceWebRole1** project as **LocationCheckerWebRole**.
4. Rename the **IService1.cs** file as **ILocationCheckerService.cs**.
5. Rename the **Service1.svc** file as **LocationCheckerService.svc**.
6. Rename the **WCFServiceWebRole1** namespace as **LocationCheckerWebRole** throughout the **LocationCheckerService.svc.cs** file.
7. Rename the **Service1** class as **LocationCheckerService**.
8. In the **ServiceDefinition.csdef** file, set the value of **vmsize** for the **LocationCheckerWebRole** to **ExtraSmall**.
9. Save all the changes.

#### Task 2: Create the Location Checker Service interface.

1. Remove all the method declarations from the **ILocationCheckerService** interface.

2. Add a new method declaration to the **ILocationCheckerService** interface by using the following information:

   - Annotation: **[OperationContract]**
   - Return type: **string**
   - Name: **GetLocation**
   - Parameter: a **string** named **address**

3. Save all the changes.

#### Task 3: Write the Location Checker service.

1. Remove the following public methods from the **LocationCheckerService** class:

   - **GetData**
   - **CompositeType**

2. Add a new method to the **LocationCheckerService** class by using the following information:

   - Scope: **public**
   - Return type: **string**
   - Name: **GetLocation**
   - Parameter: a **string** named **address**

3. Open the **Geocoding Usings.txt** file from the following location:

   - **Allfiles(D):\Mod13\Labfiles\Service Code**

4. Copy all the text from the **Geocoding Usings.txt** file, and then paste the text after the last **using** statement in the **LocationCheckerService.svc.cs** file.
5. Open the **Geocoding Code.txt** file from the following location:

   - **Allfiles(D):\Mod13\Labfiles\Service Code**

6. Copy all the text from the **Geocoding Code.txt** file, and then paste the text into the **GetLocation** method.
7. Open the **Geocoding Classes.txt** file from the following location: **Allfiles(D):\Mod13\Labfiles\Service Code**.
8. Copy all the text from the **Geocoding Classes.txt** file, and then paste the text after the declaration of the **LocationCheckerService** class.
9. From the **Bing Maps Account Center** page, copy the key you created for the Photo Sharing application.
10. In the **GetLocation** method, paste the key that was copied from the **Bing Maps Account Center** page as a value of the **key** variable.
11. Save all the changes.

#### Task 4: Publish the service in Microsoft Azure.

1. Package the **LocationChecker** project by using the following information:

   - Service configuration: **Cloud**
   - Build configuration: **Debug**

2. In Internet Explorer, sign in to the Microsoft Azure portal.
3. Create a new cloud service by using the following information:

   - URL: _&lt;Your Windows Live account name&gt;_ **LocationService**
   - Region: _&lt;Choose a location that is closest to your current location_&gt;

 >**Note:** If your Windows Live account name includes dots or @ symbols, replace these characters with dashes.

4. Upload a new staging deployment to the new cloud service by using the following information:

   - Name: **LocationChecker**
   - Package location: **Allfiles(D):\Mod13\Labfiles\Starter\PhotoSharingApplication\LocationChecker\bin\Debug\app.publish**
   - Package: **LocationChecker.cspkg**
   - Configuration: **ServiceConfiguration.Cloud.cscfg**
   - Deploy even if one or more roles contain a single instance.

 >**Results** : After completing this exercise, you should have successfully created a WCF cloud service and published the service in Microsoft Azure.

### Exercise 3: Calling a Web Service from Controller Action

#### Scenario

Now that you have created and deployed the Location Checker WCF service in Microsoft Azure, you can call the service from the Photo Sharing ASP.NET MVC web application. You can also call the service from other .NET code, such as desktop applications, if necessary.

In this exercise, you will use the Location Checker service to add latitude and longitude data to new photos as they are added to the Photo Sharing application.

The main tasks for this exercise are as follows:

1. Add a service reference to the Photo Sharing application.

2. Call the WCF service from the photo create action.

3. Configure the Services Database connection string.

4. Test the Location Checker service.

#### Task 1: Add a service reference to the Photo Sharing application.

1. Add a new **Service Reference** to the **PhotoSharingApplication** project by using the following information:

   - Address: Copy the **URL** from the **CLOUD SERVICE** page in the Microsoft Azure Portal
   - Namespace: **GeocodeService**

2. Add a **using** statement for the following namespace to the **PhotoController.cs** code file:

   - **PhotoSharingApplication.GeocodeService**

3. Save all the changes.

#### Task 2: Call the WCF service from the photo create action.

1. Add a new method to the **PhotoController** class by using the following information:

   - Scope: **private**
   - Return type: **string**
   - Name: **CheckLocation**
   - Parameter: a **string** named **location**

2. In the **CheckLocation** method, create a new variable by using the following information:

   - Type: **LocationCheckerServiceClient**
   - Name of the variable: **client**
   - Value of the variable: **Null**

3. In the **CheckLocation** method, create a new string variable, **response**, and initialize the value of the response variable to **Null**.
4. Add a new **try…catch** statement that catches all errors in a variable named **e**.
5. In the **try** block, set the **client** variable to be a **new LocationCheckerServiceClient**.
6. Pass the **location** parameter to the **client.GetLocation** method and store the result in the **response** variable.
7. In the **catch** block, store the **e.Message** property in the **response** variable.
8. At the end of the **CheckLocation** method, return the **response** string.
9. At the start of the **Create** action method for the **HTTP POST** verb, add an **if** statement that checks if **photo.Location** is not an empty string.
10. In the **if** statement, pass the **photo.Location** property to the **CheckLocation** method and store the result in a new **string** variable named **stringLongLat**.
11. Add an **if** statement to check whether the **stringLongLat** variable starts with the string, **Success**.
12. In the **if** statement, create a new array of characters named **splitChars** and add the single character **&quot;:&quot;** to the array.
13. Pass the **splitChars** array to the **Split** method of **stringLongLat**, and store the result in a new array of strings named **coordinates**.
14. Set the **photo.Latitude** property to the second string in the **coordinates** array and set the **photo.Longitude** property to the third string in the **coordinates** array.
15. Save all the changes.

#### Task 3: Configure the Services Database connection string.

1. In the Microsoft Azure Portal, copy the ADO.NET connection string for the **PhotoSharingAppServices** database to the Clipboard.

2. Paste the connection string into the **connectionString** value for the **AzureAppServices** connection string.
3. Save all the changes.

#### Task 4: Test the Location Checker service.

1. Set **PhotoSharingApplication** as the startup project for the solution.

2. Run the web application in debugging mode, and then sign in to the web application by using the following credentials:

   - User name: **David Johnson**
   - Password: **Pa$$w0rd2**

3. Add a new photo to the application by using the following information:

   - Title: **Testing Locations**
   - Photo: **Allfiles(D):\Mod13\Labfiles\Sample Photos\Beach.jpg**
   - Location: **Florence, OR**

4. Go to the **Home** page and display your new photo to check the **Latitude** and **Longitude** properties.
5. Stop debugging and close Visual Studio.

  >**Results** : After completing this exercise, you should have successfully added a service reference for a Windows Azure WCF service to a .NET Framework application. Also, you should be able to call a WCF service from an MVC controller action.

©2016 Microsoft Corporation. All rights reserved.

The text in this document is available under the  [Creative Commons Attribution 3.0 License](https://creativecommons.org/licenses/by/3.0/legalcode), additional terms may apply. All other content contained in this document (including, without limitation, trademarks, logos, images, etc.) are  **not**  included within the Creative Commons license grant. This document does not provide you with any legal rights to any intellectual property in any Microsoft product. You may copy and use this document for your internal, reference purposes.

This document is provided &quot;as-is.&quot; Information and views expressed in this document, including URL and other Internet Web site references, may change without notice. You bear the risk of using it. Some examples are for illustration only and are fictitious. No real association is intended or inferred. Microsoft makes no warranties, express or implied, with respect to the information provided here.
