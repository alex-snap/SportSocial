﻿using AutoMapper;
using BLL.Comments.Objects;
using BLL.Login.Impls;
using DAL.DomainModel.ConferenceEntities;

namespace BLL.Comments.MapProfiles
{
    public class ConferenceCommentsProfile: Profile
    {
        protected override void Configure()
        {
            //CreateMap<ConferenceComment, Comment>()
            //    .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
            //    .ForMember(dest => dest.Avatar, opt => opt.MapFrom(src => src.ByFortress ? LoginService.DefaultFortressAvatar : src.User.Profile.Avatar))
            //    .ForMember(dest => dest.Date, opt => opt.MapFrom(src => src.Created.ToString()))
            //    .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.ByFortress ? "Fortress" : src.User.Name))
            //    .ForMember(dest => dest.CommentFor,
            //            opt => opt.MapFrom(src => src.CommentForId.HasValue ? new CommentFor()
            //                {
            //                    Id = src.CommentForId.Value,
            //                    Name = src.CommentFor.ByFortress ? "Fortress" : src.CommentFor.User.Name,
            //                }
            //                : null))
            //    .ForMember(dest => dest.Text, opt => opt.MapFrom(src => src.Text));
        }
    }
}