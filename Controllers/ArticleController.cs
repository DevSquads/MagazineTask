using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Magazine.Interfaces;
using Magazine.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Magazine.Controllers
{
    public class ArticleController : Controller
    {
        private readonly IArticleRepository _article;

        public ArticleController(IArticleRepository article)
        {
            _article = article;
        }
        /// <summary>
        /// Display All Article For All Authers
        /// </summary>
        /// <returns></returns>
        // GET: Article
        public ActionResult Index()
        {
           var articles= _article.GetArticles();
            return View(articles);
        }
        /// <summary>
        /// Display Article's Detalis
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        // GET: Article/Details/5
        public ActionResult Details(int id)
        {
            var article = _article.GetArticleById(id);
            return View(article);
        }
        /// <summary>
        /// Create Article
        /// </summary>
        /// <returns></returns>
        [Authorize]
        // GET: Article/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: Article/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create(Article article)
        {
            try
            {
                _article.CreateArticle(article);

                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }
        /// <summary>
        /// Upadate Artilce
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [Authorize]
        // GET: Article/Edit/5
        public ActionResult Edit(int id)
        {
            var article = _article.GetArticleById(id);
            return View(article);
        }

        // POST: Article/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit(int id, Article article)
        {
            try
            {
                _article.UpdateArticle(article);

                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }
        /// <summary>
        /// Delete Article
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        // POST: Article/Delete/5
        [Authorize]
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Delete(int id)
        {
            try
            {
                _article.DeleteArticle(id);

                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return Content("Error");
            }
        }
        /// <summary>
        /// /Show Article for specefic Auther
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        //GET Article/GetautherArticles/2
        [Authorize]
        public IActionResult GetautherArticles(string id)
        {
           var articles=_article.GetArticlesByUserID(id);
            return View(articles);
        }
    }
}