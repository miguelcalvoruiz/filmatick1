using AutoMapper;
using back_end_app.DTOs;
using back_end_app.Entities;
using back_end_app.Utilities;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace back_end_app.Controllers
{
    [ApiController]
    [Route("api/cinemas")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Policy = "IsAdmin")]
    public class CinemasController: ControllerBase
    {
        private readonly ApplicationDbContext context;
        private readonly IMapper mapper;

        public CinemasController(ApplicationDbContext context, IMapper mapper) 
        {
            this.context = context;
            this.mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<List<CinemaDTO>>> Get([FromQuery] PaginationDTO paginationDTO)
        {
            var queryable = context.Cinema.AsQueryable();
            await HttpContext.InsertPaginationParametersInHeader(queryable);
            var cinemas = await queryable.OrderBy(x => x.Name).Paginate(paginationDTO).ToListAsync();
            return mapper.Map<List<CinemaDTO>>(cinemas);
        }

        [HttpGet("{Id:int}")]
        public async Task<ActionResult<CinemaDTO>> Get(int id)
        {
            var cinema = await context.Cinema.FirstOrDefaultAsync(x => x.Id == id);
            if (cinema == null)
            {
                return NotFound();
            }
            return mapper.Map<CinemaDTO>(cinema);
        }

        [HttpPost]
        public async Task<ActionResult> Post([FromBody] CinemaCreationDTO cinemaCreationDTO)
        {
            var cinema = mapper.Map<Cinema>(cinemaCreationDTO);
            context.Add(cinema);
            await context.SaveChangesAsync();
            return NoContent();
        }

        [HttpPut("{id:int}")]
        public async Task<ActionResult> Put(int id, [FromBody] CinemaCreationDTO cinemaCreationDTO)
        {
            var cinema = await context.Cinema.FirstOrDefaultAsync(x => x.Id == id);
            if (cinema == null)
            {
                return NotFound();
            }
            cinema = mapper.Map(cinemaCreationDTO, cinema);
            await context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id:int}")]
        public async Task<ActionResult> Delete(int id)
        {
            var exits = await context.Cinema.AnyAsync(x => x.Id == id);
            if (!exits)
            {
                return NotFound();
            }
            context.Remove(new Cinema() { Id = id });
            await context.SaveChangesAsync();
            return NoContent();
        }
    }
}
