using System.ComponentModel.DataAnnotations;

namespace BLL.Login.ViewModels
{
    public class ChangePhoneModel
    {
        [Required(ErrorMessage = "���������� ������ ����� ��������")]
        public string Phone { get; set; }

        [Required(ErrorMessage = "���������� ������ ��� �������������")]
        public string Code { get; set; }
    }
}