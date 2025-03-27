using System.ComponentModel.DataAnnotations;

namespace HospitalAppointmentSystem.Core
{
    public abstract class User
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "First Name is required")]
        public string FirstName { get; set; }

        [Required(ErrorMessage = "Last Name is required")]
        public string LastName { get; set; }

        [Required(ErrorMessage = "Email is required")]
        [EmailAddress(ErrorMessage = "Enter a valid email address")]
        public string Email { get; set; }
        public string? PhoneNumber { get; set; }
        public DateTime DateOfBirth { get; set; }

        [Required(AllowEmptyStrings = false, ErrorMessage = "Password field is required")]
        [MinLength(4, ErrorMessage = "Password must be minimum of 4 characters")]
        public string password { get; set; }

        // public User(string firstName, string lastName, string email)
        // {
        //     if (string.IsNullOrEmpty(firstName))
        //         throw new ArgumentNullException(nameof(firstName), "First name cannot be null or empty");
            
        //     if (string.IsNullOrEmpty(lastName))
        //         throw new ArgumentNullException(nameof(lastName), "Last name cannot be null or empty");
            
        //     if (string.IsNullOrEmpty(email))
        //         throw new ArgumentNullException(nameof(email), "Email Address cannot be null or empty");
            
        //     FirstName = firstName;
        //     LastName = lastName;
        //     Email = email;
        // }
    }
}