﻿using System;
using System.Linq;
using AutoMapper;
using BLL.Comments.MapProfiles;
using BLL.Rating;
using BLL.Social.Achievements.Objects;
using BLL.Social.Journals.Objects;
using BLL.Storage.MapProfiles;
using DAL;
using DAL.DomainModel.Achievement;
using DAL.DomainModel.Base;
using DAL.DomainModel.EnumProperties;

namespace BLL.Social.Achievements
{
    public class AchievementMapProfile: Profile
    {
        protected override void Configure()
        {
            CreateMap<Achievement, AchievementCreateVm>()
                .ForMember(dest => dest.Step, opt => opt.MapFrom(src => src.Step))
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.Type, opt => opt.MapFrom(src => src))
                .ForMember(dest => dest.Video,
                    opt => opt.MapFrom(src => MediaMapper.Map(src.AchievementMedia.FirstOrDefault())));

            CreateMap<Achievement, ChoosedAchievmentType>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.AchievementType.Id))
                .ForMember(dest => dest.Value, opt => opt.MapFrom(src => Convert.ToInt32(src.Value)));;

            CreateMap<AchievementType, AchievementTypeVm>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.Img, opt => opt.MapFrom(src => src.ImgUrl))
                .ForMember(dest => dest.Title, opt => opt.MapFrom(src => src.Title))
                .ForMember(dest => dest.Values, opt => opt.MapFrom(src => src.GetValues()));

            CreateMap<Achievement, AchievementPreviewVm>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.Created, opt => opt.MapFrom(src => src.Created))
                .ForMember(dest => dest.CupImage, opt => opt.MapFrom(src => src.AchievementType.ImgUrl))
                .ForMember(dest => dest.Title, opt => opt.MapFrom(src => src.AchievementType.Title))
                .ForMember(dest => dest.Author, opt => opt.MapFrom(src => src.User))
                .ForMember(dest => dest.Timestamp, opt => opt.MapFrom(src => src.DurationDays * - (DateTime.Now - src.Started).Value.Days))
                .ForMember(dest => dest.Voice, opt => opt.MapFrom(src => src));

            CreateMap<Achievement, AchievementDisplayVm>()
                .IncludeBase<Achievement, AchievementPreviewVm>()
                .ForMember(dest => dest.Likes, opt => opt.MapFrom(src => RatingMapper.MapRating(src)))
                .ForMember(dest => dest.Comments, opt => opt.MapFrom(src => CommentsVmMapper.Map(src)))
                .ForMember(dest => dest.Status, opt => opt.MapFrom(src => src.GetStatus()));

            //CreateMap<AchievementCreateVm, Achievement>()
            //    //.ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
            //    .ForMember(dest => dest.Step, opt => opt.MapFrom(src => src.HasVideo() ? 2 : 1))
            //    .ForMember(dest => dest.Status, opt => opt.MapFrom(src => AchievementStatus.InCreating))
            //    .ForMember(dest => dest.Status, opt => opt.MapFrom(src => AchievementStatus.InCreating))

            CreateMap<Achievement, AchievmentVoiceVm>()
                .ForMember(dest => dest.For, opt => opt.MapFrom(src => src.Voices.Count(r => r.VoteFor)))
                .ForMember(dest => dest.Against, opt => opt.MapFrom(src => src.Voices.Count(r => !r.VoteFor)));
        }
    }
}