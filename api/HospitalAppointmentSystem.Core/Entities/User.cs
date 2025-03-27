namespace HospitalAppointmentSystem.Core
{
    public abstract class User
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string? PhoneNumber { get; set; }
        public DateTime DateOfBirth { get; set; }
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