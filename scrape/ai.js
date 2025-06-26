export async function AI(content) {
  const body = {
    messages: [
      {role: "user", content: content}
    ]
  };

  const fetchRes = await fetch("https://ai.hackclub.com/chat/completions", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  const data = await fetchRes.json();

  const aiRes = data.choices[0].message.content;

  return aiRes;
}