using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EFTest.Models
{
    public class Author
    {
        public int ID { get; set; }
        public string Name { get; set; }

        public virtual ICollection<Article> Articles { get; set; }
    }
}