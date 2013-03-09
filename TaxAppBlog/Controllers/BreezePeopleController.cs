using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Breeze.WebApi;
using TaxAppBlog.Models;
using TaxAppBlog.Models.Contracts;

namespace TaxAppBlog.Controllers
{
    [BreezeController]
    public class BreezePeopleController : ApiController
    {
        IBreezePersonRepository repository;
        public BreezePeopleController(IBreezePersonRepository repository)
        {
            this.repository = repository;
        }

        public IQueryable<Person> GetPeople()
        {
            return repository.People;
        }

        // ~/api/BreezePeople/Metadata 
        [HttpGet]
        public string Metadata()
        {
            return repository.Metadata();
        }
    }
}
