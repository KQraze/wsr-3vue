import { reactive } from "vue";

export const headers = reactive({
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "no-cors",
  Authorization: `Bearer`,
});

const fetchInstance = async (url, options) => {
  let data = null;
  let response = null;
  let status = null;

  try {
    response = await fetch(`http://jztcjyj-m2.wsr.ru/api/${url}`, {
      headers,
      ...options,
    });
    status = response.status;
    data = await response.json();
  } catch (e) {
    console.error(e);
  }

  console.debug({ data, response, status });
  return { data, response, status };
};

export const $api = {
  get: (url, options) => fetchInstance(url, { ...options }),
  post: (url, body, options) =>
    fetchInstance(url, {
      method: "POST",
      body: JSON.stringify(body),
      ...options,
    }),

  delete: (url, options) =>
    fetchInstance(url, { method: "DELETE", ...options }),
};
