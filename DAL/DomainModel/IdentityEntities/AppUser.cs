﻿using System;
using System.Collections.Generic;
using DAL.DomainModel.BlogEntities;
using DAL.DomainModel.ConferenceEntities;
using DAL.DomainModel.Interfaces;
using Microsoft.AspNet.Identity.EntityFramework;

namespace DAL.DomainModel
{
    public class AppUser: IdentityUser<int, AppUserLogin, AppUserRole, AppUserClaim>, IAuditable
    {
        public string Name { get; set; }

        public virtual Profile Profile { get; set; }

        public virtual ICollection<SmsCode> SmsCodes{ get; set; }

        public virtual ICollection<UserPhoto> UserPhotos { get; set; }

        public virtual ICollection<BlogComment> BlogComments { get; set; }

        public virtual ICollection<ConferenceComment> ConferenceComments { get; set; }

        public virtual ICollection<Post> Posts { get; set; }

        public virtual ICollection<UserAvatarPhoto> UserAvatarPhotos { get; set; }

        public virtual ICollection<Pay> Pays { get; set; }

        public DateTime Created { get; set; }

        public DateTime Modified { get; set; }
    }

    public class AppUserClaim: IdentityUserClaim<int> { }

    public class AppUserLogin: IdentityUserLogin<int> { }
}