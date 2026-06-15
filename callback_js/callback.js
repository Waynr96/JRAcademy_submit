// Callback
function fetchData(url, callback) {
  console.log(`Fetching data from ${url}...`);
  setTimeout(() => {
    callback(`Data from ${url}`);
  }, 2000);
}

// Promise
fetchData("https://api.example.com", (data) => {
  console.log(data);
});

function fetchData(url) {
  return new Promise((resolve, reject) => {
    console.log(`Fetching data from ${url}...`);
    setTimeout(() => {
      if (!url) {
        reject("Invalid URL");
      } else {
        resolve(`Data from ${url}`);
      }
    }, 2000);
  });
}

// async await
fetchData("https://api.example.com")
  .then((data) => console.log(data))
  .catch((error) => console.error(error));

async function loadData(url) {
  try {
    const data = await fetchData(url);
    console.log(data);
  } catch (error) {
    console.error("Error:", error);
  }
}
