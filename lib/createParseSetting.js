// Function to create parse setting
async function createParseSetting() {
  const request = {
    method: "POST",
    url: "/v3/user/webhooks/parse/settings",
    body: {
      hostname: "readybook.app",
      url: "https://inbound.readybook.app/", // Change this to your Next.js API route
      spam_check: true,
    },
  };
  console.log(request);

  try {
    const [response, _] = await sgClient.request(request);
    console.log(response.body);
  } catch (error) {
    console.error(error.response.body);
  }
}
