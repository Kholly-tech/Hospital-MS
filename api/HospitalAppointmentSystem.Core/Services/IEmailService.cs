using System.Net;
using System.Net.Mail;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace HospitalAppointmentSystem.Core.Services
{
    // Email Service Interface
    public interface IEmailService
    {
        Task SendEmailAsync(string email, string subject, string message);
    }

    // Email Service Implementation
    public class EmailService : IEmailService
    {
        private readonly IConfiguration _configuration;
        private readonly ILogger _logger;

        public EmailService(IConfiguration configuration, ILogger<EmailService> logger)
        {
            _configuration = configuration;
            _logger = logger;
        }

        public async Task SendEmailAsync(string email, string subject, string message)
        {
            try
            {
                var mailMessage = new MailMessage
                {
                    From = new MailAddress(_configuration["Email:Sender"], 
                                        "Hospital Appointment System"), // Added sender name
                    Subject = subject,
                    Body = message,
                    IsBodyHtml = true,
                    Priority = MailPriority.Normal
                };
                mailMessage.To.Add(new MailAddress(email));

                using (var client = new SmtpClient(_configuration["Email:SmtpServer"]))
                {
                    client.Port = int.Parse(_configuration["Email:Port"]);
                    client.Credentials = new NetworkCredential(
                        _configuration["Email:Username"], 
                        _configuration["Email:Password"]);
                    client.EnableSsl =  true; //bool.Parse(_configuration["Email:EnableSsl"]) || true;
                    client.DeliveryMethod = SmtpDeliveryMethod.Network;
                    client.UseDefaultCredentials = false;

                    // Timeout settings
                    client.Timeout = 10000; // 10 seconds

                    var retryCount = 3;
                    while (retryCount > 0){
                        try{
                            await client.SendMailAsync(mailMessage);
                        _logger.LogInformation($"Email sent to {email}");
                        } catch (Exception ex){
                            retryCount--;
                            await Task.Delay(1000);
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error sending email to {email}");
                throw;
            }
            
        }
    }
}