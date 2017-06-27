using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using OperasWebSite.Models;

namespace OperasWebSite.Controllers
{
    public class OperaController : Controller
    {
        private OperasDB db = new OperasDB();

        //
        // GET: /Opera/

        public ActionResult Index()
        {
            return View(db.Operas.ToList());
        }

        //
        // GET: /Opera/Details/5

        public ActionResult Details(int id = 0)
        {
            Opera opera = db.Operas.Find(id);
            if (opera == null)
            {
                return HttpNotFound();
            }
            return View(opera);
        }

        //
        // GET: /Opera/Create

        public ActionResult Create()
        {
            return View();
        }

        //
        // POST: /Opera/Create

        [HttpPost]
        public ActionResult Create(Opera opera)
        {
            if (ModelState.IsValid)
            {
                db.Operas.Add(opera);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            return View(opera);
        }

        //
        // GET: /Opera/Edit/5

        public ActionResult Edit(int id = 0)
        {
            Opera opera = db.Operas.Find(id);
            if (opera == null)
            {
                return HttpNotFound();
            }
            return View(opera);
        }

        //
        // POST: /Opera/Edit/5

        [HttpPost]
        public ActionResult Edit(Opera opera)
        {
            if (ModelState.IsValid)
            {
                db.Entry(opera).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(opera);
        }

        //
        // GET: /Opera/Delete/5

        public ActionResult Delete(int id = 0)
        {
            Opera opera = db.Operas.Find(id);
            if (opera == null)
            {
                return HttpNotFound();
            }
            return View(opera);
        }

        //
        // POST: /Opera/Delete/5

        [HttpPost, ActionName("Delete")]
        public ActionResult DeleteConfirmed(int id)
        {
            Opera opera = db.Operas.Find(id);
            db.Operas.Remove(opera);
            db.SaveChanges();
            return RedirectToAction("Index");
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}