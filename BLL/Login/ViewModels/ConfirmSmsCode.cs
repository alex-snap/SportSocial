using System;
using System.ComponentModel.DataAnnotations;
using DAL.DomainModel.EnumProperties;
using Knoema.Localization;

namespace BLL.Login.ViewModels
{
    [Localized]
    public class ConfirmSmsCode
    {
        [Required(ErrorMessage = "���������� ������ ���")]
        [StringLength(4, MinimumLength = 4, ErrorMessage = "��� ������ ��������� 4 �������")]
        public string Code { get; set; }

        [Required(ErrorMessage = "���������� ������ ������")]
        [StringLength(30, MinimumLength = 6, ErrorMessage = "������ ������ ���� �� ����� 6 ��������")]
        public string Password { get; set; }

        [Required(ErrorMessage = "���������� ������ ������������� ������")]
        [System.Web.Mvc.Compare("Password", ErrorMessage = "������ �� ���������")]
        public string PasswordRepeat { get; set; }

        [Required]
        public string Phone { get; set; }

        [Required(ErrorMessage = "�� ������� ���")]
        public string Name { get; set; }

        [Required(ErrorMessage = "�� ������� �������")]
        public string LastName { get; set; }

        [Required(ErrorMessage = "�� ������� ���� ��������")]
        public DateTime BirthDay { get; set; }

        [Required(ErrorMessage = "�� ������ ���")]
        public Sex Gender { get; set; }

        [Required(ErrorMessage = "�� ������ ����")]
        public SportExperience SportTime { get; set; }
    }
}