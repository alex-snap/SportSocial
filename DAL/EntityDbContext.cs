﻿using System.Data.Entity;
using DAL.DomainModel;
using Microsoft.AspNet.Identity.EntityFramework;
using Ninject.Activation;

namespace DAL
{
    public class EntityDbContext: IdentityDbContext<AppUser>
    {
    #if DEBUG 
        public EntityDbContext() : base("EntityDbContextDebug")
        {
        }
    #endif
    #if !DEBUG 
        public EntityDbContext() : base("EntityDbContextRelease")
        {
        }
    #endif
        public DbSet<SmsCode> SmsCodes { get; set; }
        public DbSet<Post> Posts { get; set; }
        public DbSet<Rubric> Rubrics { get; set; }
        public DbSet<Pay> Pays { get; set; }
        public DbSet<Profile> Profiles { get; set; }
        public DbSet<BlogImage> BlogImages { get; set; }

        static EntityDbContext()
        {
            Database.SetInitializer(new DbInit());
        }

        public static EntityDbContext Create(IContext context)
        {
            return new EntityDbContext();
        }
    }

    public class DbInit: CreateDatabaseIfNotExists<EntityDbContext>
    {
        protected override void Seed(EntityDbContext context)
        {
            InitSetup(context);
            base.Seed(context);
        }

        private void InitSetup(EntityDbContext context)
        {
            //throw new System.NotImplementedException();
        }
    }
}