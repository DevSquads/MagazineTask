using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;

namespace EFTest.Models
{
    public class appDBContext : DbContext
    {

        public appDBContext() : base("DefaultConnection")
        {
        }

        public System.Data.Entity.DbSet<EFTest.Models.Article> Articles { get; set; }

        public System.Data.Entity.DbSet<EFTest.Models.Author> Authors { get; set; }
    }
     
}