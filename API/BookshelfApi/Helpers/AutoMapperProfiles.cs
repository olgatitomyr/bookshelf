using AutoMapper;
using BookshelfApi.Dtos;
using BookshelfApi.Models;

namespace BookshelfApi.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<UserForRegisterDto, User>();
        }
    }
}
