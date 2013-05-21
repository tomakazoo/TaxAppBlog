using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Breeze.WebApi;
using Newtonsoft.Json.Linq;
using TaxAppBlog.Models.Contracts;

namespace TaxAppBlog.Models.Implementations
{
    public class BreezeDeclarationRepository : IBreezeDeclarationRepository
    {
        readonly EFContextProvider<TaxEntities> _contextProvider =
    new EFContextProvider<TaxEntities>();

        public IQueryable<Declaration> Declarations
        {
            get { return _contextProvider.Context.Declarations; }
        }

        public string Metadata()
        {
            return _contextProvider.Metadata();
        }

        public SaveResult SaveChanges(JObject saveBundle)
        {
            return _contextProvider.SaveChanges(saveBundle);
        }
    }
}