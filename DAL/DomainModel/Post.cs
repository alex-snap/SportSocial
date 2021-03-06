﻿using System;
using System.ComponentModel.DataAnnotations.Schema;
using DAL.DomainModel.Base;

namespace DAL.DomainModel
{
    public class Post: IEntity, IAuditable, ICultrureSpecific
    {
        public int Id { get; set; }

        public string UserId { get; set; }

        public string Title { get; set; }

        public string Text { get; set; }

        public string RubricId { get; set; }

        public string Lang { get; set; }

        public DateTime Created { get; set; }
        public DateTime Modified { get; set; }

        public Rubric Rubric { get; set; }
        public virtual AppUser User { get; set; }
    }
}