using Magazine.Data;
using Magazine.Interfaces;
using Magazine.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Magazine.Repositories
{
    public class ArticleRepository : IArticleRepository
    {
        private readonly ApplicationDbContext _context;

        public ArticleRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public void CreateArticle(Article article)
        {
          
            _context.Articles.Add(article);
            _context.SaveChanges();
        }

        public void DeleteArticle(int id)
        {
            var article = _context.Articles.Find(id);
            _context.Articles.Remove(article);
            _context.SaveChanges();
        }

        public Article GetArticleById(int id)
        {
            var article = _context.Articles.Include(p=>p.ApplicationUser).SingleOrDefault(a=>a.Id==id);
            return article;
        }

        public IEnumerable<Article> GetArticles()
        {
            var articles = _context.Articles.Include(a=>a.ApplicationUser).ToList();
            return articles;
        }

        public IEnumerable<Article> GetArticlesByUserID(string id)
        {
            var articles = _context.Articles.Include(a=>a.ApplicationUser).Where(a => a.ApplicationUserId == id).ToList();
            return articles;
        }

        public void UpdateArticle(Article article)
        {
            var articleIndb = _context.Articles.SingleOrDefault(a => a.Id == article.Id);
            articleIndb.Title = article.Title;
            articleIndb.ShortDescription = article.ShortDescription;
            articleIndb.LongDescription = article.LongDescription;
           _context.SaveChanges();
        }
    }
}
