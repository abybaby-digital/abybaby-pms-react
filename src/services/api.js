import axios from "axios";

// const baseURL = "https://krishivikas.com/api/v2";
const baseURL = "https://test.abybabyoffice.com/api";

const api = axios.create({
  baseURL: baseURL,
});

// const token = "30|SdLb2GaP3O5oisYqJyolOPVIIhT4NyDtfQQ09UXG2d36a214";

// LOGIN API CALL
export const makeLogin = async (username, password) => {
  const response = await api.post(`/login`, {
    email_id: username,
    password: password,
    firebase_token: "fghfghgfhfghfghfg",
  });
  return response.data.result.response;
};



// ADD BRANCH

export const addBranch = async (
  token,
  branch_code,
  branch_name,
  branch_address,
  status
) => {
  try {
    const response = await api.post(
      "/add-branch",
      {
        branch_code: branch_code,
        branch_name: branch_name,
        branch_address: branch_address,
        status: status,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.result;
  } catch (error) {
    console.error("Error fetching branch list:", error);
    throw error;
  }
};


// EDIT BRANCH

export const editBranch = async (
  token,
  id,
  branch_code,
  branch_name,
  branch_address,
  status
) => {
  try {
    const response = await api.post(
      "/edit-branch",
      {
        id: id,
        branch_code: branch_code,
        branch_name: branch_name,
        branch_address: branch_address,
        status: status,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.result;
  } catch (error) {
    console.error("Error fetching branch list:", error);
    throw error;
  }
};

// BRANCH LIST
export const getBranchList = async (token) => {
  try {
    const response = await api.get("/branch-list", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.result;
  } catch (error) {
    console.error("Error fetching branch list:", error);
    throw error;
  }
};

// ADD COMPANY
export const addCompany = async (
  token,
  company_name,
  company_details,
  company_gst,
  company_address,
  contact_person,
  contact_number,
  contact_email,
  status,
  
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
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data.result.response;
};

// EDIT COMPANY
export const editCompany = async (
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
    `/edit-company`,
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
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data.result.response;
};

// COMPANY LIST
export const getCompanyList = async (token) => {
  try {
    const response = await api.get("/company-list", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.result;
  } catch (error) {
    console.error("Error fetching branch list:", error);
    throw error;
  }
};
