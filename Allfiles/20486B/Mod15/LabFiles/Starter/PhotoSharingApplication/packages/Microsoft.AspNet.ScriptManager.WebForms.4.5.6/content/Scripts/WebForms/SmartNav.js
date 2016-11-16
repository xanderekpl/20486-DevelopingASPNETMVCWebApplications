//CdnPath=http://ajax.aspnetcdn.com/ajax/4.5/6/SmartNav.js
var snSrc;
if ((typeof(window.__smartNav) == "undefined") || (window.__smartNav == null))
{
    window.__smartNav = new Object();
    window.__smartNav.update = function()
    {
        var sn = window.__smartNav;
        var fd;
        document.detachEvent("onstop", sn.stopHif);
        sn.inPost = false;
        try { fd = frames["__hifSmartNav"].document; } catch (e) {return;}
        var fdr = fd.getElementsByTagName("asp_smartnav_rdir");
        if (fdr.length > 0)
        {
            if ((typeof(sn.sHif) == "undefined") || (sn.sHif == null))
            {
                sn.sHif = document.createElement("IFRAME");
                sn.sHif.name = "__hifSmartNav";
                sn.sHif.style.display = "none";
                sn.sHif.src = snSrc;
            }
            try {window.location = fdr[0].url;} catch (e) {};
            return;
        }
        var fdurl = fd.location.href;
        var index = fdurl.indexOf(snSrc);
        if ((index != -1 && index == fdurl.length-snSrc.length)
            || fdurl == "about:blank")
            return;
		var fdurlb = fdurl.split("?")[0];
		if (document.location.href.indexOf(fdurlb) < 0)
		{
            document.location.href=fdurl;
		    return;
		}
		sn._savedOnLoad = window.onload;
		window.onload = null;
		window.__smartNav.updateHelper();
	}
	window.__smartNav.updateHelper = function()
	{
		if (document.readyState != "complete")
		{
		    window.setTimeout(window.__smartNav.updateHelper, 25);
		    return;
		}
		window.__smartNav.loadNewContent();
	}
	window.__smartNav.loadNewContent = function()
	{
		var sn = window.__smartNav;
		var fd;
		try { fd = frames["__hifSmartNav"].document; } catch (e) {return;}
        if ((typeof(sn.sHif) != "undefined") && (sn.sHif != null))
        {
            sn.sHif.removeNode(true);
            sn.sHif = null;
        }
        var hdm = document.getElementsByTagName("head")[0];
        var hk = hdm.childNodes;
        var tt = null;
        var i;
        for (i = hk.length - 1; i>= 0; i--)
        {
            if (hk[i].tagName == "TITLE")
            {
                tt = hk[i].outerHTML;
                continue;
            }
            if (hk[i].tagName != "BASEFONT" || hk[i].innerHTML.length == 0)
                hdm.removeChild(hdm.childNodes[i]);
        }
        var kids = fd.getElementsByTagName("head")[0].childNodes;
        for (i = 0; i < kids.length; i++)
        {
            var tn = kids[i].tagName;
            var k = document.createElement(tn);
            k.id = kids[i].id;
            k.mergeAttributes(kids[i]);
            switch(tn)
            {
            case "TITLE":
                if (tt == kids[i].outerHTML)
                    continue;
                k.innerText = kids[i].text;
                hdm.insertAdjacentElement("afterbegin", k);
                continue;
            case "BASEFONT" :
                if (kids[i].innerHTML.length > 0)
                    continue;
                break;
            default:
                var o = document.createElement("BODY");
                o.innerHTML = "<BODY>" + kids[i].outerHTML + "</BODY>";
                k = o.firstChild;
                break;
            }
            if((typeof(k) != "undefined") && (k != null))
                hdm.appendChild(k);
        }
        document.body.clearAttributes();
        document.body.id = fd.body.id;
        document.body.mergeAttributes(fd.body);
        var newBodyLoad = fd.body.onload;
        if ((typeof(newBodyLoad) != "undefined") && (newBodyLoad != null))
            document.body.onload = newBodyLoad;
        else
            document.body.onload = sn._savedOnLoad;
        var s = "<BODY>" + fd.body.innerHTML + "</BODY>";
        if ((typeof(sn.hif) != "undefined") && (sn.hif != null))
        {
            var hifP = sn.hif.parentElement;
            if ((typeof(hifP) != "undefined") && (hifP != null))
                sn.sHif=hifP.removeChild(sn.hif);
        }
        document.body.innerHTML = s;
        var sc = document.scripts;
        for (i = 0; i < sc.length; i++)
        {
            sc[i].text = sc[i].text;
        }
        sn.hif = document.all("__hifSmartNav");
        if ((typeof(sn.hif) != "undefined") && (sn.hif != null))
        {
            var hif = sn.hif;
            sn.hifName = "__hifSmartNav" + (new Date()).getTime();
            frames["__hifSmartNav"].name = sn.hifName;
            sn.hifDoc = hif.contentWindow.document;
            if (sn.ie5)
                hif.parentElement.removeChild(hif);
            window.setTimeout(sn.restoreFocus,0);
        }
        if (typeof(window.onload) == "string")
        {
            try { eval(window.onload) } catch (e) {};
        }
        else if ((typeof(window.onload) != "undefined") && (window.onload != null))
        {
            try { window.onload() } catch (e) {};
        }
        sn._savedOnLoad = null;
        sn.attachForm();
    };
    window.__smartNav.restoreFocus = function()
    {
        if (window.__smartNav.inPost == true) return;
        var curAe = document.activeElement;
        var sAeId = window.__smartNav.ae;
        if (((typeof(sAeId) == "undefined") || (sAeId == null)) ||
            (typeof(curAe) != "undefined") && (curAe != null) && (curAe.id == sAeId || curAe.name == sAeId))
            return;
        var ae = document.all(sAeId);
        if ((typeof(ae) == "undefined") || (ae == null)) return;
        try { ae.focus(); } catch(e){};
    }
    window.__smartNav.saveHistory = function()
    {
        if ((typeof(window.__smartNav.hif) != "undefined") && (window.__smartNav.hif != null))
            window.__smartNav.hif.removeNode();
        if ((typeof(window.__smartNav.sHif) != "undefined") && (window.__smartNav.sHif != null)
            && (typeof(document.all[window.__smartNav.siHif]) != "undefined")
            && (document.all[window.__smartNav.siHif] != null)) {
            document.all[window.__smartNav.siHif].insertAdjacentElement(
                        "BeforeBegin", window.__smartNav.sHif);
        }
    }
    window.__smartNav.stopHif = function()
    {
        document.detachEvent("onstop", window.__smartNav.stopHif);
        var sn = window.__smartNav;
        if (((typeof(sn.hifDoc) == "undefined") || (sn.hifDoc == null)) &&
            (typeof(sn.hif) != "undefined") && (sn.hif != null))
        {
            try {sn.hifDoc = sn.hif.contentWindow.document;}
            catch(e){sn.hifDoc=null}
        }
        if (sn.hifDoc != null)
        {
            try {sn.hifDoc.execCommand("stop");} catch (e){}
        }
    }
    window.__smartNav.init =  function()
    {
        var sn = window.__smartNav;
        window.__smartNav.form.__smartNavPostBack.value = 'true';
        document.detachEvent("onstop", sn.stopHif);
        document.attachEvent("onstop", sn.stopHif);
        try { if (window.event.returnValue == false) return; } catch(e) {}
        sn.inPost = true;
        if ((typeof(document.activeElement) != "undefined") && (document.activeElement != null))
        {
            var ae = document.activeElement.id;
            if (ae.length == 0)
                ae = document.activeElement.name;
            sn.ae = ae;
        }
        else
            sn.ae = null;
        try {document.selection.empty();} catch (e) {}
        if ((typeof(sn.hif) == "undefined") || (sn.hif == null))
        {
            sn.hif = document.all("__hifSmartNav");
            sn.hifDoc = sn.hif.contentWindow.document;
        }
        if ((typeof(sn.hifDoc) != "undefined") && (sn.hifDoc != null))
            try {sn.hifDoc.designMode = "On";} catch(e){};
        if ((typeof(sn.hif.parentElement) == "undefined") || (sn.hif.parentElement == null))
            document.body.appendChild(sn.hif);
        var hif = sn.hif;
        hif.detachEvent("onload", sn.update);
        hif.attachEvent("onload", sn.update);
        window.__smartNav.fInit = true;
    };
    window.__smartNav.submit = function()
    {
        window.__smartNav.fInit = false;
        try { window.__smartNav.init(); } catch(e) {}
        if (window.__smartNav.fInit) {
            window.__smartNav.form._submit();
        }
    };
    window.__smartNav.attachForm = function()
    {
        var cf = document.forms;
        for (var i=0; i<cf.length; i++)
        {
            if ((typeof(cf[i].__smartNavEnabled) != "undefined") && (cf[i].__smartNavEnabled != null))
            {
                window.__smartNav.form = cf[i];
                window.__smartNav.form.insertAdjacentHTML("beforeEnd", "<input type='hidden' name='__smartNavPostBack' value='false' />");
                break;
            }
        }
        var snfm = window.__smartNav.form;
        if ((typeof(snfm) == "undefined") || (snfm == null)) return false;
        var sft = snfm.target;
        if (sft.length != 0 && sft.indexOf("__hifSmartNav") != 0) return false;
        var sfc = snfm.action.split("?")[0];
        var url = window.location.href.split("?")[0];
        if (url.charAt(url.length-1) != '/' && url.lastIndexOf(sfc) + sfc.length != url.length) return false;
        if (snfm.__formAttached == true) return true;
        snfm.__formAttached = true;
        snfm.attachEvent("onsubmit", window.__smartNav.init);
        snfm._submit = snfm.submit;
        snfm.submit = window.__smartNav.submit;
        snfm.target = window.__smartNav.hifName;
        return true;
    };
    window.__smartNav.hifName = "__hifSmartNav" + (new Date()).getTime();
    window.__smartNav.ie5 = navigator.appVersion.indexOf("MSIE 5") > 0;
    var rc = window.__smartNav.attachForm();
    var hif = document.all("__hifSmartNav");
    if ((typeof(snSrc) == "undefined") || (snSrc == null)) {
	    if (typeof(window.dialogHeight) != "undefined") {
	            snSrc = "IEsmartnav1";
		    hif.src = snSrc;
	    } else {
		    snSrc = hif.src;
	    }
    }
    if (rc)
    {
        var fsn = frames["__hifSmartNav"];
        fsn.name = window.__smartNav.hifName;
        window.__smartNav.siHif = hif.sourceIndex;
        try {
            if (fsn.document.location != snSrc)
            {
                fsn.document.designMode = "On";
                hif.attachEvent("onload",window.__smartNav.update);
                window.__smartNav.hif = hif;
            }
        }
        catch (e) { window.__smartNav.hif = hif; }
        window.attachEvent("onbeforeunload", window.__smartNav.saveHistory);
    }
    else
        window.__smartNav = null;
}

// SIG // Begin signature block
// SIG // MIIaqQYJKoZIhvcNAQcCoIIamjCCGpYCAQExCzAJBgUr
// SIG // DgMCGgUAMGcGCisGAQQBgjcCAQSgWTBXMDIGCisGAQQB
// SIG // gjcCAR4wJAIBAQQQEODJBs441BGiowAQS9NQkAIBAAIB
// SIG // AAIBAAIBAAIBADAhMAkGBSsOAwIaBQAEFIH7YgU3B1bV
// SIG // nC80acvmoys+BEEroIIVeTCCBLowggOioAMCAQICCmEC
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
// SIG // MCMGCSqGSIb3DQEJBDEWBBTlvmrbwmSLE1ePP5o0L0fs
// SIG // iACQQjBeBgorBgEEAYI3AgEMMVAwTqAmgCQATQBpAGMA
// SIG // cgBvAHMAbwBmAHQAIABMAGUAYQByAG4AaQBuAGehJIAi
// SIG // aHR0cDovL3d3dy5taWNyb3NvZnQuY29tL2xlYXJuaW5n
// SIG // IDANBgkqhkiG9w0BAQEFAASCAQBZkdwD+3qrhjcpnS9D
// SIG // lfcLdlUcqqjk+FJJx83zlro/CBDbSx8H0DefTTQ577A4
// SIG // LPVWLGjoMVD/PXyCr89IbBLoin0HiE74FLxlgd2W7bSr
// SIG // jqVsI/deUaL93mZy/VAnMP+J0g7VFdfCq6xkCfmSjjtG
// SIG // n04WkZU6cqILVO1nRJFSJc63yDFZCgX4pY2Mv8ppvmTn
// SIG // 692hINbj3f5P4CrNK3/WfeR0OQg+WkNPGttPqWcamFp8
// SIG // Hbw5IinsFJdrV90SUTp/sWr3Nd4N9G/I7hp6WIw6BBqg
// SIG // ZD3HDkTJeBvMzuJxGW/BL80CE/gLGLot5DaAaItqkkCV
// SIG // 4tdgk7bVs/yfDGnEoYICHzCCAhsGCSqGSIb3DQEJBjGC
// SIG // AgwwggIIAgEBMIGFMHcxCzAJBgNVBAYTAlVTMRMwEQYD
// SIG // VQQIEwpXYXNoaW5ndG9uMRAwDgYDVQQHEwdSZWRtb25k
// SIG // MR4wHAYDVQQKExVNaWNyb3NvZnQgQ29ycG9yYXRpb24x
// SIG // ITAfBgNVBAMTGE1pY3Jvc29mdCBUaW1lLVN0YW1wIFBD
// SIG // QQIKYQKSSgAAAAAAIDAJBgUrDgMCGgUAoF0wGAYJKoZI
// SIG // hvcNAQkDMQsGCSqGSIb3DQEHATAcBgkqhkiG9w0BCQUx
// SIG // DxcNMTMwMzI3MTkxMjQ1WjAjBgkqhkiG9w0BCQQxFgQU
// SIG // qxGY7DR19mMBe5g9u3XlXAtEX1UwDQYJKoZIhvcNAQEF
// SIG // BQAEggEAPay9QWWzAx4ji/maLb13LJ82q2+KfqTZvWMW
// SIG // wpaHFrSklvCwea8IcllgKwxoTgGsQ5Er80zPovVNhVTI
// SIG // PmZPHhc2tWppjdFBkwyc/CBOMi9nVuieNovcSMr7q6cA
// SIG // b19gAdHqyCqNrFBuwqBHeuazi+SmJ4khiKPLAV0hRNDF
// SIG // SZ/DncZgoMxb1lkjAk+uZ94w2lZOFrTNE3ovvad1QpVs
// SIG // NaFxCqOIgXlWgJpDtB6OyVhDzSSaqtlj3P09BnpgeE8Y
// SIG // rXUoo+zTGlTvTRBGat6Ryc40/k9RrR5cO+LCy2bicWzS
// SIG // HYdRLGrkzvURVr8KXoJGb8sKES8cyFlVyNhV+m2rVg==
// SIG // End signature block
