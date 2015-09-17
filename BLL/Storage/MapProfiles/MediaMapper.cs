﻿using BLL.Common.Helpers;
using BLL.Rating;
using BLL.Social.Journals.Objects;
using BLL.Storage.Objects;
using DAL.DomainModel.Base;
using DAL.DomainModel.Interfaces;

namespace BLL.Storage.MapProfiles
{
    public class MediaMapper: MapperBase
    {
        public static MediaVm Map<T>(MediaBase<T> media) where T : IEntity
        {
            if (media == null)
                return null;
            var result =  new MediaVm
            {
                Id = media.Id,
                Url = media.Url,
                Type = (MediaType) media.Type
            };
            if (result.Type == MediaType.Video)
            {
                result.EmbeddedUrl = YoutubeUrlHelper.EmbeddedYoutubeUrl(media.Url);
                result.RemoteId = YoutubeUrlHelper.VideoId(media.Url);
                result.RemoteUrl = media.Url;
            }
            return result;
        }
    }
}