using AutoMapper;
using back_end_app.DTOs;
using back_end_app.Entities;
using back_end_app.Utilities;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace back_end_app.Controllers
{
    [Microsoft.AspNetCore.Mvc.Route("api/actors")]
    [ApiController]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Policy = "IsAdmin")]
    public class ActorsController: ControllerBase
    {
        private readonly ApplicationDbContext context;
        private readonly IMapper mapper;
        private readonly IAzureStorageFiles azureStorageFiles;
        private readonly string container = "actors";

        public ActorsController(ApplicationDbContext context, IMapper mapper, IAzureStorageFiles azureStorageFiles)
        {
            this.context = context;
            this.mapper = mapper;
            this.azureStorageFiles = azureStorageFiles;
        }

        [HttpGet]
        public async Task<ActionResult<List<ActorDTO>>> Get([FromQuery] PaginationDTO paginationDTO)
        {
            var queryable = context.Actors.AsQueryable();
            await HttpContext.InsertPaginationParametersInHeader(queryable);
            var actors = await queryable.OrderBy(x => x.Name).Paginate(paginationDTO).ToListAsync();
            return mapper.Map<List<ActorDTO>>(actors);
        }

        [HttpGet("{Id:int}")]
        public async Task<ActionResult<ActorDTO>> Get(int id)
        {
            var actor = await context.Actors.FirstOrDefaultAsync(x => x.Id == id);
            if (actor == null)
            {
                return NotFound();
            }
            return mapper.Map<ActorDTO>(actor);
        }

        [HttpPost]
        public async Task<ActionResult> Post([FromForm] ActorCreationDTO actorCreationDTO)
        {
            var actor = mapper.Map<Actor>(actorCreationDTO);
            if (actorCreationDTO.Photo != null)
            {
                actor.Photo = await azureStorageFiles.SaveFile(container, actorCreationDTO.Photo);
            }
            context.Add(actor);
            await context.SaveChangesAsync();
            return NoContent();
        }

        [HttpPost("searchByName")]
        public async Task<ActionResult<List<MovieActorDTO>>> SearchByName([FromBody] string name)
        {
            if (string.IsNullOrWhiteSpace(name))
            {
                return new List<MovieActorDTO>();
            }
            return await context.Actors
                .Where(x => x.Name.Contains(name))
                .Select(x => new MovieActorDTO { Id = x.Id, Name = x.Name, Photo = x.Photo })
                .Take(5)
                .ToListAsync();
        }


        [HttpPut("{id:int}")]
        public async Task<ActionResult> Put(int id, [FromForm] ActorCreationDTO actorCreationDTO)
        {
            var actor = await context.Actors.FirstOrDefaultAsync(x => x.Id == id);
            if (actor == null)
            {
                return NotFound();
            }
            actor = mapper.Map(actorCreationDTO, actor);
            if (actorCreationDTO.Photo != null)
            {
                actor.Photo = await azureStorageFiles.EditFile(container, actorCreationDTO.Photo, actor.Photo);
            }
            await context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id:int}")]
        public async Task<ActionResult> Delete(int id)
        {
            var actor = await context.Actors.FirstOrDefaultAsync(x => x.Id == id);
            if (actor == null)
            {
                return NotFound();
            }
            context.Remove(actor);
            await context.SaveChangesAsync();
            await azureStorageFiles.DeleteFile(actor.Photo, container);
            return NoContent();
        }
    }
}
