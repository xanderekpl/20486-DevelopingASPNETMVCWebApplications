using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace mvc2.Controllers
{
    public class HomeController : Controller
    {

        [Authorize(Users = "DESKTOP-3856HQR\\student")]
        public void Info()
        {
            var homeInfo = typeof(HomeController);
            Response.Write($"{homeInfo.BaseType}\n");

        }
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
    }
}