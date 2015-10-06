using System.ComponentModel;

namespace DAL.DomainModel.EnumProperties
{
    public enum SportExperience
    {
        [Description("������ ����")]
        LessOne,
        [Description("�� 1 �� 2")]
        One,
        [Description("�� 2 �� 3")]
        Two,
        [Description("�� 3 �� 4")]
        Three,
        [Description("�� 4 �� 5")]
        Four,
        [Description("�� 5 �� 7")]
        FiveSeven,
        [Description("�� 7 �� 10")]
        SevenTen,
        [Description("������ 10")]
        MoreTen
    }
}