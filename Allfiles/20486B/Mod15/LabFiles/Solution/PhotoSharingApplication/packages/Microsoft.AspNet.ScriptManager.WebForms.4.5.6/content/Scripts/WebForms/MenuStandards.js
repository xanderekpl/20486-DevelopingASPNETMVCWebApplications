//CdnPath=http://ajax.aspnetcdn.com/ajax/4.5/6/MenuStandards.js
if (!window.Sys) { window.Sys = {}; }
if (!Sys.WebForms) { Sys.WebForms = {}; }
Sys.WebForms.Menu = function(options) {
    this.items = [];
    this.depth = options.depth || 1;
    this.parentMenuItem = options.parentMenuItem;
    this.element = Sys.WebForms.Menu._domHelper.getElement(options.element);
    if (this.element.tagName === 'DIV') {
        var containerElement = this.element;
        this.element = Sys.WebForms.Menu._domHelper.firstChild(containerElement);
        this.element.tabIndex = options.tabIndex || 0;
        options.element = containerElement;
        options.menu = this;
        this.container = new Sys.WebForms._MenuContainer(options);
        Sys.WebForms.Menu._domHelper.setFloat(this.element, this.container.rightToLeft ? "right" : "left");
    }
    else {
        this.container = options.container;
        this.keyMap = options.keyMap;
    }
    Sys.WebForms.Menu._elementObjectMapper.map(this.element, this);
    if (this.parentMenuItem && this.parentMenuItem.parentMenu) {
        this.parentMenu = this.parentMenuItem.parentMenu;
        this.rootMenu = this.parentMenu.rootMenu;
        if (!this.element.id) {
            this.element.id = (this.container.element.id || 'menu') + ':submenu:' + Sys.WebForms.Menu._elementObjectMapper._computedId;
        }
        if (this.depth > this.container.staticDisplayLevels) {
            this.displayMode = "dynamic";
            this.element.style.display = "none";
            this.element.style.position = "absolute";
            if (this.rootMenu && this.container.orientation === 'horizontal' && this.parentMenu.isStatic()) {
                this.element.style.top = "100%";
                if (this.container.rightToLeft) {
                    this.element.style.right = "0px";
                }
                else {
                    this.element.style.left = "0px";
                }
            }
            else {
                this.element.style.top = "0px";
                if (this.container.rightToLeft) {
                    this.element.style.right = "100%";
                }
                else {
                    this.element.style.left = "100%";
                }
            }
            if (this.container.rightToLeft) {
                this.keyMap = Sys.WebForms.Menu._keyboardMapping.verticalRtl;
            }
            else {
                this.keyMap = Sys.WebForms.Menu._keyboardMapping.vertical;
            }
        }
        else {
            this.displayMode = "static";
            this.element.style.display = "block";
            if (this.container.orientation === 'horizontal') {
                Sys.WebForms.Menu._domHelper.setFloat(this.element, this.container.rightToLeft ? "right" : "left");
            }
        }
    }
    Sys.WebForms.Menu._domHelper.appendCssClass(this.element, this.displayMode);
    var children = this.element.childNodes;
    var count = children.length;
    for (var i = 0; i < count; i++) {
        var node = children[i];
        if (node.nodeType !== 1) {   
            continue;
        }
        var topLevelMenuItem = null;
        if (this.parentMenuItem) {
            topLevelMenuItem = this.parentMenuItem.topLevelMenuItem;
        }
        var menuItem = new Sys.WebForms.MenuItem(this, node, topLevelMenuItem);
        var previousMenuItem = this.items[this.items.length - 1];
        if (previousMenuItem) {
            menuItem.previousSibling = previousMenuItem;
            previousMenuItem.nextSibling = menuItem;
        }
        this.items[this.items.length] = menuItem;
    }
};
Sys.WebForms.Menu.prototype = {
    blur: function() { if (this.container) this.container.blur(); },
    collapse: function() {
        this.each(function(menuItem) {
            menuItem.hover(false);
            menuItem.blur();
            var childMenu = menuItem.childMenu;
            if (childMenu) {
                childMenu.collapse();
            }
        });
        this.hide();
    },
    doDispose: function() { this.each(function(item) { item.doDispose(); }); },
    each: function(fn) {
        var count = this.items.length;
        for (var i = 0; i < count; i++) {
            fn(this.items[i]);
        }
    },
    firstChild: function() { return this.items[0]; },
    focus: function() { if (this.container) this.container.focus(); },
    get_displayed: function() { return this.element.style.display !== 'none'; },
    get_focused: function() {
        if (this.container) {
            return this.container.focused;
        }
        return false;
    },
    handleKeyPress: function(keyCode) {
        if (this.keyMap.contains(keyCode)) {
            if (this.container.focusedMenuItem) {
                this.container.focusedMenuItem.navigate(keyCode);
                return;
            }
            var firstChild = this.firstChild();
            if (firstChild) {
                this.container.navigateTo(firstChild);
            }
        }
    },
    hide: function() {
        if (!this.get_displayed()) {
            return;
        }
        this.each(function(item) {
            if (item.childMenu) {
                item.childMenu.hide();
            }
        });
        if (!this.isRoot()) {
            if (this.get_focused()) {
                this.container.navigateTo(this.parentMenuItem);
            }
            this.element.style.display = 'none';
        }
    },
    isRoot: function() { return this.rootMenu === this; },
    isStatic: function() { return this.displayMode === 'static'; },
    lastChild: function() { return this.items[this.items.length - 1]; },
    show: function() { this.element.style.display = 'block'; }
};
if (Sys.WebForms.Menu.registerClass) {
    Sys.WebForms.Menu.registerClass('Sys.WebForms.Menu');
}
Sys.WebForms.MenuItem = function(parentMenu, listElement, topLevelMenuItem) {
    this.keyMap = parentMenu.keyMap;
    this.parentMenu = parentMenu;
    this.container = parentMenu.container;
    this.element = listElement;
    this.topLevelMenuItem = topLevelMenuItem || this;
    this._anchor = Sys.WebForms.Menu._domHelper.firstChild(listElement);
    while (this._anchor && this._anchor.tagName !== 'A') {
        this._anchor = Sys.WebForms.Menu._domHelper.nextSibling(this._anchor);
    }
    if (this._anchor) {
        this._anchor.tabIndex = -1;
        var subMenu = this._anchor;
        while (subMenu && subMenu.tagName !== 'UL') {
            subMenu = Sys.WebForms.Menu._domHelper.nextSibling(subMenu);
        }
        if (subMenu) {
            this.childMenu = new Sys.WebForms.Menu({ element: subMenu, parentMenuItem: this, depth: parentMenu.depth + 1, container: this.container, keyMap: this.keyMap });
            if (!this.childMenu.isStatic()) {
                Sys.WebForms.Menu._domHelper.appendCssClass(this.element, 'has-popup');
                Sys.WebForms.Menu._domHelper.appendAttributeValue(this.element, 'aria-haspopup', this.childMenu.element.id);
            }
        }
    }
    Sys.WebForms.Menu._elementObjectMapper.map(listElement, this);
    Sys.WebForms.Menu._domHelper.appendAttributeValue(listElement, 'role', 'menuitem');
    Sys.WebForms.Menu._domHelper.appendCssClass(listElement, parentMenu.displayMode);
    if (this._anchor) {
        Sys.WebForms.Menu._domHelper.appendCssClass(this._anchor, parentMenu.displayMode);
    }
    this.element.style.position = "relative";
    if (this.parentMenu.depth == 1 && this.container.orientation == 'horizontal') {
        Sys.WebForms.Menu._domHelper.setFloat(this.element, this.container.rightToLeft ? "right" : "left");
    }
    if (!this.container.disabled) {
        Sys.WebForms.Menu._domHelper.addEvent(this.element, 'mouseover', Sys.WebForms.MenuItem._onmouseover);
        Sys.WebForms.Menu._domHelper.addEvent(this.element, 'mouseout', Sys.WebForms.MenuItem._onmouseout);
    }
};
Sys.WebForms.MenuItem.prototype = {
    applyUp: function(fn, condition) {
        condition = condition || function(menuItem) { return menuItem; };
        var menuItem = this;
        var lastMenuItem = null;
        while (condition(menuItem)) {
            fn(menuItem);
            lastMenuItem = menuItem;
            menuItem = menuItem.parentMenu.parentMenuItem;
        }
        return lastMenuItem;
    },
    blur: function() { this.setTabIndex(-1); },
    doDispose: function() {
        Sys.WebForms.Menu._domHelper.removeEvent(this.element, 'mouseover', Sys.WebForms.MenuItem._onmouseover);
        Sys.WebForms.Menu._domHelper.removeEvent(this.element, 'mouseout', Sys.WebForms.MenuItem._onmouseout);
        if (this.childMenu) {
            this.childMenu.doDispose();
        }
    },
    focus: function() {
        if (!this.parentMenu.get_displayed()) {
            this.parentMenu.show();
        }
        this.setTabIndex(0);
        this.container.focused = true;
        this._anchor.focus();
    },
    get_highlighted: function() { return /(^|\s)highlighted(\s|$)/.test(this._anchor.className); },
    getTabIndex: function() { return this._anchor.tabIndex; },
    highlight: function(highlighting) {
        if (highlighting) {
            this.applyUp(function(menuItem) {
                menuItem.parentMenu.parentMenuItem.highlight(true);
            },
            function(menuItem) {
                return !menuItem.parentMenu.isStatic() && menuItem.parentMenu.parentMenuItem;
            }
        );
            Sys.WebForms.Menu._domHelper.appendCssClass(this._anchor, 'highlighted');
        }
        else {
            Sys.WebForms.Menu._domHelper.removeCssClass(this._anchor, 'highlighted');
            this.setTabIndex(-1);
        }
    },
    hover: function(hovering) {
        if (hovering) {
            var currentHoveredItem = this.container.hoveredMenuItem;
            if (currentHoveredItem) {
                currentHoveredItem.hover(false);
            }
            var currentFocusedItem = this.container.focusedMenuItem;
            if (currentFocusedItem && currentFocusedItem !== this) {
                currentFocusedItem.hover(false);
            }
            this.applyUp(function(menuItem) {
                if (menuItem.childMenu && !menuItem.childMenu.get_displayed()) {
                    menuItem.childMenu.show();
                }
            });
            this.container.hoveredMenuItem = this;
            this.highlight(true);
        }
        else {
            var menuItem = this;
            while (menuItem) {
                menuItem.highlight(false);
                if (menuItem.childMenu) {
                    if (!menuItem.childMenu.isStatic()) {
                        menuItem.childMenu.hide();
                    }
                }
                menuItem = menuItem.parentMenu.parentMenuItem;
            }
        }
    },
    isSiblingOf: function(menuItem) { return menuItem.parentMenu === this.parentMenu; },
    mouseout: function() {
        var menuItem = this,
            id = this.container.pendingMouseoutId,
            disappearAfter = this.container.disappearAfter;
        if (id) {
            window.clearTimeout(id);
        }
        if (disappearAfter > -1) {
            this.container.pendingMouseoutId =
                window.setTimeout(function() { menuItem.hover(false); }, disappearAfter);
        }
    },
    mouseover: function() {
        var id = this.container.pendingMouseoutId;
        if (id) {
            window.clearTimeout(id);
            this.container.pendingMouseoutId = null;
        }
        this.hover(true);
        if (this.container.menu.get_focused()) {
            this.container.navigateTo(this);
        }
    },
    navigate: function(keyCode) {
        switch (this.keyMap[keyCode]) {
            case this.keyMap.next:
                this.navigateNext();
                break;
            case this.keyMap.previous:
                this.navigatePrevious();
                break;
            case this.keyMap.child:
                this.navigateChild();
                break;
            case this.keyMap.parent:
                this.navigateParent();
                break;
            case this.keyMap.tab:
                this.navigateOut();
                break;
        }
    },
    navigateChild: function() {
        var subMenu = this.childMenu;
        if (subMenu) {
            var firstChild = subMenu.firstChild();
            if (firstChild) {
                this.container.navigateTo(firstChild);
            }
        }
        else {
            if (this.container.orientation === 'horizontal') {
                var nextItem = this.topLevelMenuItem.nextSibling || this.topLevelMenuItem.parentMenu.firstChild();
                if (nextItem == this.topLevelMenuItem) {
                    return;
                }
                this.topLevelMenuItem.childMenu.hide();
                this.container.navigateTo(nextItem);
                if (nextItem.childMenu) {
                    this.container.navigateTo(nextItem.childMenu.firstChild());
                }
            }
        }
    },
    navigateNext: function() {
        if (this.childMenu) {
            this.childMenu.hide();
        }
        var nextMenuItem = this.nextSibling;
        if (!nextMenuItem && this.parentMenu.isRoot()) {
            nextMenuItem = this.parentMenu.parentMenuItem;
            if (nextMenuItem) {
                nextMenuItem = nextMenuItem.nextSibling;
            }
        }
        if (!nextMenuItem) {
            nextMenuItem = this.parentMenu.firstChild();
        }
        if (nextMenuItem) {
            this.container.navigateTo(nextMenuItem);
        }
    },
    navigateOut: function() {
        this.parentMenu.blur();
    },
    navigateParent: function() {
        var parentMenu = this.parentMenu,
            horizontal = this.container.orientation === 'horizontal';
        if (!parentMenu) return;
        if (horizontal && this.childMenu && parentMenu.isRoot()) {
            this.navigateChild();
            return;
        }
        if (parentMenu.parentMenuItem && !parentMenu.isRoot()) {
            if (horizontal && this.parentMenu.depth === 2) {
                var previousItem = this.parentMenu.parentMenuItem.previousSibling;
                if (!previousItem) {
                    previousItem = this.parentMenu.rootMenu.lastChild();
                }
                this.topLevelMenuItem.childMenu.hide();
                this.container.navigateTo(previousItem);
                if (previousItem.childMenu) {
                    this.container.navigateTo(previousItem.childMenu.firstChild());
                }
            }
            else {
                this.parentMenu.hide();
            }
        }
    },
    navigatePrevious: function() {
        if (this.childMenu) {
            this.childMenu.hide();
        }
        var previousMenuItem = this.previousSibling;
        if (previousMenuItem) {
            var childMenu = previousMenuItem.childMenu;
            if (childMenu && childMenu.isRoot()) {
                previousMenuItem = childMenu.lastChild();
            }
        }
        if (!previousMenuItem && this.parentMenu.isRoot()) {
            previousMenuItem = this.parentMenu.parentMenuItem;
        }
        if (!previousMenuItem) {
            previousMenuItem = this.parentMenu.lastChild();
        }
        if (previousMenuItem) {
            this.container.navigateTo(previousMenuItem);
        }
    },
    setTabIndex: function(index) { if (this._anchor) this._anchor.tabIndex = index; }
};
Sys.WebForms.MenuItem._onmouseout = function(e) {
    var menuItem = Sys.WebForms.Menu._elementObjectMapper.getMappedObject(this);
    if (!menuItem) {
        return;
    }
    menuItem.mouseout();
    Sys.WebForms.Menu._domHelper.cancelEvent(e);
};
Sys.WebForms.MenuItem._onmouseover = function(e) {
    var menuItem = Sys.WebForms.Menu._elementObjectMapper.getMappedObject(this);
    if (!menuItem) {
        return;
    }
    menuItem.mouseover();
    Sys.WebForms.Menu._domHelper.cancelEvent(e);
};
Sys.WebForms.Menu._domHelper = {
    addEvent: function(element, eventName, fn, useCapture) {
        if (element.addEventListener) {
            element.addEventListener(eventName, fn, !!useCapture);
        }
        else {
            element['on' + eventName] = fn;
        }
    },
    appendAttributeValue: function(element, name, value) {
        this.updateAttributeValue('append', element, name, value);
    },
    appendCssClass: function(element, value) {
        this.updateClassName('append', element, name, value);
    },
    appendString: function(getString, setString, value) {
        var currentValue = getString();
        if (!currentValue) {
            setString(value);
            return;
        }
        var regex = this._regexes.getRegex('(^| )' + value + '($| )');
        if (regex.test(currentValue)) {
            return;
        }
        setString(currentValue + ' ' + value);
    },
    cancelEvent: function(e) {
        var event = e || window.event;
        if (event) {
            event.cancelBubble = true;
            if (event.stopPropagation) {
                event.stopPropagation();
            }
        }
    },
    contains: function(ancestor, descendant) {
        for (; descendant && (descendant !== ancestor); descendant = descendant.parentNode) { }
        return !!descendant;
    },
    firstChild: function(element) {
        var child = element.firstChild;
        if (child && child.nodeType !== 1) {   
            child = this.nextSibling(child);
        }
        return child;
    },
    getElement: function(elementOrId) { return typeof elementOrId === 'string' ? document.getElementById(elementOrId) : elementOrId; },
    getElementDirection: function(element) {
        if (element) {
            if (element.dir) {
                return element.dir;
            }
            return this.getElementDirection(element.parentNode);
        }
        return "ltr";
    },
    getKeyCode: function(event) { return event.keyCode || event.charCode || 0; },
    insertAfter: function(element, elementToInsert) {
        var next = element.nextSibling;
        if (next) {
            element.parentNode.insertBefore(elementToInsert, next);
        }
        else if (element.parentNode) {
            element.parentNode.appendChild(elementToInsert);
        }
    },
    nextSibling: function(element) {
        var sibling = element.nextSibling;
        while (sibling) {
            if (sibling.nodeType === 1) {   
                return sibling;
            }
            sibling = sibling.nextSibling;
        }
    },
    removeAttributeValue: function(element, name, value) {
        this.updateAttributeValue('remove', element, name, value);
    },
    removeCssClass: function(element, value) {
        this.updateClassName('remove', element, name, value);
    },
    removeEvent: function(element, eventName, fn, useCapture) {
        if (element.removeEventListener) {
            element.removeEventListener(eventName, fn, !!useCapture);
        }
        else if (element.detachEvent) {
            element.detachEvent('on' + eventName, fn)
        }
        element['on' + eventName] = null;
    },
    removeString: function(getString, setString, valueToRemove) {
        var currentValue = getString();
        if (currentValue) {
            var regex = this._regexes.getRegex('(\\s|\\b)' + valueToRemove + '$|\\b' + valueToRemove + '\\s+');
            setString(currentValue.replace(regex, ''));
        }
    },
    setFloat: function(element, direction) {
        element.style.styleFloat = direction;
        element.style.cssFloat = direction;
    },
    updateAttributeValue: function(operation, element, name, value) {
        this[operation + 'String'](
                function() {
                    return element.getAttribute(name);
                },
                function(newValue) {
                    element.setAttribute(name, newValue);
                },
                value
            );
    },
    updateClassName: function(operation, element, name, value) {
        this[operation + 'String'](
                function() {
                    return element.className;
                },
                function(newValue) {
                    element.className = newValue;
                },
                value
            );
    },
    _regexes: {
        getRegex: function(pattern) {
            var regex = this[pattern];
            if (!regex) {
                this[pattern] = regex = new RegExp(pattern);
            }
            return regex;
        }
    }
};
Sys.WebForms.Menu._elementObjectMapper = {
    _computedId: 0,
    _mappings: {},
    _mappingIdName: 'Sys.WebForms.Menu.Mapping',
    getMappedObject: function(element) {
        var id = element[this._mappingIdName];
        if (id) {
            return this._mappings[this._mappingIdName + ':' + id];
        }
    },
    map: function(element, theObject) {
        var mappedObject = element[this._mappingIdName];
        if (mappedObject === theObject) {
            return;
        }
        var objectId = element[this._mappingIdName] || element.id || '%' + (++this._computedId); 
        element[this._mappingIdName] = objectId;
        this._mappings[this._mappingIdName + ':' + objectId] = theObject;
        theObject.mappingId = objectId;
    }
};
Sys.WebForms.Menu._keyboardMapping = new (function() {
    var LEFT_ARROW = 37;
    var UP_ARROW = 38;
    var RIGHT_ARROW = 39;
    var DOWN_ARROW = 40;
    var TAB = 9;
    var ESCAPE = 27;
    this.vertical = { next: 0, previous: 1, child: 2, parent: 3, tab: 4 };
    this.vertical[DOWN_ARROW] = this.vertical.next;
    this.vertical[UP_ARROW] = this.vertical.previous;
    this.vertical[RIGHT_ARROW] = this.vertical.child;
    this.vertical[LEFT_ARROW] = this.vertical.parent;
    this.vertical[TAB] = this.vertical[ESCAPE] = this.vertical.tab;
    this.verticalRtl = { next: 0, previous: 1, child: 2, parent: 3, tab: 4 };
    this.verticalRtl[DOWN_ARROW] = this.verticalRtl.next;
    this.verticalRtl[UP_ARROW] = this.verticalRtl.previous;
    this.verticalRtl[LEFT_ARROW] = this.verticalRtl.child;
    this.verticalRtl[RIGHT_ARROW] = this.verticalRtl.parent;
    this.verticalRtl[TAB] = this.verticalRtl[ESCAPE] = this.verticalRtl.tab;
    this.horizontal = { next: 0, previous: 1, child: 2, parent: 3, tab: 4 };
    this.horizontal[RIGHT_ARROW] = this.horizontal.next;
    this.horizontal[LEFT_ARROW] = this.horizontal.previous;
    this.horizontal[DOWN_ARROW] = this.horizontal.child;
    this.horizontal[UP_ARROW] = this.horizontal.parent;
    this.horizontal[TAB] = this.horizontal[ESCAPE] = this.horizontal.tab;
    this.horizontalRtl = { next: 0, previous: 1, child: 2, parent: 3, tab: 4 };
    this.horizontalRtl[RIGHT_ARROW] = this.horizontalRtl.previous;
    this.horizontalRtl[LEFT_ARROW] = this.horizontalRtl.next;
    this.horizontalRtl[DOWN_ARROW] = this.horizontalRtl.child;
    this.horizontalRtl[UP_ARROW] = this.horizontalRtl.parent;
    this.horizontalRtl[TAB] = this.horizontalRtl[ESCAPE] = this.horizontalRtl.tab;
    this.horizontal.contains = this.horizontalRtl.contains = this.vertical.contains = this.verticalRtl.contains = function(keycode) {
        return this[keycode] != null;
    };
})();
Sys.WebForms._MenuContainer = function(options) {
    this.focused = false;
    this.disabled = options.disabled;
    this.staticDisplayLevels = options.staticDisplayLevels || 1;
    this.element = options.element;
    this.orientation = options.orientation || 'vertical';
    this.disappearAfter = options.disappearAfter;
    this.rightToLeft = Sys.WebForms.Menu._domHelper.getElementDirection(this.element) === 'rtl';
    Sys.WebForms.Menu._elementObjectMapper.map(this.element, this);
    this.menu = options.menu;
    this.menu.rootMenu = this.menu;
    this.menu.displayMode = 'static';
    this.menu.element.style.position = 'relative';
    this.menu.element.style.width = 'auto';
    if (this.orientation === 'vertical') {
        Sys.WebForms.Menu._domHelper.appendAttributeValue(this.menu.element, 'role', 'menu');
        if (this.rightToLeft) {
            this.menu.keyMap = Sys.WebForms.Menu._keyboardMapping.verticalRtl;
        }
        else {
            this.menu.keyMap = Sys.WebForms.Menu._keyboardMapping.vertical;
        }
    }
    else {
        Sys.WebForms.Menu._domHelper.appendAttributeValue(this.menu.element, 'role', 'menubar');
        if (this.rightToLeft) {
            this.menu.keyMap = Sys.WebForms.Menu._keyboardMapping.horizontalRtl;
        }
        else {
            this.menu.keyMap = Sys.WebForms.Menu._keyboardMapping.horizontal;
        }
    }
    var floatBreak = document.createElement('div');
    floatBreak.style.clear = this.rightToLeft ? "right" : "left";
    this.element.appendChild(floatBreak);
    Sys.WebForms.Menu._domHelper.setFloat(this.element, this.rightToLeft ? "right" : "left");
    Sys.WebForms.Menu._domHelper.insertAfter(this.element, floatBreak);
    if (!this.disabled) {
        Sys.WebForms.Menu._domHelper.addEvent(this.menu.element, 'focus', this._onfocus, true);
        Sys.WebForms.Menu._domHelper.addEvent(this.menu.element, 'keydown', this._onkeydown);
        var menuContainer = this;
        this.element.dispose = function() {
            if (menuContainer.element.dispose) {
                menuContainer.element.dispose = null;
                Sys.WebForms.Menu._domHelper.removeEvent(menuContainer.menu.element, 'focus', menuContainer._onfocus, true);
                Sys.WebForms.Menu._domHelper.removeEvent(menuContainer.menu.element, 'keydown', menuContainer._onkeydown);
                menuContainer.menu.doDispose();
            }
        };
        Sys.WebForms.Menu._domHelper.addEvent(window, 'unload', function() {
            if (menuContainer.element.dispose) {
                menuContainer.element.dispose();
            }
        });
    }
};
Sys.WebForms._MenuContainer.prototype = {
    blur: function() {
        this.focused = false;
        this.isBlurring = false;
        this.menu.collapse();
        this.focusedMenuItem = null;
    },
    focus: function(e) { this.focused = true; },
    navigateTo: function(menuItem) {
        if (this.focusedMenuItem && this.focusedMenuItem !== this) {
            this.focusedMenuItem.highlight(false);
        }
        menuItem.highlight(true);
        menuItem.focus();
        this.focusedMenuItem = menuItem;
    },
    _onfocus: function(e) {
        var event = e || window.event;
        if (event.srcElement && this) {
            if (Sys.WebForms.Menu._domHelper.contains(this.element, event.srcElement)) {
                if (!this.focused) {
                    this.focus();
                }
            }
        }
    },
    _onkeydown: function(e) {
        var thisMenu = Sys.WebForms.Menu._elementObjectMapper.getMappedObject(this);
        var keyCode = Sys.WebForms.Menu._domHelper.getKeyCode(e || window.event);
        if (thisMenu) {
            thisMenu.handleKeyPress(keyCode);
        }
    }
};

// SIG // Begin signature block
// SIG // MIIaqQYJKoZIhvcNAQcCoIIamjCCGpYCAQExCzAJBgUr
// SIG // DgMCGgUAMGcGCisGAQQBgjcCAQSgWTBXMDIGCisGAQQB
// SIG // gjcCAR4wJAIBAQQQEODJBs441BGiowAQS9NQkAIBAAIB
// SIG // AAIBAAIBAAIBADAhMAkGBSsOAwIaBQAEFKdHskv3B75w
// SIG // cjkdrp9H179/xqghoIIVeTCCBLowggOioAMCAQICCmEC
// SIG // jkIAAAAAAB8wDQYJKoZIhvcNAQEFBQAwdzELMAkGA1UE
// SIG // BhMCVVMxEzARBgNVBAgTCldhc2hpbmd0b24xEDAOBgNV
// SIG // BAcTB1JlZG1vbmQxHjAcBgNVBAoTFU1pY3Jvc29mdCBD
// SIG // b3Jwb3JhdGlvbjEhMB8GA1UEAxMYTWljcm9zb2Z0IFRp
// SIG // bWUtU3RhbXAgUENBMB4XDTEyMDEwOTIyMjU1OFoXDTEz
// SIG // MDQwOTIyMjU1OFowgbMxCzAJBgNVBAYTAlVTMRMwEQYD
// SIG // VQQIEwpXYXNoaW5ndG9uMRAwDgYDVQQHEwdSZWRtb25k
// SIG // MR4wHAYDVQQKExVNaWNyb3NvZnQgQ29ycG9yYXRpb24x
// SIG // DTALBgNVBAsTBE1PUFIxJzAlBgNVBAsTHm5DaXBoZXIg
// SIG // RFNFIEVTTjpGNTI4LTM3NzctOEE3NjElMCMGA1UEAxMc
// SIG // TWljcm9zb2Z0IFRpbWUtU3RhbXAgU2VydmljZTCCASIw
// SIG // DQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAJbsjkdN
// SIG // VMJclYDXTgs9v5dDw0vjYGcRLwFNDNjRRi8QQN4LpFBS
// SIG // EogLQ3otP+5IbmbHkeYDym7sealqI5vNYp7NaqQ/56ND
// SIG // /2JHobS6RPrfQMGFVH7ooKcsQyObUh8yNfT+mlafjWN3
// SIG // ezCeCjOFchvKSsjMJc3bXREux7CM8Y9DSEcFtXogC+Xz
// SIG // 78G69LPYzTiP+yGqPQpthRfQyueGA8Azg7UlxMxanMTD
// SIG // 2mIlTVMlFGGP+xvg7PdHxoBF5jVTIzZ3yrDdmCs5wHU1
// SIG // D92BTCE9djDFsrBlcylIJ9jC0rCER7t4utV0A97XSxn3
// SIG // U9542ob3YYgmM7RHxqBUiBUrLHUCAwEAAaOCAQkwggEF
// SIG // MB0GA1UdDgQWBBQv6EbIaNNuT7Ig0N6JTvFH7kjB8jAf
// SIG // BgNVHSMEGDAWgBQjNPjZUkZwCu1A+3b7syuwwzWzDzBU
// SIG // BgNVHR8ETTBLMEmgR6BFhkNodHRwOi8vY3JsLm1pY3Jv
// SIG // c29mdC5jb20vcGtpL2NybC9wcm9kdWN0cy9NaWNyb3Nv
// SIG // ZnRUaW1lU3RhbXBQQ0EuY3JsMFgGCCsGAQUFBwEBBEww
// SIG // SjBIBggrBgEFBQcwAoY8aHR0cDovL3d3dy5taWNyb3Nv
// SIG // ZnQuY29tL3BraS9jZXJ0cy9NaWNyb3NvZnRUaW1lU3Rh
// SIG // bXBQQ0EuY3J0MBMGA1UdJQQMMAoGCCsGAQUFBwMIMA0G
// SIG // CSqGSIb3DQEBBQUAA4IBAQBz/30unc2NiCt8feNeFXHp
// SIG // aGLwCLZDVsRcSi1o2PlIEZHzEZyF7BLUVKB1qTihWX91
// SIG // 7sb1NNhUpOLQzHyXq5N1MJcHHQRTLDZ/f/FAHgybgOIS
// SIG // CiA6McAHdWfg+jSc7Ij7VxzlWGIgkEUvXUWpyI6zfHJt
// SIG // ECfFS9hvoqgSs201I2f6LNslLbldsR4F50MoPpwFdnfx
// SIG // Jd4FRxlt3kmFodpKSwhGITWodTZMt7MIqt+3K9m+Kmr9
// SIG // 3zUXzD8Mx90Gz06UJGMgCy4krl9DRBJ6XN0326RFs5E6
// SIG // Eld940fGZtPPnEZW9EwHseAMqtX21Tyi4LXU+Bx+BFUQ
// SIG // axj0kc1Rp5VlMIIE7DCCA9SgAwIBAgITMwAAALARrwqL
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
// SIG // MCMGCSqGSIb3DQEJBDEWBBRRojPd8OqqV6ZrhYjYib3f
// SIG // DkZeZjBeBgorBgEEAYI3AgEMMVAwTqAmgCQATQBpAGMA
// SIG // cgBvAHMAbwBmAHQAIABMAGUAYQByAG4AaQBuAGehJIAi
// SIG // aHR0cDovL3d3dy5taWNyb3NvZnQuY29tL2xlYXJuaW5n
// SIG // IDANBgkqhkiG9w0BAQEFAASCAQBhHQJuBzLBCu90IQ1V
// SIG // J/FTm0ZKQ+aAo/gYknve1LpQF2L440H0Vi3TI1OwpUIe
// SIG // l42L7ECltEmqqdGMQ76Blh8Tq2s26jm++i0rcZg5jVf/
// SIG // ow1Acdx1e4+jgsoyKw8reJbozarHmHcKyQU9I7bEI+JY
// SIG // aOdA+PbNNHvl/F/ge06BcAApx5s8sIPFTGWsNj5HNrPu
// SIG // N1cmhFYNzcTMzC41lBdxNwUPUnh+7oX+o75w9YMtVc06
// SIG // T6Qy3Rxkp///aEPnd5EoTtdTgw6nzBgCraI6iwOvtG6s
// SIG // TtZhXDaOIE17dE3hjaM3dZayztqB/1GXH482p4nDZ1Uz
// SIG // SHwjL6Xrir+bKlNDoYICHzCCAhsGCSqGSIb3DQEJBjGC
// SIG // AgwwggIIAgEBMIGFMHcxCzAJBgNVBAYTAlVTMRMwEQYD
// SIG // VQQIEwpXYXNoaW5ndG9uMRAwDgYDVQQHEwdSZWRtb25k
// SIG // MR4wHAYDVQQKExVNaWNyb3NvZnQgQ29ycG9yYXRpb24x
// SIG // ITAfBgNVBAMTGE1pY3Jvc29mdCBUaW1lLVN0YW1wIFBD
// SIG // QQIKYQKOQgAAAAAAHzAJBgUrDgMCGgUAoF0wGAYJKoZI
// SIG // hvcNAQkDMQsGCSqGSIb3DQEHATAcBgkqhkiG9w0BCQUx
// SIG // DxcNMTMwMzI3MTkxMjA1WjAjBgkqhkiG9w0BCQQxFgQU
// SIG // 67Dc7O/ZiEWw299NJ1rovIk93IcwDQYJKoZIhvcNAQEF
// SIG // BQAEggEAOhQBz9miiqbyJme44AGTc1p0+RHHF+/1nGhg
// SIG // if8XjrAdeFD7zkb7IHytcwg2ph5TlG4BCBL+2j/4ZQaO
// SIG // jIEu0kIP8EbVg2aZa2OpTbLSXujATJrntSTbAywz0zMW
// SIG // om+YImL0pqpBMsmsTEkn8GAwDo9jE740hUApQVml0HFI
// SIG // LLglMQ0rYekkEAmatrZILrrv5LQGj1U+iYlPVvrhYtrH
// SIG // 2HJCmvSVW73Y61Omp21eDdMGrL5iq7yHzP/1LzFGoCui
// SIG // Moctox2l5ormty45i6AAxvQ8fMUD+WeZrfcUiyfYgnve
// SIG // FPvnE2uUzEUWkjhq+ET8OKnCwhpDNFneTIfWwA59Rg==
// SIG // End signature block
