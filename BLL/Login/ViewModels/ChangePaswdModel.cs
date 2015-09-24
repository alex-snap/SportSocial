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
#pragma warning disable 618
        [System.Web.Mvc.Compare("New", ErrorMessage = "������ �� ���������")]
#pragma warning restore 618
        public string ConfirmNew { get; set; }
    }
}