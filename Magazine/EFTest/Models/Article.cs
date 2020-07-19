using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace EFTest.Models
{
    public class Article
    {
        public int ID { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
       
        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString ="{0:dd/MM/yyyy}", ApplyFormatInEditMode =true)]
        public DateTime? Publishedon { get; set; }
       
        public int AuthorID { get; set; }
        public  virtual Author author { get; set; }
    }
}