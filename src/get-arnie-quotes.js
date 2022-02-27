const { httpGet } = require('./mock-http-interface');

const getArnieQuotes = async (urls) => {
  try {
    return (await Promise.all(urls.map((url) => httpGet(url)))).map(
      ({ status, body }) => {
        const content = JSON.parse(body);
        if (status >= 200 && status < 300) {
          return { ["Arnie Quote"]: content.message };
        }

        return { FAILURE: content.message };
      }
    );
  } catch (error) {
    console.error(error.message);
    return { FAILURE: error.message };
  }
};

module.exports = {
  getArnieQuotes,
};
