using System.ComponentModel.DataAnnotations;

namespace BLL.Core.Services.Support.Objects
{
    public class FeedBackModel
    {
        [EmailAddress(ErrorMessage = "������������ ��������� ����������� �����")]
        [Required(ErrorMessage = "������� ����������� �����")]
        public string Email { get; set; }

        [Required(ErrorMessage = "������� ���")]
        public string Name { get; set; }

        [Required(ErrorMessage = "������� �����")]
        public string Text { get; set; }
    }
}