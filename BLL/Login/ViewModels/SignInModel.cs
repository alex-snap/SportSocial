using System.ComponentModel.DataAnnotations;
using Knoema.Localization;

namespace BLL.Login.ViewModels
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