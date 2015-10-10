using System;
using System.ComponentModel.DataAnnotations;
using DAL.DomainModel.EnumProperties;
using Knoema.Localization;

namespace BLL.Login.ViewModels
{
    public class RegistrationConfirm : RegistrationBase
    {
        public int? ImgId { get; set; }
    }

    [Localized]
    public class ConfirmSmsCode: RegistrationConfirm
    {
        [Required]
        public string Phone { get; set; }

        [Required(ErrorMessage = "���������� ������ ���")]
        public string Code { get; set; }

        [Required(ErrorMessage = "���������� ������ ������")]
        [StringLength(30, MinimumLength = 6, ErrorMessage = "������ ������ ���� �� ����� 6 ��������")]
        public string Password { get; set; }

        [Required(ErrorMessage = "���������� ������ ������������� ������")]
#pragma warning disable 618
        [System.Web.Mvc.Compare("Password", ErrorMessage = "������ �� ���������")]
#pragma warning restore 618
        public string PasswordRepeat { get; set; }
    }
}