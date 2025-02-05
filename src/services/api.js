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

// STATE LIST
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
// MENU LIST
export const getMenuList = async (token) => {
  try {
    const response = await api.get("/menu-list", {
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

// ADD PAYMENT RECEIVED
export const addPaymentReceived = async (
  token,
  project_id,
  received_no,
  received_amount,
  received_date,
  received_img,
  received_details,
  status
) => {
  try {
    const formData = new FormData();

    // Append all form data fields
    formData.append("project_id", project_id);
    formData.append("received_no", received_no);
    formData.append("received_amount", received_amount);
    formData.append("received_date", received_date);
    formData.append("received_details", received_details);
    formData.append("status", status);

    // Append the received image if it exists
    if (received_img && received_img[0]) {
      formData.append("received_img", received_img[0]); // received_img should be a File object
    }

    // Make the POST request
    const response = await api.post("/add-payment-received", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data", // Make sure the correct content-type is set
      },
    });

    // You might want to check response status or structure here for safety
    return response.data.result;
  } catch (error) {
    console.error("Error adding payment received:", error);
    throw error;
  }
};

// EDIT PAYMENT RECEIVED
export const editPaymentReceived = async (
  token,
  id,
  project_id,
  received_no,
  received_amount,
  received_date,
  received_img, // This will be a file object (image)
  received_details,
  status
) => {
  try {
    const formData = new FormData();

    // Append all form data fields
    formData.append("id", id);
    formData.append("project_id", project_id);
    formData.append("received_no", received_no);
    formData.append("received_amount", received_amount);
    formData.append("received_date", received_date);
    formData.append("received_details", received_details);
    formData.append("status", status);

    // Append the received image if it exists
    if (received_img) {
      formData.append("received_img", received_img[0]); // received_img should be a File object
    }

    const response = await api.post("/edit-payment-received", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data", // Make sure the correct content-type is set
      },
    });

    return response.data.result;
  } catch (error) {
    console.error("Error editing payment received:", error);
    throw error;
  }
};

// PAYMENT RECEIVED LIST
export const getPaymentReceivedList = async (token) => {
  try {
    const response = await api.post(
      "/payment-received-list",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.result;
  } catch (error) {
    console.error("Error fetching payment received list:", error);
    throw error;
  }
};

// ADD INVOICE
export const addInvoice = async (
  token,
  project_id,
  invoice_no,
  invoice_amount,
  invoice_date,
  invoice_img,
  invoice_details,
  status
) => {
  try {
    const formData = new FormData();

    // Append all form data fields
    formData.append("project_id", project_id);
    formData.append("invoice_no", invoice_no);
    formData.append("invoice_amount", invoice_amount);
    formData.append("invoice_date", invoice_date);
    formData.append("invoice_details", invoice_details);
    formData.append("status", status);

    // Append the invoice image if it exists
    if (invoice_img && invoice_img[0]) {
      formData.append("invoice_img", invoice_img[0]); // invoice_img should be a File object
    }

    // Make the POST request
    const response = await api.post("/add-invoice", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data", // Make sure the correct content-type is set
      },
    });

    // You might want to check response status or structure here for safety
    return response.data.result;
  } catch (error) {
    console.error("Error adding invoice:", error);
    throw error;
  }
};

// EDIT INVOICE
export const editInvoice = async (
  token,
  id,
  project_id,
  invoice_no,
  invoice_amount,
  invoice_date,
  invoice_img, // This will be a file object (image)
  invoice_details,
  status
) => {
  try {
    const formData = new FormData();

    // Append all form data fields
    formData.append("id", id);
    formData.append("project_id", project_id);
    formData.append("invoice_no", invoice_no);
    formData.append("invoice_amount", invoice_amount);
    formData.append("invoice_date", invoice_date);
    formData.append("invoice_details", invoice_details);
    formData.append("status", status);

    // Append the invoice image if it exists
    if (invoice_img) {
      formData.append("invoice_img", invoice_img[0]); // invoice_img should be a File object
    }

    const response = await api.post("/edit-invoice", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data", // Make sure the correct content-type is set
      },
    });

    return response.data.result;
  } catch (error) {
    console.error("Error editing invoice:", error);
    throw error;
  }
};

// INVOICE LIST
export const getInvoiceList = async (token) => {
  try {
    const response = await api.post(
      "/invoice-list",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.result;
  } catch (error) {
    console.error("Error fetching invoice list:", error);
    throw error;
  }
};

// ADD PO
export const addPO = async (
  token,
  project_id,
  po_no,
  po_amount,
  po_date,
  po_img, // Image or PDF file
  payment_schedule_days,
  project_order_details,
  status
) => {
  try {
    const formData = new FormData();

    // Append all form data fields
    formData.append("project_id", project_id);
    formData.append("po_no", po_no);
    formData.append("po_amount", po_amount);
    formData.append("po_date", po_date);
    formData.append("payment_schedule_days", payment_schedule_days);
    formData.append("project_order_details", project_order_details);
    formData.append("status", status);

    // Append the PO image (either image or PDF) if it exists
    if (po_img && po_img[0]) {
      formData.append("po_img", po_img[0]); // po_img should be a File object
    }

    // Make the POST request
    const response = await api.post("/add-po", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data", // Make sure the correct content-type is set
      },
    });

    // You might want to check response status or structure here for safety
    return response.data.result;
  } catch (error) {
    console.error("Error adding PO:", error);
    throw error;
  }
};

// ADD PO
export const addClientPO = async (
  token,
  project_id,
  po_no,
  po_amount,
  po_date,
  po_img, // Image or PDF file
  payment_schedule_days,
  project_order_details,
  status
) => {
  try {
    const formData = new FormData();

    // Append all form data fields
    formData.append("project_id", project_id);
    formData.append("po_no", po_no);
    formData.append("po_amount", po_amount);
    formData.append("po_date", po_date);
    formData.append("payment_schedule_days", payment_schedule_days);
    formData.append("project_order_details", project_order_details);
    formData.append("status", status);

    // Append the PO image (either image or PDF) if it exists
    if (po_img && po_img[0]) {
      formData.append("po_img", po_img[0]); // po_img should be a File object
    }

    // Make the POST request
    const response = await api.post("/add-client-po", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data", // Make sure the correct content-type is set
      },
    });

    // You might want to check response status or structure here for safety
    return response.data.result;
  } catch (error) {
    console.error("Error adding PO:", error);
    throw error;
  }
};

// EDIT PO
export const editClientPO = async (
  token,
  id, // PO ID (to edit an existing PO)
  project_id,
  po_no,
  po_amount,
  po_date,
  po_img, // This will be a file object (image or pdf)
  payment_schedule_days,
  project_order_details,
  status
) => {
  try {
    const formData = new FormData();

    // Append all form data fields
    formData.append("id", id); // Existing PO ID
    formData.append("project_id", project_id);
    formData.append("po_no", po_no);
    formData.append("po_amount", po_amount);
    formData.append("po_date", po_date);
    formData.append("payment_schedule_days", payment_schedule_days);
    formData.append("project_order_details", project_order_details);
    formData.append("status", status);

    // Append the PO image (either image or PDF) if it exists
    if (po_img) {
      formData.append("po_img", po_img[0]); // po_img should be a File object
    }

    const response = await api.post("/edit-client-po", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data", // Make sure the correct content-type is set
      },
    });

    return response.data.result;
  } catch (error) {
    console.error("Error editing PO:", error);
    throw error;
  }
};

// PO LIST
export const getClientPOList = async (token) => {
  try {
    const response = await api.post(
      "/client-po-list",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.result;
  } catch (error) {
    console.error("Error fetching PO list:", error);
    throw error;
  }
};

// ADD PAYMENT REQUISITION
export const addPaymentRequisition = async (
  token,
  project_id,
  vendor_id,
  requisition_amount,
  requisition_img, // Image or PDF file
  requisition_remarks,
  date_of_payments,
) => {
  try {
    const formData = new FormData();

    // Append all form data fields
    formData.append("project_id", project_id);
    formData.append("vendor_id", vendor_id);
    formData.append("requisition_amount", requisition_amount);
    formData.append("requisition_remarks", requisition_remarks);
    formData.append("date_of_payments", date_of_payments);

    // Append the requisition image (either image or PDF) if it exists
    if (requisition_img && requisition_img[0]) {
      formData.append("requisition_img", requisition_img[0]); // requisition_img should be a File object
    }

    // Make the POST request
    const response = await api.post("/add-payment-requition", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data", // Make sure the correct content-type is set
      },
    });

    // You might want to check response status or structure here for safety
    return response.data.result;
  } catch (error) {
    console.error("Error adding Payment Requisition:", error);
    throw error;
  }
};

// EDIT PAYMENT REQUISITION
export const editPaymentRequisition = async (
  token,
  id, // Requisition ID (to edit an existing payment requisition)
  project_id,
  branch_id,
  vendor_id,
  requisition_amount,
  requisition_img, // This will be a file object (image or pdf)
  requisition_remarks,
  date_of_payments,
  status
) => {
  try {
    const formData = new FormData();

    // Append all form data fields
    formData.append("id", id); // Existing Payment Requisition ID
    formData.append("project_id", project_id);
    formData.append("branch_id", branch_id);
    formData.append("vendor_id", vendor_id);
    formData.append("requisition_amount", requisition_amount);
    formData.append("requisition_remarks", requisition_remarks);
    formData.append("date_of_payments", date_of_payments);
    formData.append("status", status);

    // Append the requisition image (either image or PDF) if it exists
    if (requisition_img) {
      formData.append("requisition_img", requisition_img[0]); // requisition_img should be a File object
    }

    const response = await api.post("/edit-payment-requition", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data", // Make sure the correct content-type is set
      },
    });

    return response.data.result;
  } catch (error) {
    console.error("Error editing Payment Requisition:", error);
    throw error;
  }
};

// PAYMENT REQUISITION LIST
export const getPaymentRequisitionList = async (token) => {
  try {
    const response = await api.post(
      "/payment-requition-list",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.result;
  } catch (error) {
    console.error("Error fetching Payment Requisition list:", error);
    throw error;
  }
};

export const addBillingSupportings = async (
  token,
  project_id,
  center_vehicle_hire_bill,
  center_vehicle_hire_img,
  center_vehicle_hire_comment,
  manpower_bill,
  manpower_bill_img,
  manpower_bill_comment,
  gift_bill,
  gift_bill_img,
  gift_bill_comment,
  billing_ppt,
  billing_ppt_img,
  billing_ppt_comment,
  report,
  report_img,
  report_comment,
  day_wise_log_book,
  day_wise_log_book_img,
  day_wise_log_book_comment,
  day_wise_meter_console,
  day_wise_meter_console_img,
  day_wise_meter_console_comment,
  no_objection_certificate,
  no_objection_certificate_img,
  no_objection_certificate_comment,
  snacks_bill,
  snacks_bill_img,
  snacks_bill_comment,
  element_wise_photo,
  element_wise_photo_img,
  element_wise_photo_comment,
  nagar_nigan,
  nagar_nigan_img,
  nagar_nigan_comment,
  fuel_bill,
  fuel_bill_img,
  fuel_bill_comment,
  customer_gift,
  customer_gift_img,
  customer_gift_comment,
  customer_acknowledge,
  customer_acknowledge_img,
  customer_acknowledge_comment,
  route_plan,
  route_plan_img,
  route_plan_comment,
  approvel_copy,
  approvel_copy_img,
  approvel_copy_comment,
  po,
  po_img,
  po_comment,
  wayforward_learning,
  wayforward_learning_img,
  wayforward_learning_comment,
  courier_delivery_challan,
  courier_delivery_challan_img,
  courier_delivery_challan_comment,
  transport_bill,
  transport_bill_img,
  transport_bill_comment,
  anocher_bill,
  anocher_bill_img,
  anocher_bill_comment,
  any_other_supporting,
  any_other_supporting_img,
  any_other_supporting_comment,
  status
) => {
  try {
    const formData = new FormData();

    // Append all form data fields
    const data = {
      project_id,
      center_vehicle_hire_bill,
      center_vehicle_hire_img,
      center_vehicle_hire_comment,
      manpower_bill,
      manpower_bill_img,
      manpower_bill_comment,
      gift_bill,
      gift_bill_img,
      gift_bill_comment,
      billing_ppt,
      billing_ppt_img,
      billing_ppt_comment,
      report,
      report_img,
      report_comment,
      day_wise_log_book,
      day_wise_log_book_img,
      day_wise_log_book_comment,
      day_wise_meter_console,
      day_wise_meter_console_img,
      day_wise_meter_console_comment,
      no_objection_certificate,
      no_objection_certificate_img,
      no_objection_certificate_comment,
      snacks_bill,
      snacks_bill_img,
      snacks_bill_comment,
      element_wise_photo,
      element_wise_photo_img,
      element_wise_photo_comment,
      nagar_nigan,
      nagar_nigan_img,
      nagar_nigan_comment,
      fuel_bill,
      fuel_bill_img,
      fuel_bill_comment,
      customer_gift,
      customer_gift_img,
      customer_gift_comment,
      customer_acknowledge,
      customer_acknowledge_img,
      customer_acknowledge_comment,
      route_plan,
      route_plan_img,
      route_plan_comment,
      approvel_copy,
      approvel_copy_img,
      approvel_copy_comment,
      po,
      po_img,
      po_comment,
      wayforward_learning,
      wayforward_learning_img,
      wayforward_learning_comment,
      courier_delivery_challan,
      courier_delivery_challan_img,
      courier_delivery_challan_comment,
      transport_bill,
      transport_bill_img,
      transport_bill_comment,
      anocher_bill,
      anocher_bill_img,
      anocher_bill_comment,
      any_other_supporting,
      any_other_supporting_img,
      any_other_supporting_comment,
      status,
    };

    Object.keys(data).forEach((key) => {
      if (data[key] !== null && data[key] !== undefined) {
        if (key.endsWith("_img") && data[key][0]) {
          formData.append(key, data[key][0]); // Handling file uploads
        } else {
          formData.append(key, data[key]);
        }
      }
    });

    // Make the POST request
    const response = await api.post("/add-billing-support", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data.result;
  } catch (error) {
    console.error("Error adding billing supportings:", error);
    throw error;
  }
};


// PAYMENT REQUISITION LIST
export const getBillingSupportList = async (token) => {
  try {
    const response = await api.post(
      "/billing-support-list",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.result;
  } catch (error) {
    console.error("Error fetching Payment Requisition list:", error);
    throw error;
  }
};









