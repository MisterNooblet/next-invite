import axios from 'axios';
import qs from 'qs';

const sendSMS = async (phone: string, name: string, event: string, date: string, location: string, link: string) => {
  let data = qs.stringify({
    post: '2',
    token: process.env.SMS_API_KEY,
    msg: `Hello ${name}, you have been invited to ${event} in ${location} at ${date} to confirm your attendance please visit this link ${link}`,
    list: `${phone}`,
    from: `EventMgr`,
  });
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'http://www.micropay.co.il/ExtApi/ScheduleSms.php',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: data,
  };
  try {
    const res = await axios(config);
    console.log(res.data);
  } catch (err) {
    console.log(err);
  }
};
export default sendSMS;
