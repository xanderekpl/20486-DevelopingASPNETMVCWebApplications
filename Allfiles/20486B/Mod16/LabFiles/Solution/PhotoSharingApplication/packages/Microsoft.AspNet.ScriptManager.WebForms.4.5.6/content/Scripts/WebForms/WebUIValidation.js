//CdnPath=http://ajax.aspnetcdn.com/ajax/4.5/6/WebUIValidation.js
var Page_ValidationVer = "125";
var Page_IsValid = true;
var Page_BlockSubmit = false;
var Page_InvalidControlToBeFocused = null;
var Page_TextTypes = /^(text|password|file|search|tel|url|email|number|range|color|datetime|date|month|week|time|datetime-local)$/i;
function ValidatorUpdateDisplay(val) {
    if (typeof(val.display) == "string") {
        if (val.display == "None") {
            return;
        }
        if (val.display == "Dynamic") {
            val.style.display = val.isvalid ? "none" : "inline";
            return;
        }
    }
    if ((navigator.userAgent.indexOf("Mac") > -1) &&
        (navigator.userAgent.indexOf("MSIE") > -1)) {
        val.style.display = "inline";
    }
    val.style.visibility = val.isvalid ? "hidden" : "visible";
}
function ValidatorUpdateIsValid() {
    Page_IsValid = AllValidatorsValid(Page_Validators);
}
function AllValidatorsValid(validators) {
    if ((typeof(validators) != "undefined") && (validators != null)) {
        var i;
        for (i = 0; i < validators.length; i++) {
            if (!validators[i].isvalid) {
                return false;
            }
        }
    }
    return true;
}
function ValidatorHookupControlID(controlID, val) {
    if (typeof(controlID) != "string") {
        return;
    }
    var ctrl = document.getElementById(controlID);
    if ((typeof(ctrl) != "undefined") && (ctrl != null)) {
        ValidatorHookupControl(ctrl, val);
    }
    else {
        val.isvalid = true;
        val.enabled = false;
    }
}
function ValidatorHookupControl(control, val) {
    if (typeof(control.tagName) != "string") {
        return;  
    }
    if (control.tagName != "INPUT" && control.tagName != "TEXTAREA" && control.tagName != "SELECT") {
        var i;
        for (i = 0; i < control.childNodes.length; i++) {
            ValidatorHookupControl(control.childNodes[i], val);
        }
        return;
    }
    else {
        if (typeof(control.Validators) == "undefined") {
            control.Validators = new Array;
            var eventType;
            if (control.type == "radio") {
                eventType = "onclick";
            } else {
                eventType = "onchange";
                if (typeof(val.focusOnError) == "string" && val.focusOnError == "t") {
                    ValidatorHookupEvent(control, "onblur", "ValidatedControlOnBlur(event); ");
                }
            }
            ValidatorHookupEvent(control, eventType, "ValidatorOnChange(event); ");
            if (Page_TextTypes.test(control.type)) {
                ValidatorHookupEvent(control, "onkeypress", 
                    "event = event || window.event; if (!ValidatedTextBoxOnKeyPress(event)) { event.cancelBubble = true; if (event.stopPropagation) event.stopPropagation(); return false; } ");
            }
        }
        control.Validators[control.Validators.length] = val;
    }
}
function ValidatorHookupEvent(control, eventType, functionPrefix) {
    var ev = control[eventType];
    if (typeof(ev) == "function") {
        ev = ev.toString();
        ev = ev.substring(ev.indexOf("{") + 1, ev.lastIndexOf("}"));
    }
    else {
        ev = "";
    }
    control[eventType] = new Function("event", functionPrefix + " " + ev);
}
function ValidatorGetValue(id) {
    var control;
    control = document.getElementById(id);
    if (typeof(control.value) == "string") {
        return control.value;
    }
    return ValidatorGetValueRecursive(control);
}
function ValidatorGetValueRecursive(control)
{
    if (typeof(control.value) == "string" && (control.type != "radio" || control.checked == true)) {
        return control.value;
    }
    var i, val;
    for (i = 0; i<control.childNodes.length; i++) {
        val = ValidatorGetValueRecursive(control.childNodes[i]);
        if (val != "") return val;
    }
    return "";
}
function Page_ClientValidate(validationGroup) {
    Page_InvalidControlToBeFocused = null;
    if (typeof(Page_Validators) == "undefined") {
        return true;
    }
    var i;
    for (i = 0; i < Page_Validators.length; i++) {
        ValidatorValidate(Page_Validators[i], validationGroup, null);
    }
    ValidatorUpdateIsValid();
    ValidationSummaryOnSubmit(validationGroup);
    Page_BlockSubmit = !Page_IsValid;
    return Page_IsValid;
}
function ValidatorCommonOnSubmit() {
    Page_InvalidControlToBeFocused = null;
    var result = !Page_BlockSubmit;
    if ((typeof(window.event) != "undefined") && (window.event != null)) {
        window.event.returnValue = result;
    }
    Page_BlockSubmit = false;
    return result;
}
function ValidatorEnable(val, enable) {
    val.enabled = (enable != false);
    ValidatorValidate(val);
    ValidatorUpdateIsValid();
}
function ValidatorOnChange(event) {
    event = event || window.event;
    Page_InvalidControlToBeFocused = null;
    var targetedControl;
    if ((typeof(event.srcElement) != "undefined") && (event.srcElement != null)) {
        targetedControl = event.srcElement;
    }
    else {
        targetedControl = event.target;
    }
    var vals;
    if (typeof(targetedControl.Validators) != "undefined") {
        vals = targetedControl.Validators;
    }
    else {
        if (targetedControl.tagName.toLowerCase() == "label") {
            targetedControl = document.getElementById(targetedControl.htmlFor);
            vals = targetedControl.Validators;
        }
    }
    if (vals) {
        for (var i = 0; i < vals.length; i++) {
            ValidatorValidate(vals[i], null, event);
        }
    }
    ValidatorUpdateIsValid();
}
function ValidatedTextBoxOnKeyPress(event) {
    event = event || window.event;
    if (event.keyCode == 13) {
        ValidatorOnChange(event);
        var vals;
        if ((typeof(event.srcElement) != "undefined") && (event.srcElement != null)) {
            vals = event.srcElement.Validators;
        }
        else {
            vals = event.target.Validators;
        }
        return AllValidatorsValid(vals);
    }
    return true;
}
function ValidatedControlOnBlur(event) {
    event = event || window.event;
    var control;
    if ((typeof(event.srcElement) != "undefined") && (event.srcElement != null)) {
        control = event.srcElement;
    }
    else {
        control = event.target;
    }
    if ((typeof(control) != "undefined") && (control != null) && (Page_InvalidControlToBeFocused == control)) {
        control.focus();
        Page_InvalidControlToBeFocused = null;
    }
}
function ValidatorValidate(val, validationGroup, event) {
    val.isvalid = true;
    if ((typeof(val.enabled) == "undefined" || val.enabled != false) && IsValidationGroupMatch(val, validationGroup)) {
        if (typeof(val.evaluationfunction) == "function") {
            val.isvalid = val.evaluationfunction(val);
            if (!val.isvalid && Page_InvalidControlToBeFocused == null &&
                typeof(val.focusOnError) == "string" && val.focusOnError == "t") {
                ValidatorSetFocus(val, event);
            }
        }
    }
    ValidatorUpdateDisplay(val);
}
function ValidatorSetFocus(val, event) {
    var ctrl;
    if (typeof(val.controlhookup) == "string") {
        var eventCtrl;
        if ((typeof(event) != "undefined") && (event != null)) {
            if ((typeof(event.srcElement) != "undefined") && (event.srcElement != null)) {
                eventCtrl = event.srcElement;
            }
            else {
                eventCtrl = event.target;
            }
        }
        if ((typeof(eventCtrl) != "undefined") && (eventCtrl != null) &&
            (typeof(eventCtrl.id) == "string") &&
            (eventCtrl.id == val.controlhookup)) {
            ctrl = eventCtrl;
        }
    }
    if ((typeof(ctrl) == "undefined") || (ctrl == null)) {
        ctrl = document.getElementById(val.controltovalidate);
    }
    if ((typeof(ctrl) != "undefined") && (ctrl != null) &&
        (ctrl.tagName.toLowerCase() != "table" || (typeof(event) == "undefined") || (event == null)) && 
        ((ctrl.tagName.toLowerCase() != "input") || (ctrl.type.toLowerCase() != "hidden")) &&
        (typeof(ctrl.disabled) == "undefined" || ctrl.disabled == null || ctrl.disabled == false) &&
        (typeof(ctrl.visible) == "undefined" || ctrl.visible == null || ctrl.visible != false) &&
        (IsInVisibleContainer(ctrl))) {
        if ((ctrl.tagName.toLowerCase() == "table" && (typeof(__nonMSDOMBrowser) == "undefined" || __nonMSDOMBrowser)) ||
            (ctrl.tagName.toLowerCase() == "span")) {
            var inputElements = ctrl.getElementsByTagName("input");
            var lastInputElement  = inputElements[inputElements.length -1];
            if (lastInputElement != null) {
                ctrl = lastInputElement;
            }
        }
        if (typeof(ctrl.focus) != "undefined" && ctrl.focus != null) {
            ctrl.focus();
            Page_InvalidControlToBeFocused = ctrl;
        }
    }
}
function IsInVisibleContainer(ctrl) {
    if (typeof(ctrl.style) != "undefined" &&
        ( ( typeof(ctrl.style.display) != "undefined" &&
            ctrl.style.display == "none") ||
          ( typeof(ctrl.style.visibility) != "undefined" &&
            ctrl.style.visibility == "hidden") ) ) {
        return false;
    }
    else if (typeof(ctrl.parentNode) != "undefined" &&
             ctrl.parentNode != null &&
             ctrl.parentNode != ctrl) {
        return IsInVisibleContainer(ctrl.parentNode);
    }
    return true;
}
function IsValidationGroupMatch(control, validationGroup) {
    if ((typeof(validationGroup) == "undefined") || (validationGroup == null)) {
        return true;
    }
    var controlGroup = "";
    if (typeof(control.validationGroup) == "string") {
        controlGroup = control.validationGroup;
    }
    return (controlGroup == validationGroup);
}
function ValidatorOnLoad() {
    if (typeof(Page_Validators) == "undefined")
        return;
    var i, val;
    for (i = 0; i < Page_Validators.length; i++) {
        val = Page_Validators[i];
        if (typeof(val.evaluationfunction) == "string") {
            eval("val.evaluationfunction = " + val.evaluationfunction + ";");
        }
        if (typeof(val.isvalid) == "string") {
            if (val.isvalid == "False") {
                val.isvalid = false;
                Page_IsValid = false;
            }
            else {
                val.isvalid = true;
            }
        } else {
            val.isvalid = true;
        }
        if (typeof(val.enabled) == "string") {
            val.enabled = (val.enabled != "False");
        }
        if (typeof(val.controltovalidate) == "string") {
            ValidatorHookupControlID(val.controltovalidate, val);
        }
        if (typeof(val.controlhookup) == "string") {
            ValidatorHookupControlID(val.controlhookup, val);
        }
    }
    Page_ValidationActive = true;
}
function ValidatorConvert(op, dataType, val) {
    function GetFullYear(year) {
        var twoDigitCutoffYear = val.cutoffyear % 100;
        var cutoffYearCentury = val.cutoffyear - twoDigitCutoffYear;
        return ((year > twoDigitCutoffYear) ? (cutoffYearCentury - 100 + year) : (cutoffYearCentury + year));
    }
    var num, cleanInput, m, exp;
    if (dataType == "Integer") {
        exp = /^\s*[-\+]?\d+\s*$/;
        if (op.match(exp) == null)
            return null;
        num = parseInt(op, 10);
        return (isNaN(num) ? null : num);
    }
    else if(dataType == "Double") {
        exp = new RegExp("^\\s*([-\\+])?(\\d*)\\" + val.decimalchar + "?(\\d*)\\s*$");
        m = op.match(exp);
        if (m == null)
            return null;
        if (m[2].length == 0 && m[3].length == 0)
            return null;
        cleanInput = (m[1] != null ? m[1] : "") + (m[2].length>0 ? m[2] : "0") + (m[3].length>0 ? "." + m[3] : "");
        num = parseFloat(cleanInput);
        return (isNaN(num) ? null : num);
    }
    else if (dataType == "Currency") {
        var hasDigits = (val.digits > 0);
        var beginGroupSize, subsequentGroupSize;
        var groupSizeNum = parseInt(val.groupsize, 10);
        if (!isNaN(groupSizeNum) && groupSizeNum > 0) {
            beginGroupSize = "{1," + groupSizeNum + "}";
            subsequentGroupSize = "{" + groupSizeNum + "}";
        }
        else {
            beginGroupSize = subsequentGroupSize = "+";
        }
        exp = new RegExp("^\\s*([-\\+])?((\\d" + beginGroupSize + "(\\" + val.groupchar + "\\d" + subsequentGroupSize + ")+)|\\d*)"
                        + (hasDigits ? "\\" + val.decimalchar + "?(\\d{0," + val.digits + "})" : "")
                        + "\\s*$");
        m = op.match(exp);
        if (m == null)
            return null;
        if (m[2].length == 0 && hasDigits && m[5].length == 0)
            return null;
        cleanInput = (m[1] != null ? m[1] : "") + m[2].replace(new RegExp("(\\" + val.groupchar + ")", "g"), "") + ((hasDigits && m[5].length > 0) ? "." + m[5] : "");
        num = parseFloat(cleanInput);
        return (isNaN(num) ? null : num);
    }
    else if (dataType == "Date") {
        var yearFirstExp = new RegExp("^\\s*((\\d{4})|(\\d{2}))([-/]|\\. ?)(\\d{1,2})\\4(\\d{1,2})\\.?\\s*$");
        m = op.match(yearFirstExp);
        var day, month, year;
        if (m != null && (((typeof(m[2]) != "undefined") && (m[2].length == 4)) || val.dateorder == "ymd")) {
            day = m[6];
            month = m[5];
            year = (m[2].length == 4) ? m[2] : GetFullYear(parseInt(m[3], 10));
        }
        else {
            if (val.dateorder == "ymd"){
                return null;
            }
            var yearLastExp = new RegExp("^\\s*(\\d{1,2})([-/]|\\. ?)(\\d{1,2})(?:\\s|\\2)((\\d{4})|(\\d{2}))(?:\\s\u0433\\.|\\.)?\\s*$");
            m = op.match(yearLastExp);
            if (m == null) {
                return null;
            }
            if (val.dateorder == "mdy") {
                day = m[3];
                month = m[1];
            }
            else {
                day = m[1];
                month = m[3];
            }
            year = ((typeof(m[5]) != "undefined") && (m[5].length == 4)) ? m[5] : GetFullYear(parseInt(m[6], 10));
        }
        month -= 1;
        var date = new Date(year, month, day);
        if (year < 100) {
            date.setFullYear(year);
        }
        return (typeof(date) == "object" && year == date.getFullYear() && month == date.getMonth() && day == date.getDate()) ? date.valueOf() : null;
    }
    else {
        return op.toString();
    }
}
function ValidatorCompare(operand1, operand2, operator, val) {
    var dataType = val.type;
    var op1, op2;
    if ((op1 = ValidatorConvert(operand1, dataType, val)) == null)
        return false;
    if (operator == "DataTypeCheck")
        return true;
    if ((op2 = ValidatorConvert(operand2, dataType, val)) == null)
        return true;
    switch (operator) {
        case "NotEqual":
            return (op1 != op2);
        case "GreaterThan":
            return (op1 > op2);
        case "GreaterThanEqual":
            return (op1 >= op2);
        case "LessThan":
            return (op1 < op2);
        case "LessThanEqual":
            return (op1 <= op2);
        default:
            return (op1 == op2);
    }
}
function CompareValidatorEvaluateIsValid(val) {
    var value = ValidatorGetValue(val.controltovalidate);
    if (ValidatorTrim(value).length == 0)
        return true;
    var compareTo = "";
    if ((typeof(val.controltocompare) != "string") ||
        (typeof(document.getElementById(val.controltocompare)) == "undefined") ||
        (null == document.getElementById(val.controltocompare))) {
        if (typeof(val.valuetocompare) == "string") {
            compareTo = val.valuetocompare;
        }
    }
    else {
        compareTo = ValidatorGetValue(val.controltocompare);
    }
    var operator = "Equal";
    if (typeof(val.operator) == "string") {
        operator = val.operator;
    }
    return ValidatorCompare(value, compareTo, operator, val);
}
function CustomValidatorEvaluateIsValid(val) {
    var value = "";
    if (typeof(val.controltovalidate) == "string") {
        value = ValidatorGetValue(val.controltovalidate);
        if ((ValidatorTrim(value).length == 0) &&
            ((typeof(val.validateemptytext) != "string") || (val.validateemptytext != "true"))) {
            return true;
        }
    }
    var args = { Value:value, IsValid:true };
    if (typeof(val.clientvalidationfunction) == "string") {
        eval(val.clientvalidationfunction + "(val, args) ;");
    }
    return args.IsValid;
}
function RegularExpressionValidatorEvaluateIsValid(val) {
    var value = ValidatorGetValue(val.controltovalidate);
    if (ValidatorTrim(value).length == 0)
        return true;
    var rx = new RegExp(val.validationexpression);
    var matches = rx.exec(value);
    return (matches != null && value == matches[0]);
}
function ValidatorTrim(s) {
    var m = s.match(/^\s*(\S+(\s+\S+)*)\s*$/);
    return (m == null) ? "" : m[1];
}
function RequiredFieldValidatorEvaluateIsValid(val) {
    return (ValidatorTrim(ValidatorGetValue(val.controltovalidate)) != ValidatorTrim(val.initialvalue))
}
function RangeValidatorEvaluateIsValid(val) {
    var value = ValidatorGetValue(val.controltovalidate);
    if (ValidatorTrim(value).length == 0)
        return true;
    return (ValidatorCompare(value, val.minimumvalue, "GreaterThanEqual", val) &&
            ValidatorCompare(value, val.maximumvalue, "LessThanEqual", val));
}
function ValidationSummaryOnSubmit(validationGroup) {
    if (typeof(Page_ValidationSummaries) == "undefined")
        return;
    var summary, sums, s;
    var headerSep, first, pre, post, end;
    for (sums = 0; sums < Page_ValidationSummaries.length; sums++) {
        summary = Page_ValidationSummaries[sums];
        if (!summary) continue;
        summary.style.display = "none";
        if (!Page_IsValid && IsValidationGroupMatch(summary, validationGroup)) {
            var i;
            if (summary.showsummary != "False") {
                summary.style.display = "";
                if (typeof(summary.displaymode) != "string") {
                    summary.displaymode = "BulletList";
                }
                switch (summary.displaymode) {
                    case "List":
                        headerSep = "<br>";
                        first = "";
                        pre = "";
                        post = "<br>";
                        end = "";
                        break;
                    case "BulletList":
                    default:
                        headerSep = "";
                        first = "<ul>";
                        pre = "<li>";
                        post = "</li>";
                        end = "</ul>";
                        break;
                    case "SingleParagraph":
                        headerSep = " ";
                        first = "";
                        pre = "";
                        post = " ";
                        end = "<br>";
                        break;
                }
                s = "";
                if (typeof(summary.headertext) == "string") {
                    s += summary.headertext + headerSep;
                }
                s += first;
                for (i=0; i<Page_Validators.length; i++) {
                    if (!Page_Validators[i].isvalid && typeof(Page_Validators[i].errormessage) == "string") {
                        s += pre + Page_Validators[i].errormessage + post;
                    }
                }
                s += end;
                summary.innerHTML = s;
                window.scrollTo(0,0);
            }
            if (summary.showmessagebox == "True") {
                s = "";
                if (typeof(summary.headertext) == "string") {
                    s += summary.headertext + "\r\n";
                }
                var lastValIndex = Page_Validators.length - 1;
                for (i=0; i<=lastValIndex; i++) {
                    if (!Page_Validators[i].isvalid && typeof(Page_Validators[i].errormessage) == "string") {
                        switch (summary.displaymode) {
                            case "List":
                                s += Page_Validators[i].errormessage;
                                if (i < lastValIndex) {
                                    s += "\r\n";
                                }
                                break;
                            case "BulletList":
                            default:
                                s += "- " + Page_Validators[i].errormessage;
                                if (i < lastValIndex) {
                                    s += "\r\n";
                                }
                                break;
                            case "SingleParagraph":
                                s += Page_Validators[i].errormessage + " ";
                                break;
                        }
                    }
                }
                alert(s);
            }
        }
    }
}
if (window.jQuery) {
    (function ($) {
        var dataValidationAttribute = "data-val",
            dataValidationSummaryAttribute = "data-valsummary",
            normalizedAttributes = { validationgroup: "validationGroup", focusonerror: "focusOnError" };
        function getAttributesWithPrefix(element, prefix) {
            var i,
                attribute,
                list = {},
                attributes = element.attributes,
                length = attributes.length,
                prefixLength = prefix.length;
            prefix = prefix.toLowerCase();
            for (i = 0; i < length; i++) {
                attribute = attributes[i];
                if (attribute.specified && attribute.name.substr(0, prefixLength).toLowerCase() === prefix) {
                    list[attribute.name.substr(prefixLength)] = attribute.value;
                }
            }
            return list;
        }
        function normalizeKey(key) {
            key = key.toLowerCase();
            return normalizedAttributes[key] === undefined ? key : normalizedAttributes[key];
        }
        function addValidationExpando(element) {
            var attributes = getAttributesWithPrefix(element, dataValidationAttribute + "-");
            $.each(attributes, function (key, value) {
                element[normalizeKey(key)] = value;
            });
        }
        function dispose(element) {
            var index = $.inArray(element, Page_Validators);
            if (index >= 0) {
                Page_Validators.splice(index, 1);
            }
        }
        function addNormalizedAttribute(name, normalizedName) {
            normalizedAttributes[name.toLowerCase()] = normalizedName;
        }
        function parseSpecificAttribute(selector, attribute, validatorsArray) {
            return $(selector).find("[" + attribute + "='true']").each(function (index, element) {
                addValidationExpando(element);
                element.dispose = function () { dispose(element); element.dispose = null; };
                if ($.inArray(element, validatorsArray) === -1) {
                    validatorsArray.push(element);
                }
            }).length;
        }
        function parse(selector) {
            var length = parseSpecificAttribute(selector, dataValidationAttribute, Page_Validators);
            length += parseSpecificAttribute(selector, dataValidationSummaryAttribute, Page_ValidationSummaries);
            return length;
        }
        function loadValidators() {
            if (typeof (ValidatorOnLoad) === "function") {
                ValidatorOnLoad();
            }
            if (typeof (ValidatorOnSubmit) === "undefined") {
                window.ValidatorOnSubmit = function () {
                    return Page_ValidationActive ? ValidatorCommonOnSubmit() : true;
                };
            }
        }
        function registerUpdatePanel() {
            if (window.Sys && Sys.WebForms && Sys.WebForms.PageRequestManager) {
                var prm = Sys.WebForms.PageRequestManager.getInstance(),
                    postBackElement, endRequestHandler;
                if (prm.get_isInAsyncPostBack()) {
                    endRequestHandler = function (sender, args) {
                        if (parse(document)) {
                            loadValidators();
                        }
                        prm.remove_endRequest(endRequestHandler);
                        endRequestHandler = null;
                    };
                    prm.add_endRequest(endRequestHandler);
                }
                prm.add_beginRequest(function (sender, args) {
                    postBackElement = args.get_postBackElement();
                });
                prm.add_pageLoaded(function (sender, args) {
                    var i, panels, valFound = 0;
                    if (typeof (postBackElement) === "undefined") {
                        return;
                    }
                    panels = args.get_panelsUpdated();
                    for (i = 0; i < panels.length; i++) {
                        valFound += parse(panels[i]);
                    }
                    panels = args.get_panelsCreated();
                    for (i = 0; i < panels.length; i++) {
                        valFound += parse(panels[i]);
                    }
                    if (valFound) {
                        loadValidators();
                    }
                });
            }
        }
        $(function () {
            if (typeof (Page_Validators) === "undefined") {
                window.Page_Validators = [];
            }
            if (typeof (Page_ValidationSummaries) === "undefined") {
                window.Page_ValidationSummaries = [];
            }
            if (typeof (Page_ValidationActive) === "undefined") {
                window.Page_ValidationActive = false;
            }
            $.WebFormValidator = {
                addNormalizedAttribute: addNormalizedAttribute,
                parse: parse
            };
            if (parse(document)) {
                loadValidators();
            }
            registerUpdatePanel();
        });
    } (jQuery));
}
// SIG // Begin signature block
// SIG // MIIaqQYJKoZIhvcNAQcCoIIamjCCGpYCAQExCzAJBgUr
// SIG // DgMCGgUAMGcGCisGAQQBgjcCAQSgWTBXMDIGCisGAQQB
// SIG // gjcCAR4wJAIBAQQQEODJBs441BGiowAQS9NQkAIBAAIB
// SIG // AAIBAAIBAAIBADAhMAkGBSsOAwIaBQAEFAazDLKHcALe
// SIG // DHi+NgJlftq2r87poIIVeTCCBLowggOioAMCAQICCmEC
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
// SIG // MCMGCSqGSIb3DQEJBDEWBBSefMS37VXn9+4ffDSC06QU
// SIG // QVopQTBeBgorBgEEAYI3AgEMMVAwTqAmgCQATQBpAGMA
// SIG // cgBvAHMAbwBmAHQAIABMAGUAYQByAG4AaQBuAGehJIAi
// SIG // aHR0cDovL3d3dy5taWNyb3NvZnQuY29tL2xlYXJuaW5n
// SIG // IDANBgkqhkiG9w0BAQEFAASCAQB3IjBoPU/f5ZjDrH8+
// SIG // EF8pvPGx6F8wEytNtRFh0fr2iSO6KMJlAgw8RIXGK2CD
// SIG // jqOk1Y9xSogPrVBa8JNWWjppuqQwp+TDZOR1XbTmd1Lq
// SIG // hZEojX+bqLtZ4bc2FDQ9aBIyY1yKpbqa7mN4rqZylbAa
// SIG // CqH3E3ItKxuOf5+wJIy2YUOY6MEqjr41TIOAYP7TrLPc
// SIG // fl6vGdUzOK1oEfrTFnOwweTumKtW88omP3PVWa1vje7O
// SIG // HEVvBNO2Z+oRqo3FHDer0jIHxGFynLJwCX0L8sK+WJbx
// SIG // mIp/FrPrE693QhsUr3ddCPdT4YCj4Ih0lh9FSSfZIpQx
// SIG // WGdGoBYuxO3NHRNJoYICHzCCAhsGCSqGSIb3DQEJBjGC
// SIG // AgwwggIIAgEBMIGFMHcxCzAJBgNVBAYTAlVTMRMwEQYD
// SIG // VQQIEwpXYXNoaW5ndG9uMRAwDgYDVQQHEwdSZWRtb25k
// SIG // MR4wHAYDVQQKExVNaWNyb3NvZnQgQ29ycG9yYXRpb24x
// SIG // ITAfBgNVBAMTGE1pY3Jvc29mdCBUaW1lLVN0YW1wIFBD
// SIG // QQIKYQKSSgAAAAAAIDAJBgUrDgMCGgUAoF0wGAYJKoZI
// SIG // hvcNAQkDMQsGCSqGSIb3DQEHATAcBgkqhkiG9w0BCQUx
// SIG // DxcNMTMwMzI3MTkxMjUyWjAjBgkqhkiG9w0BCQQxFgQU
// SIG // GRw8zpVqUdresNhreUpWNIFu6rswDQYJKoZIhvcNAQEF
// SIG // BQAEggEAGQw7dbSEOdadLjWBVBXBojZor0PHdDiC5VFk
// SIG // Jft6nZaXTHAK6ZKNhLC3E+qZJ6vpdJXexd6hxJi9bWbk
// SIG // 76qIpwHnSCJG3evsoAZroF1fCy98YEwhtadsNVUykI8M
// SIG // YD5TIHl6alRhCqFOnW3Ql7h4h3McDaWVt0aVLX95GTlN
// SIG // 7goUeje0YIGe/jEZC9uSeJ4dm3W5vX0PwJ3BkICag6wK
// SIG // AI6IWkDLJa4TjdQPBHjjQ92lqdS8uqt8U4PMpYDZ2cl2
// SIG // AVU0elTtflYzotSZNFe4qr0spynaLjORXIWUvW8gpQVW
// SIG // 8Jurw93JRZ91lW6IENogPdv+PANERGUqdH0lmPR/Uw==
// SIG // End signature block
