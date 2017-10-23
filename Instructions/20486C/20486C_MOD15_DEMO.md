# Module 15: Handling Requests in ASP.NET MVC 5 Web Applications

# Lesson 2: Using Web Sockets

### Demonstration: How to Add a Chat Room to a Web Application by using SignalR

#### Preparation Steps

1. Ensure that you have cloned the 20486C directory from GitHub. It contains the code segments for this course's labs and demos. https://github.com/MicrosoftLearning/20486-DevelopingASPNETMVCWebApplications/tree/master/Allfiles
2. Start **File Explorer**.
3. Navigate to **Allfiles/20486C/Mod15/Democode/OperasWebsites**.
4. Double-click **OperasWebsites.sln**.

#### Demonstration Steps

1. On the **Tools** menu of the **OperasWebsites - Microsoft Visual Studio** window, point to **Library Package Manager**, and then click **Package Manager Console**.
2. In **Package Manager Console** window, type the following command, and then press Enter

  ```cs
       Install-Package Microsoft.AspNet.SignalR -Version 2.2.2
```
3. In the **Solution Explorer** pane, expand **Scripts**.

    >**Note:** NuGet Package Manager has added files for SignalR to the application. Note the version number for SignalR.


4. In the **Solution Explorer** pane of the **OperasWebsites – Microsoft Visual Studio** window, right-click **OperasWebsites**, point to **Add**, and then click **Class**.
5. In the **Name** box of the **Add New Item – OperasWebsites** dialog box, type **ChatHub**, and then click **Add**.
6. In the ChatHub.cs code window, locate the following code.

  ```cs
		using System.Web;
```
7. Place the cursor at the end of the located code, press Enter, and then type the following code.

  ```cs
		using Microsoft.AspNet.SignalR;
```
8. In the ChatHub.cs code window, locate the following code.

  ```cs
		public class ChatHub
```
9. Replace the located code with the following code.

  ```cs
		public class ChatHub : Hub
```
10. In the **ChatHub** class code block, type the following code.

  ```cs
        public void Send(string name, string message)
        {
        }
```
11. In the **Send** method code block, type the following code.

  ```cs
		Clients.All.broadcastMessage(name, message);
```
  >**Note:** The **Send()** method sends any received message back to all the clients that are connected to the hub. You need to define the **broadcastMessage()** method in the client-side code to receive messages. The client-side code must also call the **Send()** method to broadcast messages.

12. In the **Solution Explorer** pane, right click **OperasWebsites** project, click **Add**, and then click **New class**.
13. Name the class **Startup.cs** and click **Add**.
14. Locate ```using System.Web;``` and add the following using statements just after it.
  ```cs
    using Owin;
    using Microsoft.Owin;
    [assembly: OwinStartup(typeof(OperasWebsites.Startup))]
```
15. Within the **Startup** class, type the following code.
  ```cs
        public void Configuration(IAppBuilder app)
        {
            // Any connection or hub wire up and configuration should go here
            app.MapSignalR();
        }
```

16. In the **Solution Explorer** pane, expand **Views**, expand **Home**, and then click **Chat.cshtml**.
17. In the Chat.cshtml code window, within the final **&lt;script&gt;** element, type the following code.

  ```cs
        $(function() {
        });
```
18. Within the anonymous function you just created, type the following code.

  ```cs
		var chat = $.connection.chatHub;
```
19. Place the cursor at the end of the variable you just created, press Enter, and then type the following code.

  ```cs
        chat.client.broadcastMessage = function(name, message) {
        };
```
  >**Note:** This function is the implementation of the **broadcastMessage()** function that you called in the Hub code.

20. Within the anonymous function you just created, type the following code.

  ```cs
		var listItem = '<li>' + name + ': ' + message + '</li>';
```
21. Place the cursor at the end of the variable you just created, press Enter, and then type the following code.

  ```cs
		$('#discussion').append(listItem);
```
22. Place the cursor at the end of the **broadcastMessage** function code block, press Enter, and then type the following code.

  ```cs
		var displayname = prompt('Enter your name:', '');
```
23. Place the cursor at the end of the **displayname** variable code block you just created, press Enter, and then type the following code.

  ```cs
		$('#chat-message').focus();
```
24. Place the cursor at the end of the code block you just created, press Enter, and then type the following code.

  ```cs
        $.connection.hub.start().done(function() {
        });
```
25. Within the anonymous function code block you just created, type the following code.

  ```cs
        $('#sendmessage').click(function() {
        });
```
26. Within the new anonymous function code block you just created, type the following code.

  ```cs
		chat.server.send(displayname, $('#chat-message').val());
```
27. Place the cursor at the end of the code block you just created, press Enter, and then type the following code.

  ```cs
		$('#chat-message').val('').focus();
```
28. On the **DEBUG** menu of the **OperasWebsites – Microsoft Visual Studio** window, click **Start Debugging**.
29. On the **Operas I Have Seen** page, click **Enter the Operas Chat Room**.
30. In the **Enter your name** box of the **localhost needs some information** dialog box, type **Rebecca Laszlo** , and then click **OK**.
31. In the **Message** box of the **Operas I Have Seen** page, type a message of your choice, and then click **Send**.

  >**Note:** SignalR sends the message you typed to the hub. The hub broadcasts the message to all connected clients.

32. On the taskbar, right-click the **Internet Explorer** icon, and then click **Internet Explorer**.
33. In the Address bar of the Internet Explorer window, type **http://localhost:[port]/**, and then press Enter.
34. On the **Operas I Have Seen** page, click **Enter the Operas Chat Room**.
35. In the **Enter your name** box of the **localhost needs some information** dialog box, type **Elisa Graceffo**, and then click **OK**.
36. In the **Message** box of the **Operas I Have Seen** page, type a message of your choice, and then click **Send**.
37. On the taskbar, click the first instance of the Internet Explorer window. Note that the message from **Elisa Graceffo** is displayed because both users are connected to the same hub.
38. Close all the Internet Explorer windows.
39. In the **OperasWebsites – Microsoft Visual Studio** window, click **Close**.

©2016 Microsoft Corporation. All rights reserved.

The text in this document is available under the  [Creative Commons Attribution 3.0 License](https://creativecommons.org/licenses/by/3.0/legalcode), additional terms may apply. All other content contained in this document (including, without limitation, trademarks, logos, images, etc.) are  **not**  included within the Creative Commons license grant. This document does not provide you with any legal rights to any intellectual property in any Microsoft product. You may copy and use this document for your internal, reference purposes.

This document is provided &quot;as-is.&quot; Information and views expressed in this document, including URL and other Internet Web site references, may change without notice. You bear the risk of using it. Some examples are for illustration only and are fictitious. No real association is intended or inferred. Microsoft makes no warranties, express or implied, with respect to the information provided here.
