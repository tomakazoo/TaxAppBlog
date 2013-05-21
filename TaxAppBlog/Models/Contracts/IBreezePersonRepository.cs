using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TaxAppBlog.Models.Contracts
{
    public interface IBreezePersonRepository
    {
        IQueryable<Person> People { get; }
        IEnumerable<Person> GetTaxPayers { get; }
        string Metadata();
    }
}
