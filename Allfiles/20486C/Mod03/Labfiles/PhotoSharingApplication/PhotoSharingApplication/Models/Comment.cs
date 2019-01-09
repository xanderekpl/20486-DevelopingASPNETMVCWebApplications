using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace PhotoSharingApplication.Models
{
    public class Comment
    {
        public int CommentID { get; set; }
        public int PhotoID { get; set; }
        [Required]
        [StringLength(250)]
        public string UserName { get; set; }
        [DataType(DataType.MultilineText)]
        public string Subject { get; set; }
        public string Body { get; set; }
        public virtual Photo Photo { get; set; }
    }
}