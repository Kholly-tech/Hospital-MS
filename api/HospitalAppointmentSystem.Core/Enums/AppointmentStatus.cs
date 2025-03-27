namespace HospitalAppointmentSystem.Core.Enums
{
    public enum AppointmentStatus
    {
        Pending,
        Approved,
        Rejected,
        Completed,
        Cancelled
    }

    public static class NewStatus
    {
        public const string Pending = "pending";
        public const string Approved = "approved";
        public const string Rejected = "rejected";
        public const string Completed = "completed";
        public const string Cancelled = "cancelled";
    }
}