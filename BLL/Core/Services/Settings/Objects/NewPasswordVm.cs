using System.ComponentModel.DataAnnotations;

namespace BLL.Core.Services.Settings.Objects
{
    public class NewPasswordVm
    {
        [Required(ErrorMessage = "���������� ������ ������ ������")]
        public string OldPassword { get; set; }

        [Required(ErrorMessage = "���������� ������ ����� ������")]
        [StringLength(30, MinimumLength = 6, ErrorMessage = "������ ������ ���� �� ����� 6 ��������")]
        public string NewPassword { get; set; }

        [Required(ErrorMessage = "���������� ������ ������������� ������")]
#pragma warning disable 618
        [System.Web.Mvc.Compare("New", ErrorMessage = "������ �� ���������")]
#pragma warning restore 618
            public string NewRepeatPassword { get; set; }

    }
}