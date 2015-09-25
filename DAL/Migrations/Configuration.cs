using System;
using System.Data.Entity;
using System.Linq;
using DAL.DomainModel.FeedBackEntities;
using DAL.DomainModel.JournalEntities;

namespace DAL.Migrations
{
    using System.Data.Entity.Migrations;
    using DAL.DomainModel;

    public sealed class Configuration : DbMigrationsConfiguration<DAL.EntityDbContext>
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

            context.FeedbackTypes.AddOrUpdate(
                new FeedbackType() { Id = 1, Label = "���������� ����" },
                new FeedbackType() { Id = 2, Label = "������ ������" },
                new FeedbackType() { Id = 3, Label = "�������� �������������" }
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
                },
                new Product
                {
                    Id = 2,
                    Cost = 200,
                    Label = "�������� �� 2 ������",
                    Currency = "RUB",
                    Lang = "ru-RU",
                },
                new Product
                {
                    Id = 3,
                    Cost = 300,
                    Label = "�������� �� 3 ������",
                    Currency = "RUB",
                    Lang = "ru-RU",
                },
                new Product
                {
                    Id = 4,
                    Cost = 400,
                    Label = "�������� �� 4 ������",
                    Currency = "RUB",
                    Lang = "ru-RU",
                },
                new Product
                {
                    Id = 5,
                    Cost = 500,
                    Label = "�������� �� 5 �������",
                    Currency = "RUB",
                    Lang = "ru-RU",
                },
                new Product
                {
                    Id = 6,
                    Cost = 600,
                    Label = "�������� �� 6 �������",
                    Currency = "RUB",
                    Lang = "ru-RU",
                },
                new Product
                {
                    Id = 7,
                    Cost = 700,
                    Label = "�������� �� 7 �������",
                    Currency = "RUB",
                    Lang = "ru-RU",
                },
                new Product
                {
                    Id = 8,
                    Cost = 800,
                    Label = "�������� �� 8 �������",
                    Currency = "RUB",
                    Lang = "ru-RU",
                },
                new Product
                {
                    Id = 9,
                    Cost = 900,
                    Label = "�������� �� 9 �������",
                    Currency = "RUB",
                    Lang = "ru-RU",
                },
                new Product
                {
                    Id = 10,
                    Cost = 1000,
                    Label = "�������� �� 10 �������",
                    Currency = "RUB",
                    Lang = "ru-RU",
                },
                new Product
                {
                    Id = 11,
                    Cost = 1100,
                    Label = "�������� �� 11 �������",
                    Currency = "RUB",
                    Lang = "ru-RU",
                },
                new Product
                {
                    Id = 12,
                    Cost = 1200,
                    Label = "�������� �� 12 �������",
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
            AddUserIdToJournalMedias(context);
            AddToTape(context);
        }

        private void AddToTape(EntityDbContext context)
        {
            var journals = context.Journals.ToList();
            var achievements = context.Achievements.ToList();
            foreach (var journal in journals)
            {
                var tape = context.Tape.SingleOrDefault(t => t.UserId == journal.UserId 
                                                          && t.JournalId == journal.Id);
                if (tape == null)
                {
                    tape = new DAL.DomainModel.Tape
                    {
                        JournalId = journal.Id,
                        UserId = journal.UserId,
                        Created = journal.Created,
                        Modified = journal.Modified,
                    };
                    context.Tape.Add(tape);
                }
           }
            foreach (var ahievement in achievements)
            {
                var tape = context.Tape.SingleOrDefault(t => t.UserId == ahievement.UserId 
                                                          && t.AchievemetId == ahievement.Id);
                if (tape == null)
                {
                    tape = new DAL.DomainModel.Tape
                    {
                        AchievemetId = ahievement.Id,
                        UserId = ahievement.UserId,
                        Created = ahievement.Created,
                        Modified = ahievement.Modified,
                    };
                    context.Tape.Add(tape);
                }
            }
            context.SaveChanges();
        }

        private void AddUserIdToJournalMedias(EntityDbContext context)
        {
            var journls = context.Set<Journal>()
                .Include(j => j.Media)
                .ToList();

            foreach (var journal in journls)
            {
                foreach (var journalMedia in journal.Media)
                {
                    journalMedia.UserId = journal.UserId;
                }
            }
            context.SaveChanges();
        }
    }
}
