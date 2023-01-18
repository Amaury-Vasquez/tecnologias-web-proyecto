export async function get() {
  const response = await fetch('http://localhost:5000/hello.php');
  const data = await response.json();
  console.log(data);
}

export async function sendData(data) {
  const response = await fetch('http://localhost:5000/send_data.php', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
  });
  return await response.json();
}

export async function consultData(curp) {
  const response = await fetch('http://localhost:5000/consult.php', {
    method: 'POST',
    body: JSON.stringify({ curp }),
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
  });
  return await response.json();
}

export async function sendEmail(data) {
  await fetch('http://localhost:5000/mail.php', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
  });
}
