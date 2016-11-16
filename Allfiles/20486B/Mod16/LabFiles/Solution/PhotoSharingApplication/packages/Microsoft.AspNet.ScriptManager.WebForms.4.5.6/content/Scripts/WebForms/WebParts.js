//CdnPath=http://ajax.aspnetcdn.com/ajax/4.5/6/WebParts.js
var __wpm = null;
function Point(x, y) {
    this.x = x;
    this.y = y;
}
function __wpTranslateOffset(x, y, offsetElement, relativeToElement, includeScroll) {
    while ((typeof(offsetElement) != "undefined") && (offsetElement != null) && (offsetElement != relativeToElement)) {
        x += offsetElement.offsetLeft;
        y += offsetElement.offsetTop;
        var tagName = offsetElement.tagName;
        if ((tagName != "TABLE") && (tagName != "BODY")) {
            x += offsetElement.clientLeft;
            y += offsetElement.clientTop;
        }
        if (includeScroll && (tagName != "BODY")) {
            x -= offsetElement.scrollLeft;
            y -= offsetElement.scrollTop;
        }
        offsetElement = offsetElement.offsetParent;
    }
    return new Point(x, y);
}
function __wpGetPageEventLocation(event, includeScroll) {
    if ((typeof(event) == "undefined") || (event == null)) {
        event = window.event;
    }
    return __wpTranslateOffset(event.offsetX, event.offsetY, event.srcElement, null, includeScroll);
}
function __wpClearSelection() {
    document.selection.empty();
}
function WebPart(webPartElement, webPartTitleElement, zone, zoneIndex, allowZoneChange) {
    this.webPartElement = webPartElement;
    this.allowZoneChange = allowZoneChange;
    this.zone = zone;
    this.zoneIndex = zoneIndex;
    this.title = ((typeof(webPartTitleElement) != "undefined") && (webPartTitleElement != null)) ?
        webPartTitleElement.innerText : "";
    webPartElement.__webPart = this;
    if ((typeof(webPartTitleElement) != "undefined") && (webPartTitleElement != null)) {
        webPartTitleElement.style.cursor = "move";
        webPartTitleElement.attachEvent("onmousedown", WebPart_OnMouseDown);
        webPartElement.attachEvent("ondragstart", WebPart_OnDragStart);
        webPartElement.attachEvent("ondrag", WebPart_OnDrag);
        webPartElement.attachEvent("ondragend", WebPart_OnDragEnd);
    }
    this.UpdatePosition = WebPart_UpdatePosition;
    this.Dispose = WebPart_Dispose;
}
function WebPart_Dispose() {
    this.webPartElement.__webPart = null    
}
function WebPart_OnMouseDown() {
    var currentEvent = window.event;
    var draggedWebPart = WebPart_GetParentWebPartElement(currentEvent.srcElement);
    if ((typeof(draggedWebPart) == "undefined") || (draggedWebPart == null)) {
        return;
    }
    document.selection.empty();
    try {
        __wpm.draggedWebPart = draggedWebPart;
        __wpm.DragDrop();
    }
    catch (e) {
        __wpm.draggedWebPart = draggedWebPart;
        window.setTimeout("__wpm.DragDrop()", 0);
    }
    currentEvent.returnValue = false;
    currentEvent.cancelBubble = true;
}
function WebPart_OnDragStart() {
    var currentEvent = window.event;
    var webPartElement = currentEvent.srcElement;
    if ((typeof(webPartElement.__webPart) == "undefined") || (webPartElement.__webPart == null)) {
        currentEvent.returnValue = false;
        currentEvent.cancelBubble = true;
        return;
    }
    var dataObject = currentEvent.dataTransfer;
    dataObject.effectAllowed = __wpm.InitiateWebPartDragDrop(webPartElement);
}
function WebPart_OnDrag() {
    __wpm.ContinueWebPartDragDrop();
}
function WebPart_OnDragEnd() {
    __wpm.CompleteWebPartDragDrop();
}
function WebPart_GetParentWebPartElement(containedElement) {
    var elem = containedElement;
    while ((typeof(elem.__webPart) == "undefined") || (elem.__webPart == null)) {
        elem = elem.parentElement;
        if ((typeof(elem) == "undefined") || (elem == null)) {
            break;
        }
    }
    return elem;
}
function WebPart_UpdatePosition() {
    var location = __wpTranslateOffset(0, 0, this.webPartElement, null, false);
    this.middleX = location.x + this.webPartElement.offsetWidth / 2;
    this.middleY = location.y + this.webPartElement.offsetHeight / 2;
}
function Zone(zoneElement, zoneIndex, uniqueID, isVertical, allowLayoutChange, highlightColor) {
    var webPartTable = null;
    if (zoneElement.rows.length == 1) {
        webPartTableContainer = zoneElement.rows[0].cells[0];
    }
    else {
        webPartTableContainer = zoneElement.rows[1].cells[0];
    }
    var i;
    for (i = 0; i < webPartTableContainer.childNodes.length; i++) {
        var node = webPartTableContainer.childNodes[i];
        if (node.tagName == "TABLE") {
            webPartTable = node;
            break;
        }
    }
    this.zoneElement = zoneElement;
    this.zoneIndex = zoneIndex;
    this.webParts = new Array();
    this.uniqueID = uniqueID;
    this.isVertical = isVertical;
    this.allowLayoutChange = allowLayoutChange;
    this.allowDrop = false;
    this.webPartTable = webPartTable;
    this.highlightColor = highlightColor;
    this.savedBorderColor = (webPartTable != null) ? webPartTable.style.borderColor : null;
    this.dropCueElements = new Array();
    if (webPartTable != null) {
        if (isVertical) {
            for (i = 0; i < webPartTable.rows.length; i += 2) {
                this.dropCueElements[i / 2] = webPartTable.rows[i].cells[0].childNodes[0];
            }
        }
        else {
            for (i = 0; i < webPartTable.rows[0].cells.length; i += 2) {
                this.dropCueElements[i / 2] = webPartTable.rows[0].cells[i].childNodes[0];
            }
        }
    }
    this.AddWebPart = Zone_AddWebPart;
    this.GetWebPartIndex = Zone_GetWebPartIndex;
    this.ToggleDropCues = Zone_ToggleDropCues;
    this.UpdatePosition = Zone_UpdatePosition;
    this.Dispose = Zone_Dispose;
    webPartTable.__zone = this;
    webPartTable.attachEvent("ondragenter", Zone_OnDragEnter);
    webPartTable.attachEvent("ondrop", Zone_OnDrop);
}
function Zone_Dispose() {
    for (var i = 0; i < this.webParts.length; i++) {
        this.webParts[i].Dispose();
    }
    this.webPartTable.__zone = null;
}
function Zone_OnDragEnter() {
    var handled = __wpm.ProcessWebPartDragEnter();
    var currentEvent = window.event;
    if (handled) {
        currentEvent.returnValue = false;
        currentEvent.cancelBubble = true;
    }
}
function Zone_OnDragOver() {
    var handled = __wpm.ProcessWebPartDragOver();
    var currentEvent = window.event;
    if (handled) {
        currentEvent.returnValue = false;
        currentEvent.cancelBubble = true;
    }
}
function Zone_OnDrop() {
    var handled = __wpm.ProcessWebPartDrop();
    var currentEvent = window.event;
    if (handled) {
        currentEvent.returnValue = false;
        currentEvent.cancelBubble = true;
    }
}
function Zone_GetParentZoneElement(containedElement) {
    var elem = containedElement;
    while ((typeof(elem.__zone) == "undefined") || (elem.__zone == null)) {
        elem = elem.parentElement;
        if ((typeof(elem) == "undefined") || (elem == null)) {
            break;
        }
    }
    return elem;
}
function Zone_AddWebPart(webPartElement, webPartTitleElement, allowZoneChange) {
    var webPart = null;
    var zoneIndex = this.webParts.length;
    if (this.allowLayoutChange && __wpm.IsDragDropEnabled()) {
        webPart = new WebPart(webPartElement, webPartTitleElement, this, zoneIndex, allowZoneChange);
    }
    else {
        webPart = new WebPart(webPartElement, null, this, zoneIndex, allowZoneChange);
    }
    this.webParts[zoneIndex] = webPart;
    return webPart;
}
function Zone_ToggleDropCues(show, index, ignoreOutline) {
    if (ignoreOutline == false) {
        this.webPartTable.style.borderColor = (show ? this.highlightColor : this.savedBorderColor);
    }
    if (index == -1) {
        return;
    }
    var dropCue = this.dropCueElements[index];
    if (dropCue && dropCue.style) {
        if (dropCue.style.height == "100%" && !dropCue.webPartZoneHorizontalCueResized) {
            var oldParentHeight = dropCue.parentElement.clientHeight;
            var realHeight = oldParentHeight - 10;
            dropCue.style.height = realHeight + "px";
            var dropCueVerticalBar = dropCue.getElementsByTagName("DIV")[0];
            if (dropCueVerticalBar && dropCueVerticalBar.style) {
                dropCueVerticalBar.style.height = dropCue.style.height;
                var heightDiff = (dropCue.parentElement.clientHeight - oldParentHeight);
                if (heightDiff) {
                    dropCue.style.height = (realHeight - heightDiff) + "px";
                    dropCueVerticalBar.style.height = dropCue.style.height;
                }
            }
            dropCue.webPartZoneHorizontalCueResized = true;
        }
        dropCue.style.visibility = (show ? "visible" : "hidden");
    }
}
function Zone_GetWebPartIndex(location) {
    var x = location.x;
    var y = location.y;
    if ((x < this.webPartTableLeft) || (x > this.webPartTableRight) ||
        (y < this.webPartTableTop) || (y > this.webPartTableBottom)) {
        return -1;
    }
    var vertical = this.isVertical;
    var webParts = this.webParts;
    var webPartsCount = webParts.length;
    for (var i = 0; i < webPartsCount; i++) {
        var webPart = webParts[i];
        if (vertical) {
            if (y < webPart.middleY) {
                return i;
            }
        }
        else {
            if (x < webPart.middleX) {
                return i;
            }
        }
    }
    return webPartsCount;
}
function Zone_UpdatePosition() {
    var topLeft = __wpTranslateOffset(0, 0, this.webPartTable, null, false);
    this.webPartTableLeft = topLeft.x;
    this.webPartTableTop = topLeft.y;
    this.webPartTableRight = (this.webPartTable != null) ? topLeft.x + this.webPartTable.offsetWidth : topLeft.x;
    this.webPartTableBottom = (this.webPartTable != null) ? topLeft.y + this.webPartTable.offsetHeight : topLeft.y;
    for (var i = 0; i < this.webParts.length; i++) {
        this.webParts[i].UpdatePosition();
    }
}
function WebPartDragState(webPartElement, effect) {
    this.webPartElement = webPartElement;
    this.dropZoneElement = null;
    this.dropIndex = -1;
    this.effect = effect;
    this.dropped = false;
}
function WebPartMenu(menuLabelElement, menuDropDownElement, menuElement) {
    this.menuLabelElement = menuLabelElement;
    this.menuDropDownElement = menuDropDownElement;
    this.menuElement = menuElement;
    this.menuLabelElement.__menu = this;
    this.menuLabelElement.attachEvent('onclick', WebPartMenu_OnClick);
    this.menuLabelElement.attachEvent('onkeypress', WebPartMenu_OnKeyPress);
    this.menuLabelElement.attachEvent('onmouseenter', WebPartMenu_OnMouseEnter);
    this.menuLabelElement.attachEvent('onmouseleave', WebPartMenu_OnMouseLeave);
    if ((typeof(this.menuDropDownElement) != "undefined") && (this.menuDropDownElement != null)) {
        this.menuDropDownElement.__menu = this;
    }
    this.menuItemStyle = "";
    this.menuItemHoverStyle = "";
    this.popup = null;
    this.hoverClassName = "";
    this.hoverColor = "";
    this.oldColor = this.menuLabelElement.style.color;
    this.oldTextDecoration = this.menuLabelElement.style.textDecoration;
    this.oldClassName = this.menuLabelElement.className;
    this.Show = WebPartMenu_Show;
    this.Hide = WebPartMenu_Hide;
    this.Hover = WebPartMenu_Hover;
    this.Unhover = WebPartMenu_Unhover;
    this.Dispose = WebPartMenu_Dispose;
    var menu = this;
    this.disposeDelegate = function() { menu.Dispose(); };
    window.attachEvent('onunload', this.disposeDelegate);
}
function WebPartMenu_Dispose() {
    this.menuLabelElement.__menu = null;
    this.menuDropDownElement.__menu = null;
    window.detachEvent('onunload', this.disposeDelegate);
}
function WebPartMenu_Show() {
    if ((typeof(__wpm.menu) != "undefined") && (__wpm.menu != null)) {
        __wpm.menu.Hide();
    }
    var menuHTML =
        "<html><head><style>" +
        "a.menuItem, a.menuItem:Link { display: block; padding: 1px; text-decoration: none; " + this.itemStyle + " }" +
        "a.menuItem:Hover { " + this.itemHoverStyle + " }" +
        "</style><body scroll=\"no\" style=\"border: none; margin: 0; padding: 0;\" ondragstart=\"window.event.returnValue=false;\" onclick=\"popup.hide()\">" +
        this.menuElement.innerHTML +
        "</body></html>";
    var width = 16;
    var height = 16;
    this.popup = window.createPopup();
    __wpm.menu = this;
    var popupDocument = this.popup.document;
    popupDocument.write(menuHTML);
    this.popup.show(0, 0, width, height);
    var popupBody = popupDocument.body;
    width = popupBody.scrollWidth;
    height = popupBody.scrollHeight;
    if (width < this.menuLabelElement.offsetWidth) {
        width = this.menuLabelElement.offsetWidth + 16;
    }
    if (this.menuElement.innerHTML.indexOf("progid:DXImageTransform.Microsoft.Shadow") != -1) {
        popupBody.style.paddingRight = "4px";
    }
    popupBody.__wpm = __wpm;
    popupBody.__wpmDeleteWarning = __wpmDeleteWarning;
    popupBody.__wpmCloseProviderWarning = __wpmCloseProviderWarning;
    popupBody.popup = this.popup;
    this.popup.hide();
    this.popup.show(0, this.menuLabelElement.offsetHeight, width, height, this.menuLabelElement);
}
function WebPartMenu_Hide() {
    if (__wpm.menu == this) {
        __wpm.menu = null;
        if ((typeof(this.popup) != "undefined") && (this.popup != null)) {
            this.popup.hide();
            this.popup = null;
        }
    }
}
function WebPartMenu_Hover() {
    if (this.labelHoverClassName != "") {
        this.menuLabelElement.className = this.menuLabelElement.className + " " + this.labelHoverClassName;
    }
    if (this.labelHoverColor != "") {
        this.menuLabelElement.style.color = this.labelHoverColor;
    }
}
function WebPartMenu_Unhover() {
    if (this.labelHoverClassName != "") {
        this.menuLabelElement.style.textDecoration = this.oldTextDecoration;
        this.menuLabelElement.className = this.oldClassName;
    }
    if (this.labelHoverColor != "") {
        this.menuLabelElement.style.color = this.oldColor;
    }
}
function WebPartMenu_OnClick() {
    var menu = window.event.srcElement.__menu;
    if ((typeof(menu) != "undefined") && (menu != null)) {
        window.event.returnValue = false;
        window.event.cancelBubble = true;
        menu.Show();
    }
}
function WebPartMenu_OnKeyPress() {
    if (window.event.keyCode == 13) {
        var menu = window.event.srcElement.__menu;
        if ((typeof(menu) != "undefined") && (menu != null)) {
            window.event.returnValue = false;
            window.event.cancelBubble = true;
            menu.Show();
        }
    }
}
function WebPartMenu_OnMouseEnter() {
    var menu = window.event.srcElement.__menu;
    if ((typeof(menu) != "undefined") && (menu != null)) {
        menu.Hover();
    }
}
function WebPartMenu_OnMouseLeave() {
    var menu = window.event.srcElement.__menu;
    if ((typeof(menu) != "undefined") && (menu != null)) {
        menu.Unhover();
    }
}
function WebPartManager() {
    this.overlayContainerElement = null;
    this.zones = new Array();
    this.dragState = null;
    this.menu = null;
    this.draggedWebPart = null;
    this.AddZone = WebPartManager_AddZone;
    this.IsDragDropEnabled = WebPartManager_IsDragDropEnabled;
    this.DragDrop = WebPartManager_DragDrop;
    this.InitiateWebPartDragDrop = WebPartManager_InitiateWebPartDragDrop;
    this.CompleteWebPartDragDrop = WebPartManager_CompleteWebPartDragDrop;
    this.ContinueWebPartDragDrop = WebPartManager_ContinueWebPartDragDrop;
    this.ProcessWebPartDragEnter = WebPartManager_ProcessWebPartDragEnter;
    this.ProcessWebPartDragOver = WebPartManager_ProcessWebPartDragOver;
    this.ProcessWebPartDrop = WebPartManager_ProcessWebPartDrop;
    this.ShowHelp = WebPartManager_ShowHelp;
    this.ExportWebPart = WebPartManager_ExportWebPart;
    this.Execute = WebPartManager_Execute;
    this.SubmitPage = WebPartManager_SubmitPage;
    this.UpdatePositions = WebPartManager_UpdatePositions;
    window.attachEvent("onunload", WebPartManager_Dispose);
}
function WebPartManager_Dispose() {
    for (var i = 0; i < __wpm.zones.length; i++) {
        __wpm.zones[i].Dispose();
    }
    window.detachEvent("onunload", WebPartManager_Dispose);
}
function WebPartManager_AddZone(zoneElement, uniqueID, isVertical, allowLayoutChange, highlightColor) {
    var zoneIndex = this.zones.length;
    var zone = new Zone(zoneElement, zoneIndex, uniqueID, isVertical, allowLayoutChange, highlightColor);
    this.zones[zoneIndex] = zone;
    return zone;
}
function WebPartManager_IsDragDropEnabled() {
    return ((typeof(this.overlayContainerElement) != "undefined") && (this.overlayContainerElement != null));
}
function WebPartManager_DragDrop() {
    if ((typeof(this.draggedWebPart) != "undefined") && (this.draggedWebPart != null)) {
        var tempWebPart = this.draggedWebPart;
        this.draggedWebPart = null;
        tempWebPart.dragDrop();
        window.setTimeout("__wpClearSelection()", 0);
    }
}
function WebPartManager_InitiateWebPartDragDrop(webPartElement) {
    var webPart = webPartElement.__webPart;
    this.UpdatePositions();
    this.dragState = new WebPartDragState(webPartElement, "move");
    var location = __wpGetPageEventLocation(window.event, true);
    var overlayContainerElement = this.overlayContainerElement;
    overlayContainerElement.style.left = location.x - webPartElement.offsetWidth / 2;
    overlayContainerElement.style.top = location.y + 4 + (webPartElement.clientTop ? webPartElement.clientTop : 0);
    overlayContainerElement.style.display = "block";
    overlayContainerElement.style.width = webPartElement.offsetWidth;
    overlayContainerElement.style.height = webPartElement.offsetHeight;
    overlayContainerElement.appendChild(webPartElement.cloneNode(true));
    if (webPart.allowZoneChange == false) {
        webPart.zone.allowDrop = true;
    }
    else {
        for (var i = 0; i < __wpm.zones.length; i++) {
            var zone = __wpm.zones[i];
            if (zone.allowLayoutChange) {
                zone.allowDrop = true;
            }
        }
    }
    document.body.attachEvent("ondragover", Zone_OnDragOver);
    return "move";
}
function WebPartManager_CompleteWebPartDragDrop() {
    var dragState = this.dragState;
    this.dragState = null;
    if ((typeof(dragState.dropZoneElement) != "undefined") && (dragState.dropZoneElement != null)) {
        dragState.dropZoneElement.__zone.ToggleDropCues(false, dragState.dropIndex, false);
    }
    document.body.detachEvent("ondragover", Zone_OnDragOver);
    for (var i = 0; i < __wpm.zones.length; i++) {
        __wpm.zones[i].allowDrop = false;
    }
    this.overlayContainerElement.removeChild(this.overlayContainerElement.firstChild);
    this.overlayContainerElement.style.display = "none";
    if ((typeof(dragState) != "undefined") && (dragState != null) && (dragState.dropped == true)) {
        var currentZone = dragState.webPartElement.__webPart.zone;
        var currentZoneIndex = dragState.webPartElement.__webPart.zoneIndex;
        if ((currentZone != dragState.dropZoneElement.__zone) ||
            ((currentZoneIndex != dragState.dropIndex) &&
             (currentZoneIndex != (dragState.dropIndex - 1)))) {
            var eventTarget = dragState.dropZoneElement.__zone.uniqueID;
            var eventArgument = "Drag:" + dragState.webPartElement.id + ":" + dragState.dropIndex;
            this.SubmitPage(eventTarget, eventArgument);
        }
    }
}
function WebPartManager_ContinueWebPartDragDrop() {
    var dragState = this.dragState;
    if ((typeof(dragState) != "undefined") && (dragState != null)) {
        var style = this.overlayContainerElement.style;
        var location = __wpGetPageEventLocation(window.event, true);
        style.left = location.x - dragState.webPartElement.offsetWidth / 2;
        style.top = location.y + 4 + (dragState.webPartElement.clientTop ? dragState.webPartElement.clientTop : 0);
    }
}
function WebPartManager_Execute(script) {
    if (this.menu) {
        this.menu.Hide();
    }
    var scriptReference = new Function(script);
    return (scriptReference() != false);
}
function WebPartManager_ProcessWebPartDragEnter() {
    var dragState = __wpm.dragState;
    if ((typeof(dragState) != "undefined") && (dragState != null)) {
        var currentEvent = window.event;
        var newDropZoneElement = Zone_GetParentZoneElement(currentEvent.srcElement);
        if ((typeof(newDropZoneElement.__zone) == "undefined") || (newDropZoneElement.__zone == null) ||
            (newDropZoneElement.__zone.allowDrop == false)) {
            newDropZoneElement = null;
        }
        var newDropIndex = -1;
        if ((typeof(newDropZoneElement) != "undefined") && (newDropZoneElement != null)) {
            newDropIndex = newDropZoneElement.__zone.GetWebPartIndex(__wpGetPageEventLocation(currentEvent, false));
            if (newDropIndex == -1) {
                newDropZoneElement = null;
            }
        }
        if (dragState.dropZoneElement != newDropZoneElement) {
            if ((typeof(dragState.dropZoneElement) != "undefined") && (dragState.dropZoneElement != null)) {
                dragState.dropZoneElement.__zone.ToggleDropCues(false, dragState.dropIndex, false);
            }
            dragState.dropZoneElement = newDropZoneElement;
            dragState.dropIndex = newDropIndex;
            if ((typeof(newDropZoneElement) != "undefined") && (newDropZoneElement != null)) {
                newDropZoneElement.__zone.ToggleDropCues(true, newDropIndex, false);
            }
        }
        else if (dragState.dropIndex != newDropIndex) {
            if (dragState.dropIndex != -1) {
                dragState.dropZoneElement.__zone.ToggleDropCues(false, dragState.dropIndex, false);
            }
            dragState.dropIndex = newDropIndex;
            if ((typeof(newDropZoneElement) != "undefined") && (newDropZoneElement != null)) {
                newDropZoneElement.__zone.ToggleDropCues(true, newDropIndex, false);
            }
        }
        if ((typeof(dragState.dropZoneElement) != "undefined") && (dragState.dropZoneElement != null)) {
            currentEvent.dataTransfer.effectAllowed = dragState.effect;
        }
        return true;
    }
    return false;
}
function WebPartManager_ProcessWebPartDragOver() {
    var dragState = __wpm.dragState;
    var currentEvent = window.event;
    var handled = false;
    if ((typeof(dragState) != "undefined") && (dragState != null) &&
        (typeof(dragState.dropZoneElement) != "undefined") && (dragState.dropZoneElement != null)) {
        var dropZoneElement = Zone_GetParentZoneElement(currentEvent.srcElement);
        if ((typeof(dropZoneElement) != "undefined") && (dropZoneElement != null) && (dropZoneElement.__zone.allowDrop == false)) {
            dropZoneElement = null;
        }
        if (((typeof(dropZoneElement) == "undefined") || (dropZoneElement == null)) &&
            (typeof(dragState.dropZoneElement) != "undefined") && (dragState.dropZoneElement != null)) {
            dragState.dropZoneElement.__zone.ToggleDropCues(false, __wpm.dragState.dropIndex, false);
            dragState.dropZoneElement = null;
            dragState.dropIndex = -1;
        }
        else if ((typeof(dropZoneElement) != "undefined") && (dropZoneElement != null)) {
            var location = __wpGetPageEventLocation(currentEvent, false);
            var newDropIndex = dropZoneElement.__zone.GetWebPartIndex(location);
            if (newDropIndex == -1) {
                dropZoneElement = null;
            }
            if (dragState.dropZoneElement != dropZoneElement) {
                if ((dragState.dropIndex != -1) || (typeof(dropZoneElement) == "undefined") || (dropZoneElement == null)) {
                    dragState.dropZoneElement.__zone.ToggleDropCues(false, __wpm.dragState.dropIndex, false);
                }
                dragState.dropZoneElement = dropZoneElement;
            }
            else {
                dragState.dropZoneElement.__zone.ToggleDropCues(false, dragState.dropIndex, true);
            }
            dragState.dropIndex = newDropIndex;
            if ((typeof(dropZoneElement) != "undefined") && (dropZoneElement != null)) {
                dropZoneElement.__zone.ToggleDropCues(true, newDropIndex, false);
            }
        }
        handled = true;
    }
    if ((typeof(dragState) == "undefined") || (dragState == null) ||
        (typeof(dragState.dropZoneElement) == "undefined") || (dragState.dropZoneElement == null)) {
        currentEvent.dataTransfer.effectAllowed = "none";
    }
    return handled;
}
function WebPartManager_ProcessWebPartDrop() {
    var dragState = this.dragState;
    if ((typeof(dragState) != "undefined") && (dragState != null)) {
        var currentEvent = window.event;
        var dropZoneElement = Zone_GetParentZoneElement(currentEvent.srcElement);
        if ((typeof(dropZoneElement) != "undefined") && (dropZoneElement != null) && (dropZoneElement.__zone.allowDrop == false)) {
            dropZoneElement = null;
        }
        if ((typeof(dropZoneElement) != "undefined") && (dropZoneElement != null) && (dragState.dropZoneElement == dropZoneElement)) {
            dragState.dropped = true;
        }
        return true;
    }
    return false;
}
function WebPartManager_ShowHelp(helpUrl, helpMode) {
    if ((typeof(this.menu) != "undefined") && (this.menu != null)) {
        this.menu.Hide();
    }
    if (helpMode == 0 || helpMode == 1) {
        if (helpMode == 0) {
            var dialogInfo = "edge: Sunken; center: yes; help: no; resizable: yes; status: no";
            window.showModalDialog(helpUrl, null, dialogInfo);
        }
        else {
            window.open(helpUrl, null, "scrollbars=yes,resizable=yes,status=no,toolbar=no,menubar=no,location=no");
        }
    }
    else if (helpMode == 2) {
        window.location = helpUrl;
    }
}
function WebPartManager_ExportWebPart(exportUrl, warn, confirmOnly) {
    if (warn == true && __wpmExportWarning.length > 0 && this.personalizationScopeShared != true) {
        if (confirm(__wpmExportWarning) == false) {
            return false;
        }
    }
    if (confirmOnly == false) {
        window.location = exportUrl;
    }
    return true;
}
function WebPartManager_UpdatePositions() {
    for (var i = 0; i < this.zones.length; i++) {
        this.zones[i].UpdatePosition();
    }
}
function WebPartManager_SubmitPage(eventTarget, eventArgument) {
    if ((typeof(this.menu) != "undefined") && (this.menu != null)) {
        this.menu.Hide();
    }
    __doPostBack(eventTarget, eventArgument);
}

// SIG // Begin signature block
// SIG // MIIaqQYJKoZIhvcNAQcCoIIamjCCGpYCAQExCzAJBgUr
// SIG // DgMCGgUAMGcGCisGAQQBgjcCAQSgWTBXMDIGCisGAQQB
// SIG // gjcCAR4wJAIBAQQQEODJBs441BGiowAQS9NQkAIBAAIB
// SIG // AAIBAAIBAAIBADAhMAkGBSsOAwIaBQAEFF209mJ8Cm/d
// SIG // KplZn396dHEtcI3DoIIVeTCCBLowggOioAMCAQICCmEC
// SIG // kkoAAAAAACAwDQYJKoZIhvcNAQEFBQAwdzELMAkGA1UE
// SIG // BhMCVVMxEzARBgNVBAgTCldhc2hpbmd0b24xEDAOBgNV
// SIG // BAcTB1JlZG1vbmQxHjAcBgNVBAoTFU1pY3Jvc29mdCBD
// SIG // b3Jwb3JhdGlvbjEhMB8GA1UEAxMYTWljcm9zb2Z0IFRp
// SIG // bWUtU3RhbXAgUENBMB4XDTEyMDEwOTIyMjU1OVoXDTEz
// SIG // MDQwOTIyMjU1OVowgbMxCzAJBgNVBAYTAlVTMRMwEQYD
// SIG // VQQIEwpXYXNoaW5ndG9uMRAwDgYDVQQHEwdSZWRtb25k
// SIG // MR4wHAYDVQQKExVNaWNyb3NvZnQgQ29ycG9yYXRpb24x
// SIG // DTALBgNVBAsTBE1PUFIxJzAlBgNVBAsTHm5DaXBoZXIg
// SIG // RFNFIEVTTjpCOEVDLTMwQTQtNzE0NDElMCMGA1UEAxMc
// SIG // TWljcm9zb2Z0IFRpbWUtU3RhbXAgU2VydmljZTCCASIw
// SIG // DQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAM1jw/ei
// SIG // tUfZ+TmUU6xrj6Z5OCH00W49FTgWwXMsmY/74Dxb4aJM
// SIG // i7Kri7TySse5k1DRJvWHU7B6dfNHDxcrZyxk62DnSozg
// SIG // i17EVmk3OioEXRcByL+pt9PJq6ORqIHjPy232OTEeAB5
// SIG // Oc/9x2TiIxJ4ngx2J0mPmqwOdOMGVVVJyO2hfHBFYX6y
// SIG // cRYe4cFBudLSMulSJPM2UATX3W88SdUL1HZA/GVlE36V
// SIG // UTrV/7iap1drSxXlN1gf3AANxa7q34FH+fBSrubPWqzg
// SIG // FEqmcZSA+v2wIzBg6YNgrA4kHv8R8uelVWKV7p9/ninW
// SIG // zUsKdoPwQwTfBkkg8lNaRLBRejkCAwEAAaOCAQkwggEF
// SIG // MB0GA1UdDgQWBBTNGaxhTZRnK/avlHVZ2/BYAIOhOjAf
// SIG // BgNVHSMEGDAWgBQjNPjZUkZwCu1A+3b7syuwwzWzDzBU
// SIG // BgNVHR8ETTBLMEmgR6BFhkNodHRwOi8vY3JsLm1pY3Jv
// SIG // c29mdC5jb20vcGtpL2NybC9wcm9kdWN0cy9NaWNyb3Nv
// SIG // ZnRUaW1lU3RhbXBQQ0EuY3JsMFgGCCsGAQUFBwEBBEww
// SIG // SjBIBggrBgEFBQcwAoY8aHR0cDovL3d3dy5taWNyb3Nv
// SIG // ZnQuY29tL3BraS9jZXJ0cy9NaWNyb3NvZnRUaW1lU3Rh
// SIG // bXBQQ0EuY3J0MBMGA1UdJQQMMAoGCCsGAQUFBwMIMA0G
// SIG // CSqGSIb3DQEBBQUAA4IBAQBRHNbfNh3cgLwCp8aZ3xbI
// SIG // kAZpFZoyufNkENKK82IpG3mPymCps13E5BYtNYxEm/H0
// SIG // XGGkQa6ai7pQ0Wp5arNijJ1NUVALqY7Uv6IQwEfVTnVS
// SIG // iR4/lmqPLkAUBnLuP3BZkl2F7YOZ+oKEnuQDASETqyfW
// SIG // zHFJ5dod/288CU7VjWboDMl/7jEUAjdfe2nsiT5FfyVE
// SIG // 5x8a1sUaw0rk4fGEmOdP+amYpxhG7IRs7KkDCv18elId
// SIG // nGukqA+YkqSSeFwreON9ssfZtnB931tzU7+q1GZQS/DJ
// SIG // O5WF5cFKZZ0lWFC7IFSReTobB1xqVyivMcef58Md7kf9
// SIG // J9d/z3TcZcU/MIIE7DCCA9SgAwIBAgITMwAAALARrwqL
// SIG // 0Duf3QABAAAAsDANBgkqhkiG9w0BAQUFADB5MQswCQYD
// SIG // VQQGEwJVUzETMBEGA1UECBMKV2FzaGluZ3RvbjEQMA4G
// SIG // A1UEBxMHUmVkbW9uZDEeMBwGA1UEChMVTWljcm9zb2Z0
// SIG // IENvcnBvcmF0aW9uMSMwIQYDVQQDExpNaWNyb3NvZnQg
// SIG // Q29kZSBTaWduaW5nIFBDQTAeFw0xMzAxMjQyMjMzMzla
// SIG // Fw0xNDA0MjQyMjMzMzlaMIGDMQswCQYDVQQGEwJVUzET
// SIG // MBEGA1UECBMKV2FzaGluZ3RvbjEQMA4GA1UEBxMHUmVk
// SIG // bW9uZDEeMBwGA1UEChMVTWljcm9zb2Z0IENvcnBvcmF0
// SIG // aW9uMQ0wCwYDVQQLEwRNT1BSMR4wHAYDVQQDExVNaWNy
// SIG // b3NvZnQgQ29ycG9yYXRpb24wggEiMA0GCSqGSIb3DQEB
// SIG // AQUAA4IBDwAwggEKAoIBAQDor1yiIA34KHy8BXt/re7r
// SIG // dqwoUz8620B9s44z5lc/pVEVNFSlz7SLqT+oN+EtUO01
// SIG // Fk7vTXrbE3aIsCzwWVyp6+HXKXXkG4Unm/P4LZ5BNisL
// SIG // QPu+O7q5XHWTFlJLyjPFN7Dz636o9UEVXAhlHSE38Cy6
// SIG // IgsQsRCddyKFhHxPuRuQsPWj/ov0DJpOoPXJCiHiquMB
// SIG // Nkf9L4JqgQP1qTXclFed+0vUDoLbOI8S/uPWenSIZOFi
// SIG // xCUuKq6dGB8OHrbCryS0DlC83hyTXEmmebW22875cHso
// SIG // AYS4KinPv6kFBeHgD3FN/a1cI4Mp68fFSsjoJ4TTfsZD
// SIG // C5UABbFPZXHFAgMBAAGjggFgMIIBXDATBgNVHSUEDDAK
// SIG // BggrBgEFBQcDAzAdBgNVHQ4EFgQUWXGmWjNN2pgHgP+E
// SIG // Hr6H+XIyQfIwUQYDVR0RBEowSKRGMEQxDTALBgNVBAsT
// SIG // BE1PUFIxMzAxBgNVBAUTKjMxNTk1KzRmYWYwYjcxLWFk
// SIG // MzctNGFhMy1hNjcxLTc2YmMwNTIzNDRhZDAfBgNVHSME
// SIG // GDAWgBTLEejK0rQWWAHJNy4zFha5TJoKHzBWBgNVHR8E
// SIG // TzBNMEugSaBHhkVodHRwOi8vY3JsLm1pY3Jvc29mdC5j
// SIG // b20vcGtpL2NybC9wcm9kdWN0cy9NaWNDb2RTaWdQQ0Ff
// SIG // MDgtMzEtMjAxMC5jcmwwWgYIKwYBBQUHAQEETjBMMEoG
// SIG // CCsGAQUFBzAChj5odHRwOi8vd3d3Lm1pY3Jvc29mdC5j
// SIG // b20vcGtpL2NlcnRzL01pY0NvZFNpZ1BDQV8wOC0zMS0y
// SIG // MDEwLmNydDANBgkqhkiG9w0BAQUFAAOCAQEAMdduKhJX
// SIG // M4HVncbr+TrURE0Inu5e32pbt3nPApy8dmiekKGcC8N/
// SIG // oozxTbqVOfsN4OGb9F0kDxuNiBU6fNutzrPJbLo5LEV9
// SIG // JBFUJjANDf9H6gMH5eRmXSx7nR2pEPocsHTyT2lrnqkk
// SIG // hNrtlqDfc6TvahqsS2Ke8XzAFH9IzU2yRPnwPJNtQtjo
// SIG // fOYXoJtoaAko+QKX7xEDumdSrcHps3Om0mPNSuI+5PNO
// SIG // /f+h4LsCEztdIN5VP6OukEAxOHUoXgSpRm3m9Xp5QL0f
// SIG // zehF1a7iXT71dcfmZmNgzNWahIeNJDD37zTQYx2xQmdK
// SIG // Dku/Og7vtpU6pzjkJZIIpohmgjCCBbwwggOkoAMCAQIC
// SIG // CmEzJhoAAAAAADEwDQYJKoZIhvcNAQEFBQAwXzETMBEG
// SIG // CgmSJomT8ixkARkWA2NvbTEZMBcGCgmSJomT8ixkARkW
// SIG // CW1pY3Jvc29mdDEtMCsGA1UEAxMkTWljcm9zb2Z0IFJv
// SIG // b3QgQ2VydGlmaWNhdGUgQXV0aG9yaXR5MB4XDTEwMDgz
// SIG // MTIyMTkzMloXDTIwMDgzMTIyMjkzMloweTELMAkGA1UE
// SIG // BhMCVVMxEzARBgNVBAgTCldhc2hpbmd0b24xEDAOBgNV
// SIG // BAcTB1JlZG1vbmQxHjAcBgNVBAoTFU1pY3Jvc29mdCBD
// SIG // b3Jwb3JhdGlvbjEjMCEGA1UEAxMaTWljcm9zb2Z0IENv
// SIG // ZGUgU2lnbmluZyBQQ0EwggEiMA0GCSqGSIb3DQEBAQUA
// SIG // A4IBDwAwggEKAoIBAQCycllcGTBkvx2aYCAgQpl2U2w+
// SIG // G9ZvzMvx6mv+lxYQ4N86dIMaty+gMuz/3sJCTiPVcgDb
// SIG // NVcKicquIEn08GisTUuNpb15S3GbRwfa/SXfnXWIz6pz
// SIG // RH/XgdvzvfI2pMlcRdyvrT3gKGiXGqelcnNW8ReU5P01
// SIG // lHKg1nZfHndFg4U4FtBzWwW6Z1KNpbJpL9oZC/6SdCni
// SIG // di9U3RQwWfjSjWL9y8lfRjFQuScT5EAwz3IpECgixzdO
// SIG // PaAyPZDNoTgGhVxOVoIoKgUyt0vXT2Pn0i1i8UU956wI
// SIG // APZGoZ7RW4wmU+h6qkryRs83PDietHdcpReejcsRj1Y8
// SIG // wawJXwPTAgMBAAGjggFeMIIBWjAPBgNVHRMBAf8EBTAD
// SIG // AQH/MB0GA1UdDgQWBBTLEejK0rQWWAHJNy4zFha5TJoK
// SIG // HzALBgNVHQ8EBAMCAYYwEgYJKwYBBAGCNxUBBAUCAwEA
// SIG // ATAjBgkrBgEEAYI3FQIEFgQU/dExTtMmipXhmGA7qDFv
// SIG // pjy82C0wGQYJKwYBBAGCNxQCBAweCgBTAHUAYgBDAEEw
// SIG // HwYDVR0jBBgwFoAUDqyCYEBWJ5flJRP8KuEKU5VZ5KQw
// SIG // UAYDVR0fBEkwRzBFoEOgQYY/aHR0cDovL2NybC5taWNy
// SIG // b3NvZnQuY29tL3BraS9jcmwvcHJvZHVjdHMvbWljcm9z
// SIG // b2Z0cm9vdGNlcnQuY3JsMFQGCCsGAQUFBwEBBEgwRjBE
// SIG // BggrBgEFBQcwAoY4aHR0cDovL3d3dy5taWNyb3NvZnQu
// SIG // Y29tL3BraS9jZXJ0cy9NaWNyb3NvZnRSb290Q2VydC5j
// SIG // cnQwDQYJKoZIhvcNAQEFBQADggIBAFk5Pn8mRq/rb0Cx
// SIG // MrVq6w4vbqhJ9+tfde1MOy3XQ60L/svpLTGjI8x8UJiA
// SIG // IV2sPS9MuqKoVpzjcLu4tPh5tUly9z7qQX/K4QwXacul
// SIG // nCAt+gtQxFbNLeNK0rxw56gNogOlVuC4iktX8pVCnPHz
// SIG // 7+7jhh80PLhWmvBTI4UqpIIck+KUBx3y4k74jKHK6BOl
// SIG // kU7IG9KPcpUqcW2bGvgc8FPWZ8wi/1wdzaKMvSeyeWNW
// SIG // RKJRzfnpo1hW3ZsCRUQvX/TartSCMm78pJUT5Otp56mi
// SIG // LL7IKxAOZY6Z2/Wi+hImCWU4lPF6H0q70eFW6NB4lhhc
// SIG // yTUWX92THUmOLb6tNEQc7hAVGgBd3TVbIc6YxwnuhQ6M
// SIG // T20OE049fClInHLR82zKwexwo1eSV32UjaAbSANa98+j
// SIG // Zwp0pTbtLS8XyOZyNxL0b7E8Z4L5UrKNMxZlHg6K3RDe
// SIG // ZPRvzkbU0xfpecQEtNP7LN8fip6sCvsTJ0Ct5PnhqX9G
// SIG // uwdgR2VgQE6wQuxO7bN2edgKNAltHIAxH+IOVN3lofvl
// SIG // RxCtZJj/UBYufL8FIXrilUEnacOTj5XJjdibIa4NXJzw
// SIG // oq6GaIMMai27dmsAHZat8hZ79haDJLmIz2qoRzEvmtzj
// SIG // cT3XAH5iR9HOiMm4GPoOco3Boz2vAkBq/2mbluIQqBC0
// SIG // N1AI1sM9MIIGBzCCA++gAwIBAgIKYRZoNAAAAAAAHDAN
// SIG // BgkqhkiG9w0BAQUFADBfMRMwEQYKCZImiZPyLGQBGRYD
// SIG // Y29tMRkwFwYKCZImiZPyLGQBGRYJbWljcm9zb2Z0MS0w
// SIG // KwYDVQQDEyRNaWNyb3NvZnQgUm9vdCBDZXJ0aWZpY2F0
// SIG // ZSBBdXRob3JpdHkwHhcNMDcwNDAzMTI1MzA5WhcNMjEw
// SIG // NDAzMTMwMzA5WjB3MQswCQYDVQQGEwJVUzETMBEGA1UE
// SIG // CBMKV2FzaGluZ3RvbjEQMA4GA1UEBxMHUmVkbW9uZDEe
// SIG // MBwGA1UEChMVTWljcm9zb2Z0IENvcnBvcmF0aW9uMSEw
// SIG // HwYDVQQDExhNaWNyb3NvZnQgVGltZS1TdGFtcCBQQ0Ew
// SIG // ggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCf
// SIG // oWyx39tIkip8ay4Z4b3i48WZUSNQrc7dGE4kD+7Rp9FM
// SIG // rXQwIBHrB9VUlRVJlBtCkq6YXDAm2gBr6Hu97IkHD/cO
// SIG // BJjwicwfyzMkh53y9GccLPx754gd6udOo6HBI1PKjfpF
// SIG // zwnQXq/QsEIEovmmbJNn1yjcRlOwhtDlKEYuJ6yGT1VS
// SIG // DOQDLPtqkJAwbofzWTCd+n7Wl7PoIZd++NIT8wi3U21S
// SIG // tEWQn0gASkdmEScpZqiX5NMGgUqi+YSnEUcUCYKfhO1V
// SIG // eP4Bmh1QCIUAEDBG7bfeI0a7xC1Un68eeEExd8yb3zuD
// SIG // k6FhArUdDbH895uyAc4iS1T/+QXDwiALAgMBAAGjggGr
// SIG // MIIBpzAPBgNVHRMBAf8EBTADAQH/MB0GA1UdDgQWBBQj
// SIG // NPjZUkZwCu1A+3b7syuwwzWzDzALBgNVHQ8EBAMCAYYw
// SIG // EAYJKwYBBAGCNxUBBAMCAQAwgZgGA1UdIwSBkDCBjYAU
// SIG // DqyCYEBWJ5flJRP8KuEKU5VZ5KShY6RhMF8xEzARBgoJ
// SIG // kiaJk/IsZAEZFgNjb20xGTAXBgoJkiaJk/IsZAEZFglt
// SIG // aWNyb3NvZnQxLTArBgNVBAMTJE1pY3Jvc29mdCBSb290
// SIG // IENlcnRpZmljYXRlIEF1dGhvcml0eYIQea0WoUqgpa1M
// SIG // c1j0BxMuZTBQBgNVHR8ESTBHMEWgQ6BBhj9odHRwOi8v
// SIG // Y3JsLm1pY3Jvc29mdC5jb20vcGtpL2NybC9wcm9kdWN0
// SIG // cy9taWNyb3NvZnRyb290Y2VydC5jcmwwVAYIKwYBBQUH
// SIG // AQEESDBGMEQGCCsGAQUFBzAChjhodHRwOi8vd3d3Lm1p
// SIG // Y3Jvc29mdC5jb20vcGtpL2NlcnRzL01pY3Jvc29mdFJv
// SIG // b3RDZXJ0LmNydDATBgNVHSUEDDAKBggrBgEFBQcDCDAN
// SIG // BgkqhkiG9w0BAQUFAAOCAgEAEJeKw1wDRDbd6bStd9vO
// SIG // eVFNAbEudHFbbQwTq86+e4+4LtQSooxtYrhXAstOIBNQ
// SIG // md16QOJXu69YmhzhHQGGrLt48ovQ7DsB7uK+jwoFyI1I
// SIG // 4vBTFd1Pq5Lk541q1YDB5pTyBi+FA+mRKiQicPv2/OR4
// SIG // mS4N9wficLwYTp2OawpylbihOZxnLcVRDupiXD8WmIsg
// SIG // P+IHGjL5zDFKdjE9K3ILyOpwPf+FChPfwgphjvDXuBfr
// SIG // Tot/xTUrXqO/67x9C0J71FNyIe4wyrt4ZVxbARcKFA7S
// SIG // 2hSY9Ty5ZlizLS/n+YWGzFFW6J1wlGysOUzU9nm/qhh6
// SIG // YinvopspNAZ3GmLJPR5tH4LwC8csu89Ds+X57H2146So
// SIG // dDW4TsVxIxImdgs8UoxxWkZDFLyzs7BNZ8ifQv+AeSGA
// SIG // nhUwZuhCEl4ayJ4iIdBD6Svpu/RIzCzU2DKATCYqSCRf
// SIG // WupW76bemZ3KOm+9gSd0BhHudiG/m4LBJ1S2sWo9iaF2
// SIG // YbRuoROmv6pH8BJv/YoybLL+31HIjCPJZr2dHYcSZAI9
// SIG // La9Zj7jkIeW1sMpjtHhUBdRBLlCslLCleKuzoJZ1GtmS
// SIG // hxN1Ii8yqAhuoFuMJb+g74TKIdbrHk/Jmu5J4PcBZW+J
// SIG // C33Iacjmbuqnl84xKf8OxVtc2E0bodj6L54/LlUWa8kT
// SIG // o/0xggScMIIEmAIBATCBkDB5MQswCQYDVQQGEwJVUzET
// SIG // MBEGA1UECBMKV2FzaGluZ3RvbjEQMA4GA1UEBxMHUmVk
// SIG // bW9uZDEeMBwGA1UEChMVTWljcm9zb2Z0IENvcnBvcmF0
// SIG // aW9uMSMwIQYDVQQDExpNaWNyb3NvZnQgQ29kZSBTaWdu
// SIG // aW5nIFBDQQITMwAAALARrwqL0Duf3QABAAAAsDAJBgUr
// SIG // DgMCGgUAoIG+MBkGCSqGSIb3DQEJAzEMBgorBgEEAYI3
// SIG // AgEEMBwGCisGAQQBgjcCAQsxDjAMBgorBgEEAYI3AgEV
// SIG // MCMGCSqGSIb3DQEJBDEWBBSVrHcGU5xDY9gI92AfH2EG
// SIG // Y5etGzBeBgorBgEEAYI3AgEMMVAwTqAmgCQATQBpAGMA
// SIG // cgBvAHMAbwBmAHQAIABMAGUAYQByAG4AaQBuAGehJIAi
// SIG // aHR0cDovL3d3dy5taWNyb3NvZnQuY29tL2xlYXJuaW5n
// SIG // IDANBgkqhkiG9w0BAQEFAASCAQCiakPrJ3mAoV7rJW6A
// SIG // L+ZhN06Zm2QC3I+c46/t525gFytzv6btUIGCIBI4PhBV
// SIG // YJErzZFkO0GJqYo3vL38mHdD10wsGQ/31EBuThLg4mBC
// SIG // KoXmCDAZQkB82s140/vaefV4kS3uQmfOn/Wn1aiZDq7P
// SIG // zvVLuszztiaqb9dYZ6i/+4kF7lp5HuP1C3jlKAFi5Un7
// SIG // S5PBySvwhRclBPPs/7xA5evOdND27uES46AK7fSxt4Q3
// SIG // QMuJfDVzsvAmnZuIC0oEObp15udWTA27MIAmV/a8TziU
// SIG // gGYEbfVm0h9XJca2CSdWTYuAs55GLdw6XiwtSHrdK8vj
// SIG // sbOoux1wig0nZ8XtoYICHzCCAhsGCSqGSIb3DQEJBjGC
// SIG // AgwwggIIAgEBMIGFMHcxCzAJBgNVBAYTAlVTMRMwEQYD
// SIG // VQQIEwpXYXNoaW5ndG9uMRAwDgYDVQQHEwdSZWRtb25k
// SIG // MR4wHAYDVQQKExVNaWNyb3NvZnQgQ29ycG9yYXRpb24x
// SIG // ITAfBgNVBAMTGE1pY3Jvc29mdCBUaW1lLVN0YW1wIFBD
// SIG // QQIKYQKSSgAAAAAAIDAJBgUrDgMCGgUAoF0wGAYJKoZI
// SIG // hvcNAQkDMQsGCSqGSIb3DQEHATAcBgkqhkiG9w0BCQUx
// SIG // DxcNMTMwMzI3MTkxMjUyWjAjBgkqhkiG9w0BCQQxFgQU
// SIG // Z1OydBqtb53n9YUBTwtHFTqo0GUwDQYJKoZIhvcNAQEF
// SIG // BQAEggEAf1hyXBNJ8SN9Oov1c32VTqUPcVpsKbPYD7vl
// SIG // 9hWiLizNhk+Bjp8W8xE+YkJa0mj7KcmP3QcYsSkTzLgW
// SIG // 0uS0hg0bhp9pb6+IfbLXx4877R/CSEWG5+Um3vpWptsr
// SIG // CcHg9R/IH4ZyWNY31uinvpVVpx5dsYm9wdmUI6Ee6VT4
// SIG // f85C/Fh8hIvjT+mNK2K4oUnKEjZNsKwsy2ykOtbEg6kC
// SIG // 1v/tkDclfRTJbE6Wy5tMzzeRPQhxvK9kTIiPx55BeOTd
// SIG // OM/yXhlNixo8xYqCQXvqQhcYEznfAUypYlKMwZMlR5d2
// SIG // t2k+5qpvOKYK5PKojwiwoJAHZtbCp/uY8pJ9r/QCcg==
// SIG // End signature block
