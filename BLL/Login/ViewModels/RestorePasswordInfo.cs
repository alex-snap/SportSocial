using System.ComponentModel.DataAnnotations;

namespace BLL.Login.ViewModels
{
    public class RestorePasswordInfo
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
    }
}