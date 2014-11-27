using System.ComponentModel.DataAnnotations;
using Knoema.Localization;

namespace BLL.Login.ViewModels
{
    [Localized]
    public class RegistratioinModel
    {
        [Required(ErrorMessage = "�� ������ ����� ��������")]
        [RegularExpression(@"^[0-9]*$", ErrorMessage = "����� �������� ������ ��������� ������ ����� ��� ������ \"+\".")]
        public string Phone { get; set; }

        [Required(ErrorMessage = "�� ������� ���")]
        public string Name { get; set; }
    }
}