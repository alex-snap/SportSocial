using System.ComponentModel;
using Knoema.Localization;

namespace DAL.DomainModel.EnumProperties
{
    public enum Sex
    {
        [Description("���")]
        Male = 1,
        [Description("���")]
        Female = 2
    }
}