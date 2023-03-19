import client, { MailDataRequired } from '@sendgrid/mail';
import { OrderMail } from './mail.modal';

export function setSendGridApiKey(apiKey: string | undefined) {
  try {
    client.setApiKey(apiKey!);
  } catch (error) {
    console.log(error);
  }
}

// LATER implement as middleware
export function sendMail(to: string, json: OrderMail) {
  const message: MailDataRequired = {
    to,
    from: 'mail@papirsarkany.hu',
    templateId: 'd-6eee94a3becb45d2b50e5f8d6a1ac491',
    dynamicTemplateData: json,
  };

  client
    .send(message)
    .then(() => {
      console.log(`Email is sent to ${to}`);
    })
    .catch((error: any) => {
      console.error(error);
    });
}
