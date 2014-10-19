using System.ComponentModel.DataAnnotations;

namespace SportSocial.Models
{
    public class SignInModel
    {
        [Required(ErrorMessage = "�� ������ ����� ��������")]
        public string Phone { get; set; }

        [Required(ErrorMessage = "�� ������ ������")]
        public string Pass { get; set; }
    }
}