package com.example.project.backend.services.mailing;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class MailService {
    @Autowired
    private JavaMailSender mailSender;

    public void sendConferenceVerificationEmail(String toEmail, String participantName,String ConferenceName) {
        MimeMessage message = mailSender.createMimeMessage();

        try {
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            helper.setTo(toEmail);
            helper.setSubject("🎉 Congratulations! You've Been Accepted to the Conference");
            String htmlContent = """
    <html>
    <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
        <div style="background-color: #ffffff; padding: 30px; border-radius: 10px; max-width: 600px; margin: auto; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);">
            <h2 style="color: #27ae60;">🎉 Congratulations!</h2>
            <p style="font-size: 16px; color: #333;">Hello <strong>%s</strong>,</p>
            <p style="font-size: 16px; color: #333;">
                We are thrilled to inform you that you have been <strong>accepted</strong> to participate in our <strong>%s</strong> conference.
            </p>
            <p style="font-size: 16px; color: #333;">
                We look forward to your valuable participation!
            </p>
            <p style="font-size: 16px; color: #555;">Best regards,<br>The Conference Team</p>
        </div>
    </body>
    </html>
""".formatted(participantName,ConferenceName);


            helper.setText(htmlContent, true); // Enable HTML content
            mailSender.send(message);

        } catch (MessagingException e) {
            throw new RuntimeException("Failed to send verification email", e);
        }
    }
}
