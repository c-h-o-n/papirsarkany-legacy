import app from './app';
import * as mailService from './mail/mail.service';

const { SENDGRID_API_KEY } = process.env;
const port = process.env.PORT || 5000;

mailService.setSendGridApiKey(SENDGRID_API_KEY);

app.listen(port, () => {
  console.log(`Listening: http://localhost:${port}`);
});
