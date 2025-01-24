import axios from "axios";

// const baseURL = "https://krishivikas.com/api/v2";
const baseURL = "https://database.businessenquiry.co.in/api/admin";

// LOGIN API CALL
export const adminLogin = async (username, password) => {
  const response = await axios.post(`${baseURL}/admin-login`, {
    username: username,
    password: password,
  });
  return response;
};

// Brand Create API CALL

export const getCategoryList = async (languageId, token) => {
  const response = await axios.post(
    `${baseURL}/category-list`,
    {
      language_id: languageId,
    },
    {
      headers: {
        Authorization:
          // "Bearer 1280|wxPHniERi5WY1UEJ2kg0p26m1yj93JsDKAGwK7048ebf885b",
          `Bearer ${token} `,
      },
    }
  );
  return response.data.result.response;
};
