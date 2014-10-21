using System.ComponentModel.DataAnnotations;
using Knoema.Localization;

namespace SportSocial.Models
{
    [Localized]
    public class SignInModel
    {
        [Required(ErrorMessage = "�� ������ ����� ��������")]
        public string Phone { get; set; }

        [Required(ErrorMessage = "�� ������ ������")]
        public string Pass { get; set; }
    }
}