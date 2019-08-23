export default function getToken(): string {
  const token = localStorage.getItem('id_token');
  if (!token) {
    return null;
  }

  console.log("token: ", token);

  return token.split(' ')[1];
}

