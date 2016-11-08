# Module 15: Handling Requests in ASP.NET MVC 4 Web Applications

# Lesson 2: Using Web Sockets

### Demonstration: How to Add a Chat Room to a Web Application by using SignalR

#### Preparation Steps

1. Sign in to the virtual machine, **20486B-SEA-DEV11**, with the user name, **admin**, and the password, **Pa$$w0rd**.
2. Start **File Explorer**.
3. Navigate to **Allfiles(D):\Democode\Mod15\OperasWebSite**.
4. Double-click **OperasWebSite.sln**.
5. Enable the **Allow NuGet to download missing packages during build** option by performing the following steps:

   a. On the **TOOLS** menu of the Microsoft Visual Studio window, click **Options**.  
   b. In the navigation pane of the **Options** dialog box, click **Package Manager**.  
   c. Under the Package Restore section, select the **Allow NuGet to download missing packages during build** check box, and then click **OK**.

  >**Note** : In Hyper-V Manager, start the **MSL-TMG1** virtual machine if it is not already running.

#### Demonstration Steps

1. In the **Solution Explorer** pane of the **OperasWebsite – Microsoft Visual Studio** window, right-click **OperasWebSite**, point to **Add**, and then click **Class**.
2. In the **Name** box of the **Add New Item – OperasWebSite** dialog box, type **ChatHub**, and then click **Add**.
3. In the ChatHub.cs code window, locate the following code.

  ```cs
		using System.Web;
```
4. Place the cursor at the end of the located code, press Enter, and then type the following code.

  ```cs
		using Microsoft.AspNet.SignalR;
```
5. In the ChatHub.cs code window, locate the following code.

  ```cs
		public class ChatHub
```
6. Replace the located code with the following code.

  ```cs
		public class ChatHub : Hub
```
7. In the **ChatHub** class code block, type the following code.

  ```cs
		public void Send(string name, string message)
        {
        }
```
8. In the **Send** method code block, type the following code.

  ```cs
		Clients.All.broadcastMessage(name, message);
```
  >**Note:** The **Send()** method sends any received message back to all the clients that are connected to the hub. You need to define the **broadcastMessage()** method in the client-side code to receive messages. The client-side code must also call the **Send()** method to broadcast messages.

9. In the **Solution Explorer** pane, expand **Views**, expand **Home**, and then click **Chat.cshtml**.
10. In the Chat.cshtml code window, within the final **&lt;script&gt;** element, type the following code.

  ```cs
		$(function() {
        });
```
11. Within the anonymous function you just created, type the following code.

  ```cs
		var chat = $.connection.chatHub;
```
12. Place the cursor at the end of the variable you just created, press Enter, and then type the following code.

  ```cs
		chat.client.broadcastMessage = function (name, message) {
        };
```
  >**Note:** This function is the implementation of the **broadcastMessage()** function that you called in the Hub code.

13. Within the anonymous function you just created, type the following code.

  ```cs
		var listItem = '<li>' + name + ': ' + message + '</li>';
```
14. Place the cursor at the end of the variable you just created, press Enter, and then type the following code.

  ```cs
		$('#discussion').append(listItem);
```
15. Place the cursor at the end of the **broadcastMessage** function code block, press Enter, and then type the following code.

  ```cs
		var displayname = prompt('Enter your name:', '');
```
16. Place the cursor at the end of the **displayname** variable code block you just created, press Enter, and then type the following code.

  ```cs
		$('#chat-message').focus();
```
17. Place the cursor at the end of the code block you just created, press Enter, and then type the following code.

  ```cs
		$.connection.hub.start().done(function () {
        });
```
18. Within the anonymous function code block you just created, type the following code.

  ```cs
		$('#sendmessage').click(function () {
        });
```
19. Within the new anonymous function code block you just created, type the following code.

  ```cs
		chat.server.send(displayname, $('#chat-message').val());
```
20. Place the cursor at the end of the code block you just created, press Enter, and then type the following code.

  ```cs
		$('#chat-message').val('').focus();
```
21. On the **DEBUG** menu of the **OperasWebSite – Microsoft Visual Studio** window, click **Start Debugging**.
22. On the **Operas I Have Seen** page, click the **Enter the Operas Chat Room** link.
23. In the **Enter your name** box of the **localhost needs some information** dialog box, type **Rebecca Laszlo** , and then click **OK**.
24. In the **Message** box of the **Operas I Have Seen** page, type a message of your choice, and then click **Send**.

  >**Note:** SignalR sends the message you typed to the hub. The hub broadcasts the message to all connected clients.

25. On the taskbar, right-click the **Internet Explorer** icon, and then click **Internet Explorer**.
26. In the Address bar of the Internet Explorer window, type **http://localhost:&lt; _portnumber_ &gt;**,and then press Enter.
27. On the **Operas I Have Seen** page, click the **Enter the Operas Chat Room** link.
28. In the **Enter your name** box of the **localhost needs some information** dialog box, type **Elisa Graceffo**, and then click **OK**.
29. In the **Message** box of the **Operas I Have Seen** page, type a message of your choice, and then click **Send**.
30. On the taskbar, click the first instance of the Internet Explorer window. Note that the message from **Elisa Graceffo** is displayed because both users are connected to the same hub.
31. Close all the Internet Explorer windows.
32. In the **OperasWebSite – Microsoft Visual Studio** window, click the **Close** button.

©2016 Microsoft Corporation. All rights reserved.

The text in this document is available under the  [Creative Commons Attribution 3.0 License](https://creativecommons.org/licenses/by/3.0/legalcode), additional terms may apply. All other content contained in this document (including, without limitation, trademarks, logos, images, etc.) are  **not**  included within the Creative Commons license grant. This document does not provide you with any legal rights to any intellectual property in any Microsoft product. You may copy and use this document for your internal, reference purposes.

This document is provided &quot;as-is.&quot; Information and views expressed in this document, including URL and other Internet Web site references, may change without notice. You bear the risk of using it. Some examples are for illustration only and are fictitious. No real association is intended or inferred. Microsoft makes no warranties, express or implied, with respect to the information provided here.
