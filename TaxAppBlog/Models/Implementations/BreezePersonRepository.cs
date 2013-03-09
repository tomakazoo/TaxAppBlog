using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Breeze.WebApi;
using TaxAppBlog.Models.Contracts;


namespace TaxAppBlog.Models.Implementations
{
    public class BreezePersonRepository : IBreezePersonRepository
    {
        readonly EFContextProvider<TaxEntities> _contextProvider =
            new EFContextProvider<TaxEntities>();
        public IQueryable<Person> People
        {
            get { return _contextProvider.Context.People; }
        }

        public string Metadata()
        {
            return _contextProvider.Metadata();
        }
    }
}