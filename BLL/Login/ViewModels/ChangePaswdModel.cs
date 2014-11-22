using System.ComponentModel.DataAnnotations;

namespace BLL.Login.ViewModels
{
    public class ChangePaswdModel
    {
        [Required(ErrorMessage = "���������� ������ ������ ������")]
        public string Old { get; set; }

        [Required(ErrorMessage = "���������� ������ ����� ������")]
        [StringLength(30, MinimumLength = 6, ErrorMessage = "������ ������ ���� �� ����� 6 ��������")]
        public string New { get; set; }

        [Required(ErrorMessage = "���������� ������ ������������� ������")]
        [System.Web.Mvc.Compare("New", ErrorMessage = "������ �� ���������")]
        public string ConfirmNew { get; set; }
    }
}