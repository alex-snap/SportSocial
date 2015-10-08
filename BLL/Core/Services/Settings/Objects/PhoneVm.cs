using System.ComponentModel.DataAnnotations;

namespace BLL.Core.Services.Settings.Objects
{
    public class PhoneVm
    {
        [Required(ErrorMessage = "���������� ������ ����� ��������")]
        [RegularExpression(@"^[0-9]{11,13}$", ErrorMessage = "����� �������� ������ ��������� ������ ����� � ������� <��� ������><�����> ��� ������ \"+\".")]
        public string Phone { get; set; }
    }
}