using System.ComponentModel.DataAnnotations;
using Knoema.Localization;

namespace SportSocial.Models
{
    [Localized]
    public class RegistratioinModel
    {
        [Required(ErrorMessage = "�� ������ ����� ��������")]
        public string Phone { get; set; }

        [Required(ErrorMessage = "�� ������� ���")]
        public string Name { get; set; }
    }
}