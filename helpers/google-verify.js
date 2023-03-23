

const {OAuth2Client} = require('google-auth-library');
const googleId = process.env.GOOGLE_CLIENT_ID;

const client = new OAuth2Client(googleId);

async function googleverify(token = '') {
  const ticket = await client.verifyIdToken({
      idToken: token,
      audience: googleId,  // Specify the CLIENT_ID of the app that accesses the backend
      // Or, if multiple clients access the backend:
      //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
  });
  const { name, picture, email } = ticket.getPayload();

  return {
    nombre: name, 
    img: picture, 
    eMail: email,
    google: true,
  }
 
}
// verify().catch(console.error);

module.exports = {
    googleverify
}