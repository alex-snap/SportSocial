﻿using System;
using System.ComponentModel.DataAnnotations.Schema;
using DAL.DomainModel.EnumProperties;

namespace DAL.DomainModel
{
    public class Pay: IEntity, IAuditable, IDeletable
    {
        public int Id { get; set; }

        [ForeignKey("AppUser")]
        public string UserId { get; set; }

        public int ProductId { get; set; }

        public PayType PayType { get; set; }

        public decimal Amount { get; set; }

        public int ProductCount { get; set; }

        public PaySatus PaySatus { get; set; }

        public DateTime Created { get; set; }
        public DateTime Modified { get; set; }
        public bool Deleted { get; set; }

        public virtual AppUser User { get; set; }
        public virtual Product Product { get; set; }
    }
}