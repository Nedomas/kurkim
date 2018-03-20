import fetch from 'node-fetch';

export default async (event) => {
  const url = `https://api.mailerlite.com/api/v2/groups/${process.env.MAILERLITE_GROUP_ID}/subscribers`;
  const result = await fetch(url, {
    method: 'POST',
    body: JSON.stringify({
      name: event.data.firstName,
      email: event.data.email,
    }),
    headers: {
      'Content-Type': 'application/json'
      'X-MailerLite-ApiKey': process.env.MAILERLITE_API_KEY,
    },
  }).then(res => res.json());

  return {
    data: result,
  };
}
