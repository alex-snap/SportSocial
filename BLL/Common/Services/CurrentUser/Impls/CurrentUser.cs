﻿using System.Data.Entity;
using System.Linq;
using System.Web;
using BLL.Common.Helpers;
using BLL.Infrastructure.IdentityConfig;
using DAL.DomainModel;
using DAL.Repository.Interfaces;
using Microsoft.AspNet.Identity;

namespace BLL.Common.Services.CurrentUser.Impls
{
    public class CurrentUser: ICurrentUser
    {
        private readonly IRepository _repository;

        public CurrentUser(IRepository repository)
        {
            _repository = repository;
            int userId = HttpContext.Current.User.Identity.GetUserId<int>();
            User = _repository
                .Queryable<AppUser>()
                .Include(u => u.Profile)
                .SingleOrDefault(u => u.Id == userId);
        }

        private AppUser _user;

        public string UserName
        {
            get { return User.Name; }
        }

        public string Phone
        {
            get { return HttpContext.Current.User.Identity.GetUserName(); }
        }

        public bool IsAnonimous
        {
            get { return !HttpContext.Current.User.Identity.IsAuthenticated; }
        }

        public bool IsPaid
        {
            get
            {
                if (User != null)
                    return User.Profile.IsPaid;
                else
                    return false;
            }
        }

        public bool IsAdmin
        {
            get { return IsInRole("Admin"); }
        }

        public bool IsInRole(string role)
        {
            return HttpContext.Current.User.IsInRole(role);
        }

        public int UserId
        {
            get
            {
                return HttpContext.Current.User.Identity.GetUserId<int>();
            }
        }

        public AppUser User { get; private set; }
        //{
        //    get
        //    {
        //        if (_user != null)
        //            return _user;
        //        _user = _repository.Find<AppUser>(HttpContext.Current.User.Identity.GetUserId());
        //        return _user;
        //    }
        //}

        public int UnreadedNews
        {
            get { return ApplicationStateHelper.NewsCount - SessionStateHelper.GetReadedNews(); }
        }
    }
}