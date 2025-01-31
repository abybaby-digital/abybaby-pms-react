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
    const response = await api.post(
      "/branch-list",
      {},
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
  status
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
  token,
  company_id,
  company_name,
  company_details,
  company_gst,
  company_address,
  contact_person,
  contact_number,
  contact_email,
  status
) => {
  const response = await api.post(
    `/edit-company`,
    {
      id: company_id,
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

// ADD VENDOR

export const addVendor = async (
  token,
  vendor_category_id,
  vendor_name,
  vendor_email,
  vendor_mobile,
  vendor_branch_id,
  vendor_address,
  state_id,
  pancard_no,
  gst_no,
  bank_name,
  bank_account,
  ifsc_code,
  status
) => {
  const response = await api.post(
    `/add-vendor`,
    {
      vendor_category_id: vendor_category_id,
      vendor_name: vendor_name,
      vendor_email: vendor_email,
      vendor_mobile: vendor_mobile,
      vendor_branch_id: vendor_branch_id,
      vendor_address: vendor_address,
      state_id: state_id,
      pancard_no: pancard_no,
      gst_no: gst_no,
      bank_name: bank_name,
      bank_account: bank_account,
      ifsc_code: ifsc_code,
      status,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data.result.response;
};

// EDIT VENDOR

export const editVendor = async (
  token,
  id,
  vendor_category_id,
  vendor_name,
  vendor_email,
  vendor_mobile,
  vendor_branch_id,
  vendor_address,
  state_id,
  pancard_no,
  gst_no,
  bank_name,
  bank_account,
  ifsc_code,
  status
) => {
  const response = await api.post(
    `/edit-vendor`,
    {
      id: id,
      vendor_category_id: vendor_category_id,
      vendor_name: vendor_name,
      vendor_email: vendor_email,
      vendor_mobile: vendor_mobile,
      vendor_branch_id: vendor_branch_id,
      vendor_address: vendor_address,
      state_id: state_id,
      pancard_no: pancard_no,
      gst_no: gst_no,
      bank_name: bank_name,
      bank_account: bank_account,
      ifsc_code: ifsc_code,
      status,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data.result.response;
};

// VENDOR LIST
export const getVendorList = async (token) => {
  try {
    const response = await api.post(
      "/vendor-list",
      {},
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

// VENDOR CATEGORY LIST
export const getVendorCategoryList = async (token) => {
  try {
    const response = await api.get("/vendor-category-list", {
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

// VENDOR CATEGORY LIST
export const getStateList = async (token) => {
  try {
    const response = await api.get("/state-list", {
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

// ADD CLIENT
export const addClient = async (
  token,
  company_name,
  contact_person,
  office_address,
  contact_number,
  client_email,
  client_gst,
  status
) => {
  try {
    const response = await api.post(
      "/add-client",
      {
        company_name: company_name,
        contact_person: contact_person,
        office_address: office_address,
        contact_number: contact_number,
        client_email: client_email,
        client_gst: client_gst,
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

// EDIT CLIENT
export const editClient = async (
  token,
  id,
  company_name,
  contact_person,
  office_address,
  contact_number,
  client_email,
  client_gst,
  status
) => {
  try {
    const response = await api.post(
      "/edit-client",
      {
        id,
        company_name: company_name,
        contact_person: contact_person,
        office_address: office_address,
        contact_number: contact_number,
        client_email: client_email,
        client_gst: client_gst,
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

// CLIENT LIST
export const getClientList = async (token) => {
  try {
    const response = await api.post(
      "/client-list",
      {},
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

// ADD PROJECT
export const addProject = async (
  token,
  project_number,
  purchase_order_no,
  project_name,
  client_id,
  branch_id,
  company_id,
  vertical_head_id,
  business_manager_id,
  client_service_id,
  other_members_id,
  quotation_no,
  project_amount,
  project_start_date,
  project_end_date,
  status
) => {
  try {
    const response = await api.post(
      "/add-project",
      {
        project_number: project_number,
        purchase_order_no: purchase_order_no,
        project_name: project_name,
        client_id: client_id,
        branch_id: branch_id,
        company_id: company_id,
        vertical_head_id: vertical_head_id,
        business_manager_id: business_manager_id,
        client_service_id: client_service_id,
        other_members_id: other_members_id,
        quotation_no: quotation_no,
        project_amount: project_amount,
        project_start_date: project_start_date,
        project_end_date: project_end_date,
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

// PROJECT LIST
export const getProjectList = async (token) => {
  try {
    const response = await api.post(
      "/project-list",
      {},
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

// VERTICAL HEAD LIST
export const getVerticalHeadList = async (token) => {
  try {
    const response = await api.post(
      "/vertical-head-list",
      {},
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

// BRANCH MANAGER LIST
export const getBranchManagerList = async (token, vertical_head_id) => {
  try {
    const response = await api.post(
      "/business-manager-list",
      {
        vertical_head_id: vertical_head_id,
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

// CLIENT SERVICE LIST
export const getClientServiceList = async (token, business_manager_id) => {
  try {
    const response = await api.post(
      "/cs-list",
      {
        business_manager_id: business_manager_id,
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

// OTHER SERVICE LIST
export const getOtherList = async (token, client_service_id) => {
  try {
    const response = await api.post(
      "/others-list",
      {
        client_service_id: client_service_id,
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
