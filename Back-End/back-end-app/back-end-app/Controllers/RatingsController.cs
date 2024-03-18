using back_end_app.DTOs;
using back_end_app.Entities;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace back_end_app.Controllers
{
    [Route("/api/rating")]
    [ApiController]
    public class RatingsController: ControllerBase
    {
        private readonly UserManager<IdentityUser> userManager;
        private readonly ApplicationDbContext context;

        public RatingsController(UserManager<IdentityUser> userManager, ApplicationDbContext context) 
        {
            this.userManager = userManager;
            this.context = context;
        }

        [HttpPost]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<ActionResult> Post([FromBody] RatingDTO ratingDTO)
        {
            var email = HttpContext.User.Claims.FirstOrDefault(x => x.Type == "email").Value;
            var user = await userManager.FindByEmailAsync(email);
            var userId = user.Id;

            var actualRating = await context.Ratings.FirstOrDefaultAsync(x => x.MovieId == ratingDTO.MovieID
                && x.UserId == userId);

            if (actualRating == null)
            {
                var rating = new Rating();
                rating.MovieId = ratingDTO.MovieID;
                rating.Score = ratingDTO.Score;
                rating.UserId = userId;
                context.Add(rating);
            }
            else
            {
                actualRating.Score = ratingDTO.Score;
            }

            await context.SaveChangesAsync();
            return NoContent();
        }
    }
}
