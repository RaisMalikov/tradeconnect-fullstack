export async function sendEmail(
  to: string,
  subject: string,
  text: string,
  title?: string,
  buttonText?: string,
  buttonUrl?: string
) {
  await fetch(
    "https://frwuyxtccadyrdnwotvo.functions.supabase.co/send-email",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to,
        subject,
        text,
        title,
        buttonText,
        buttonUrl,
      }),
    }
  );
}