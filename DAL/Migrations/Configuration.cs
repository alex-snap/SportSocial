using System;

namespace DAL.Migrations
{
    using System.Data.Entity.Migrations;
    using DAL.DomainModel;

    internal sealed class Configuration : DbMigrationsConfiguration<DAL.EntityDbContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(DAL.EntityDbContext context)
        {
            context.Rubrics.AddOrUpdate(
                new Rubric() { Id = 1, Name = "��������" },
                new Rubric() { Id = 2, Name = "���������" },
                new Rubric() { Id = 3, Name = "�������" },
                new Rubric() { Id = 4, Name = "�����" },
                new Rubric() { Id = 5, Name = "�������" },
                new Rubric() { Id = 6, Name = "� ���� ������" },
                new Rubric() { Id = 7, Name = "����������" },
                new Rubric() { Id = 8, Name = "��������" }
            );

            context.Roles.AddOrUpdate(
                new AppRole("Moderator") { Id = 1 },
                new AppRole("Admin") { Id = 2 },
                new AppRole("Root") { Id = 3 },
                new AppRole("User") { Id = 4 }
            );

            context.Products.AddOrUpdate(
                new Product
                {
                    Id = 1,
                    Cost = 100,
                    Label = "�������� �� �����",
                    Currency = "RUB",
                    Lang = "ru-RU",
                }
            );
            //  This method will be called after migrating to the latest version.

            //  You can use the DbSet<T>.AddOrUpdate() helper extension method 
            //  to avoid creating duplicate seed data. E.g.
            //
            //    context.People.AddOrUpdate(
            //      p => p.FullName,
            //      new Person { FullName = "Andrew Peters" },
            //      new Person { FullName = "Brice Lambson" },
            //      new Person { FullName = "Rowan Miller" }
            //    );
            //
        }
    }
}
