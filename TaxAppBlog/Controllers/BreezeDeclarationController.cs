using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Breeze.WebApi;
using Newtonsoft.Json.Linq;
using TaxAppBlog.Models;
using TaxAppBlog.Models.Contracts;

namespace TaxAppBlog.Controllers
{
    [BreezeController]
    public class BreezeDeclarationController : ApiController
    {
        IBreezeDeclarationRepository repository;
        public BreezeDeclarationController(IBreezeDeclarationRepository repository)
        {
            this.repository = repository;
        }

        public IQueryable<Declaration> GetDeclarations()
        {
            return repository.Declarations;
        }

        // ~/api/BreezePeople/Metadata 
        [HttpGet]
        public string Metadata()
        {
            return repository.Metadata();
        }

        [HttpPost]
        public SaveResult SaveChanges(JObject saveBundle)
        {
            return repository.SaveChanges(saveBundle);
        }

    }
}
