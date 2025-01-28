import axios from "axios";

// const baseURL = "https://krishivikas.com/api/v2";
const baseURL = "https://test.abybabyoffice.com/api";

const api = axios.create({
  baseURL: baseURL,
});

const token = "30|SdLb2GaP3O5oisYqJyolOPVIIhT4NyDtfQQ09UXG2d36a214";

// LOGIN API CALL
export const makeLogin = async (username, password) => {
  const response = await api.post(`/login`, {
    email_id: username,
    password: password,
    firebase_token: "fghfghgfhfghfghfg",
  });
  return response.data.result.response;
};

// ALL LIST APIS

// BRANCH LIST
export const getBranchList = async () => {
  try {
    const response = await api.get("/branch-list", {
      headers: {
        Authorization: `Bearer 30|SdLb2GaP3O5oisYqJyolOPVIIhT4NyDtfQQ09UXG2d36a214`,
      },
    });
    return response.data.result.response;
  } catch (error) {
    console.error("Error fetching branch list:", error);
    throw error;
  }
};

// ADD COMPANY
export const companyAdd = async (
  company_name,
  company_details,
  company_gst,
  company_address,
  contact_person,
  contact_number,
  contact_email,
  status,
  token
) => {
  const response = await api.post(
    `/add-company`,
    {
      company_name: company_name,
      company_details: company_details,
      company_gst: company_gst,
      company_address: company_address,
      contact_person: contact_person,
      contact_number: contact_number,
      contact_email: contact_email,
      status: status,
    },
    {
      headers: {
        Authorization: `Bearer 27|360kPVWhqe7rPRvDqIT3bRhi6yXJOo68D0984l14d56143a6`,
      },
    }
  );
  return response.data.result.response;
};
