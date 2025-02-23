const templates = {
    Letter: `<p>Dear [Recipient],</p><p>I hope this letter finds you well. I am writing to [reason for letter].</p><p>Sincerely,<br>[Your Name]</p>`,
    Application: `<p>To,<br>[Recipient Name]<br>[Company/Institution]</p><p>Subject: Application for [Position/Reason]</p><p>Respected Sir/Madam,</p><p>I am writing to apply for [details]. I have attached my [resume/documents] for your reference.</p><p>Thank you for your time.</p><p>Regards,<br>[Your Name]</p>`,
    Invoice: `<p>Invoice #12345</p><p>Date: [Date]</p><p>Bill To: [Client Name]</p><p>Amount Due: $[Amount]</p><p>Thank you for your business!</p>`
};

export default templates;
