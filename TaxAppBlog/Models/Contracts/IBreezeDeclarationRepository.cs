using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Breeze.WebApi;
using Newtonsoft.Json.Linq;

namespace TaxAppBlog.Models.Contracts
{
    public interface IBreezeDeclarationRepository
    {
        IQueryable<Declaration> Declarations { get; }
        string Metadata();
        SaveResult SaveChanges(JObject saveBundle);
    }
}
