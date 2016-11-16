using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;

namespace OperasWebSite.Models
{
    public class OperasDB : DbContext
    {
        public OperasDB() : base()
        {
            this.Database.CommandTimeout = 180;
        }

        public DbSet<Opera> Operas { get; set; }
    }
}