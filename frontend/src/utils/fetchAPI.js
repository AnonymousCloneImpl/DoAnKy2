const fetcher = (url) => fetch(url).then(async (res) => {
  try {
    const json = await res.json();
    return json;
  } catch (e) {
    return {};
  }
});

export default fetcher;
