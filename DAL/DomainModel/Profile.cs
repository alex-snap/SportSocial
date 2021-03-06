﻿using System.ComponentModel.DataAnnotations.Schema;
using DAL.DomainModel.Base;

namespace DAL.DomainModel
{
    public class Profile: ICultrureSpecific
    {
        [ForeignKey("AppUser")]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public string Id { get; set; }

        public string Lang { get; set; }

        public virtual AppUser AppUser { get; set; }
    }
}