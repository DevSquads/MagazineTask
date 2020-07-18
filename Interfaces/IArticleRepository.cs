using Magazine.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Magazine.Interfaces
{
   public interface IArticleRepository
    {
        IEnumerable<Article> GetArticles();
        Article GetArticleById(int id);
        void CreateArticle(Article article);
        void UpdateArticle(Article article);
        void DeleteArticle(int id);
        IEnumerable<Article> GetArticlesByUserID(string id);

    }
}
