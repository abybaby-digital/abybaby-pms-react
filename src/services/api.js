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

// FY LIST
export const getFYList = async (token) => {
  try {
    const response = await api.post(
      "/financial-year",
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

// EDIT PROJECT
export const editProject = async (
  token,
  id,
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
      "/edit-project",
      {
        id: id,
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
export const getProjectList = async (
  token,
  client_id,
  branch_id,
  company_id,
  financial_year
) => {
  try {
    const response = await api.post(
      "/project-list",
      {
        client_id: client_id,
        branch_id: branch_id,
        company_id: company_id,
        financial_year: financial_year,
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

// ADD ROLE
export const addRole = async (
  token,
  role_name,
  access_type_add,
  access_type_edit,
  status
) => {
  try {
    const response = await api.post(
      "/add-role",
      {
        role_name: role_name,
        access_type_add: access_type_add,
        access_type_edit: access_type_edit,
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
// EDIT ROLE
export const editRole = async (
  token,
  id,
  role_name,
  access_type_add,
  access_type_edit,
  status
) => {
  try {
    const response = await api.post(
      "/edit-role",
      {
        id: id,
        role_name: role_name,
        access_type_add: access_type_add,
        access_type_edit: access_type_edit,
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
// ROLE LIST
export const getRoleList = async (token) => {
  try {
    const response = await api.get("/role-list", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.result;
  } catch (error) {
    console.error("Error fetching role list:", error);
    throw error;
  }
};

// ADD USER
export const addUser = async (
  token,
  name,
  email,
  role_id,
  state_id,
  company_id,
  branch_id,
  vertical_head_id,
  business_manager_id,
  client_service_id,
  other_service_id,
  contact_number,
  password,
  profile_img, // This will be a file object (image)
  user_details,
  view_status
) => {
  try {
    const formData = new FormData();

    // Append all form data fields
    formData.append("name", name);
    formData.append("email", email);
    formData.append("role_id", role_id);
    formData.append("state_id", state_id);
    formData.append("company_id", company_id);
    formData.append("branch_id", branch_id);
    formData.append("vertical_head_id", vertical_head_id);
    formData.append("business_manager_id", business_manager_id);
    formData.append("client_service_id", client_service_id);
    formData.append("other_service_id", other_service_id);
    formData.append("contact_number", contact_number);
    formData.append("password", password);
    formData.append("user_details", user_details);
    formData.append("view_status", view_status);

    // Append the profile image if it exists
    if (profile_img) {
      formData.append("profile_img", profile_img[0]); // profile_img should be a File object
    }

    const response = await api.post("/add-user", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data", // Make sure the correct content-type is set
      },
    });

    return response.data.result;
  } catch (error) {
    console.error("Error adding user:", error);
    throw error;
  }
};


// EDIT USER
export const editUser = async (
  token,
  id,
  name,
  email,
  role_id,
  state_id,
  company_id,
  branch_id,
  vertical_head_id,
  business_manager_id,
  client_service_id,
  other_service_id,
  contact_number,
  password,
  profile_img, // This will be a file object (image)
  user_details,
  view_status
) => {
  try {
    const formData = new FormData();

    // Append all form data fields
    formData.append("id", id);
    formData.append("name", name);
    formData.append("email", email);
    formData.append("role_id", role_id);
    formData.append("state_id", state_id);
    formData.append("company_id", company_id);
    formData.append("branch_id", branch_id);
    formData.append("vertical_head_id", vertical_head_id);
    formData.append("business_manager_id", business_manager_id);
    formData.append("client_service_id", client_service_id);
    formData.append("other_service_id", other_service_id);
    formData.append("contact_number", contact_number);
    formData.append("password", password);
    formData.append("user_details", user_details);
    formData.append("view_status", view_status);

    // Append the profile image if it exists
    if (profile_img) {
      formData.append("profile_img", profile_img[0]); // profile_img should be a File object
    }

    const response = await api.post("/edit-user", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data", // Make sure the correct content-type is set
      },
    });

    return response.data.result;
  } catch (error) {
    console.error("Error editing user:", error);
    throw error;
  }
};

// USER LIST
export const getUserList = async (token) => {
  try {
    const response = await api.post(
      "/user-list",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.result;
  } catch (error) {
    console.error("Error fetching user list:", error);
    throw error;
  }
};
