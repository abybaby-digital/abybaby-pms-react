import axios from "axios";

// const baseURL = "https://krishivikas.com/api/v2";
const baseURL = "https://test.abybabyoffice.com/api";
// const baseURL = "https://development.abybabyoffice.com/api";

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
  return response.data.result;
};

// DOWNLOAD IMAGES

export const downloadImages = async (token, urls) => {
  try {
    const response = await api.post(
      "/download-images",
      {
        urls: urls,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.result;
  } catch (error) {
    console.error("Error download", error);
    throw error;
  }
};

// Remove IMAGES

export const removeImageZip = async (token, zip_file_name) => {
  try {
    const response = await api.post(
      "/remove-images",
      {
        zip_file_name: zip_file_name,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.result;
  } catch (error) {
    console.error("Error download", error);
    throw error;
  }
};

// ADD DEALERSHIP

export const addDealership = async (token, dealer_name) => {
  try {
    const response = await api.post(
      "/add-dealership",
      {
        dealer_name: dealer_name,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.result;
  } catch (error) {
    console.error("Error adding dealership", error);
    throw error;
  }
};

// EDIT DEALERSHIP
export const editDealership = async (token, id, dealer_name) => {
  try {
    const response = await api.post(
      "/edit-dealership",
      {
        id: id,
        dealer_name: dealer_name,
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

// DEALERSHIP LIST

export const getDealershipList = async (token) => {
  try {
    const response = await api.post(
      "/dealership-list",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.result;
  } catch (error) {
    console.error("Error fetching dealership list:", error);
    throw error;
  }
};

// ADD GIFT
export const addGift = async (token, gift_name) => {
  try {
    const response = await api.post(
      "/add-gift",
      {
        gift_name: gift_name,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.result;
  } catch (error) {
    console.error("Error adding gift:", error);
    throw error;
  }
};

// EDIT GIFT
export const editGift = async (token, id, gift_name) => {
  try {
    const response = await api.post(
      "/edit-gift",
      {
        id: id,
        gift_name: gift_name,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.result;
  } catch (error) {
    console.error("Error editing gift:", error);
    throw error;
  }
};

// GIFT LIST
export const getGiftList = async (token) => {
  try {
    const response = await api.post(
      "/gift-list",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.result;
  } catch (error) {
    console.error("Error fetching gift list:", error);
    throw error;
  }
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
  return response.data.result;
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
  return response.data.result;
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
  return response.data.result;
};

// ADD VENDOR CATEGORY
export const addVendorCategory = async (token, vendor_category_name) => {
  const response = await api.post(
    `/add-vendor-category`,
    {
      vendor_category_name: vendor_category_name,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data.result;
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
  return response.data.result;
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
    const response = await api.get("/financial-year", {
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

// ADD PROJECT
export const addProject = async (
  token,
  client_po_no,
  name_prefix,
  project_name,
  client_id,
  branch_id,
  company_id,
  vertical_head_id,
  business_manager_id,
  client_service_id,
  other_members_id,
  activity_coordinator_id,
  activity_coordinator_other_id,
  quotation_no,
  project_amount_pre_gst,
  project_amount_with_gst,
  branch_expenses_cash,
  branch_expenses_check,
  project_start_date,
  project_end_date,
  status
) => {
  try {
    const response = await api.post(
      "/add-project",
      {
        client_po_no: client_po_no,
        name_prefix: name_prefix,
        project_name: project_name,
        client_id: client_id,
        branch_id: branch_id,
        company_id: company_id,
        vertical_head_id: vertical_head_id,
        business_manager_id: business_manager_id,
        client_service_id: client_service_id,
        other_members_id: other_members_id,
        activity_coordinator_id: activity_coordinator_id,
        activity_coordinator_other_id: activity_coordinator_other_id,
        quotation_no: quotation_no,
        project_amount_pre_gst: project_amount_pre_gst,
        project_amount_with_gst: project_amount_with_gst,
        branch_expenses_cash: branch_expenses_cash,
        branch_expenses_check: branch_expenses_check,
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
  client_po_number,
  name_prefix,
  project_name,
  client_id,
  branch_id,
  company_id,
  vertical_head_id,
  business_manager_id,
  client_service_id,
  other_members_id,
  activity_coordinator_id,
  activity_coordinator_other_id,
  quotation_no,
  project_amount_pre_gst,
  project_amount_with_gst,
  branch_expenses_cash,
  branch_expenses_check,
  project_start_date,
  project_end_date,
  status
) => {
  try {
    const response = await api.post(
      "/edit-project",
      {
        id: id,
        client_po_number: client_po_number,
        name_prefix: name_prefix,
        project_name: project_name,
        client_id: client_id,
        branch_id: branch_id,
        company_id: company_id,
        vertical_head_id: vertical_head_id,
        business_manager_id: business_manager_id,
        client_service_id: client_service_id,
        other_members_id: other_members_id,
        activity_coordinator_id: activity_coordinator_id,
        activity_coordinator_other_id: activity_coordinator_other_id,
        quotation_no: quotation_no,
        project_amount_pre_gst: project_amount_pre_gst,
        project_amount_with_gst: project_amount_with_gst,
        branch_expenses_cash: branch_expenses_cash,
        branch_expenses_check: branch_expenses_check,
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
  financial_year,
  skip,
  take,
  status,
  billing_status,
  payment_status,
  invoice_payment_status
) => {
  try {
    const response = await api.post(
      "/project-list",
      {
        client_id: client_id,
        branch_id: branch_id,
        company_id: company_id,
        financial_year: financial_year,
        skip: skip,
        take: take,
        status: status,
        billing_status: billing_status,
        payment_status: payment_status,
        invoice_payment_status: invoice_payment_status,
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

// PROJECT VIEW BY ID

export const getProjectById = async (token, project_id) => {
  try {
    const response = await api.post(
      "/project-details-by-id",
      {
        project_id: project_id,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.result;
  } catch (error) {
    console.error("Error fetching project by id:", error);
    throw error;
  }
};

// PROJECT PAYMENT STATUS

export const changeProjectPaymentStatus = async (token, project_id) => {
  try {
    const response = await api.post(
      "/project-payment-status",
      {
        project_id: project_id,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.result;
  } catch (error) {
    console.error("Error fetching project by id:", error);
    throw error;
  }
};

// IMPORT PROJECT

export const importProject = async (token, file) => {
  try {
    // Ensure the file is of the correct type (CSV)
    if (!file || file.type !== "text/csv") {
      throw new Error("Please upload a valid CSV file.");
    }

    const formData = new FormData();
    formData.append("import_project", file); // Append the file to FormData

    const response = await api.post("/import-project", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data", // Specify multipart/form-data for file upload
      },
    });

    // Assuming the server returns the result in response.data.result
    return response.data.result;
  } catch (error) {
    console.error("Error importing project:", error);

    // Optionally, show user-friendly error message
    throw new Error(
      error.response ? error.response.data.message : error.message
    );
  }
};

// VERTICAL HEAD LIST
export const getVerticalHeadList = async (token) => {
  try {
    const response = await api.post(
      "/vh-prefix-list",
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

// ACTIVITY CO ORDINATOR LIST
export const getActiveCoOrdinatorList = async (token) => {
  try {
    const response = await api.post(
      "/activity-coordinator-list",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.result;
  } catch (error) {
    console.error("Error fetching mis list:", error);
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
  access_type_list,
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
        access_type_list: access_type_list,
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

// FO ENQUIRY REPORT
export const getFoEnquiryList = async (token, report_for, team_id, start_date, end_date) => {
  try {
    const response = await api.post(
      "/fo-enquiry-report",
      {
        report_for: report_for,
        team_id: team_id,
        start_date: start_date,
        end_date: end_date
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.result;
  } catch (error) {
    console.error("Error fetching fo enquiry list:", error);
    throw error;
  }
};

// ADD TEAM
export const addTeam = async (
  token,
  project_id,
  team_name,
  fo_main_id,
  fo_junior_id
) => {
  try {
    const response = await api.post(
      "/add-team",
      {
        project_id: project_id,
        team_name: team_name,
        fo_main_id: fo_main_id,
        fo_junior_id: fo_junior_id,
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

// EDIT TEAM
export const editTeam = async (
  token,
  team_id,
  team_name,
  fo_main_id,
  fo_junior_id
) => {
  try {
    const response = await api.post(
      "/edit-team",
      {
        team_id: team_id,
        team_name: team_name,
        fo_main_id: fo_main_id,
        fo_junior_id: fo_junior_id,
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

// TEAM LIST
export const getTeamList = async (token) => {
  try {
    const response = await api.post(
      "/team-list",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.result;
  } catch (error) {
    console.error("Error fetching team list:", error);
    throw error;
  }
};

// FO REMOVE
export const removeFO = async (token, team_id, fo_id, fo_type) => {
  try {
    const response = await api.post(
      "/fo-remove-from-project",
      {
        team_id: team_id,
        fo_id: fo_id,
        fo_type: fo_type,
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

// ASSIGN ACTIVITY COORDINATOR
export const addActivityCoOrdinator = async (
  token,
  project_id,
  activity_coordinator_id,
  activity_coordinator_other_id
) => {
  try {
    const response = await api.post(
      "/assign-ac-by-project",
      {
        project_id: project_id,
        activity_coordinator_id: activity_coordinator_id,
        activity_coordinator_other_id: activity_coordinator_other_id,
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

// FO LIST
export const FOList = async (token) => {
  try {
    const response = await api.post(
      "/field-officer-list",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.result;
  } catch (error) {
    console.error("Error fetching team details:", error);
    throw error;
  }
};

// ACTIVITY BY  ID
export const viewTeamById = async (token, team_id) => {
  try {
    const response = await api.post(
      "/fo-activity-photo-by-team-id",
      {
        team_id: team_id,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.result;
  } catch (error) {
    console.error("Error fetching team details:", error);
    throw error;
  }
};

// FO REMOVE FROM PROJECT
export const FoRemove = async (
  token,
  project_number,
  financial_year_id,
  fo_id
) => {
  try {
    const response = await api.post(
      "/fo-remove-from-project",
      {
        project_number: project_number,
        financial_year_id: financial_year_id,
        fo_id: fo_id,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.result;
  } catch (error) {
    console.error("Error fetching team details:", error);
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
  contact_number,
  password,
  profile_img, // This will be a file object (image)
  user_details
) => {
  try {
    const formData = new FormData();

    // Append all form data fields
    formData.append("name", name);
    // formData.append("name_prefix", name_prefix);
    formData.append("email", email);
    formData.append("role_id", role_id);
    formData.append("state_id", state_id);
    formData.append("company_id", company_id);
    formData.append("branch_id", branch_id);
    formData.append("contact_number", contact_number);
    formData.append("password", password);
    formData.append("user_details", user_details);

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
  contact_number,
  // password,
  profile_img, // This will be a file object (image)
  user_details
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
    formData.append("contact_number", contact_number);
    // formData.append("password", password);
    formData.append("user_details", user_details);

    // Append the profile image if it exists
    // if (profile_img) {
    //   formData.append("profile_img", profile_img[0]); // profile_img should be a File object
    // }

    if (profile_img && typeof profile_img !== "string") {
      formData.append("profile_img", profile_img[0]); // invoice_img is a File object
    } else if (typeof profile_img === "string") {
      // If it's an existing image URL, just append it as a string
      formData.append("profile_img", profile_img);
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
  financial_year_id,
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
    formData.append("financial_year_id", financial_year_id);
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
// export const editPaymentReceived = async (
//   token,
//   id,
//   project_id,
//   received_no,
//   received_amount,
//   received_date,
//   received_img, // This will be a file object (image)
//   received_details,
//   status
// ) => {
//   try {
//     const formData = new FormData();

//     // Append all form data fields
//     formData.append("id", id);
//     formData.append("project_id", project_id);
//     formData.append("received_no", received_no);
//     formData.append("received_amount", received_amount);
//     formData.append("received_date", received_date);
//     formData.append("received_details", received_details);
//     formData.append("status", status);

//     // Append the received image if it exists
//     if (received_img) {
//       formData.append("received_img", received_img[0]); // received_img should be a File object
//     }

//     const response = await api.post("/edit-payment-received", formData, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "multipart/form-data", // Make sure the correct content-type is set
//       },
//     });

//     return response.data.result;
//   } catch (error) {
//     console.error("Error editing payment received:", error);
//     throw error;
//   }
// };

export const editPaymentReceived = async (
  token,
  id,
  project_id,
  received_no,
  received_amount,
  received_date,
  received_img, // This can now be either a file object or an existing image URL (string)
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

    // Append the received image if it exists or if it's a new file upload
    if (received_img && typeof received_img !== "string") {
      formData.append("received_img", received_img[0]); // received_img is a File object
    } else if (typeof received_img === "string") {
      // If it's an existing image URL, just append it as a string
      formData.append("received_img", received_img);
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
export const getPaymentReceivedList = async (token, financial_year_id) => {
  try {
    const response = await api.post(
      "/payment-received-list",
      { financial_year_id: financial_year_id },
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
  invoice_amount_pre_gst,
  invoice_amount_with_gst,
  invoice_date,
  invoice_img,
  invoice_details,
  invoice_billing_status,
  financial_year_id
) => {
  try {
    const formData = new FormData();

    // Append all form data fields
    formData.append("project_id", project_id);
    formData.append("invoice_no", invoice_no);
    formData.append("invoice_amount_pre_gst", invoice_amount_pre_gst);
    formData.append("invoice_amount_with_gst", invoice_amount_with_gst);
    formData.append("invoice_date", invoice_date);
    formData.append("invoice_details", invoice_details);
    formData.append("invoice_billing_status", invoice_billing_status);
    formData.append("financial_year_id", financial_year_id);

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

// INVOICE NO BY PROJECT ID
export const getInvoiceNumberByProjectId = async (token, project_id) => {
  try {
    const response = await api.post(
      "/invoice-list-by-project-id",
      {
        project_id: project_id,
      },
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

// DELETE INVOICE

export const deleteInvoice = async (token, invoice_id) => {
  try {
    const response = await api.post(
      "/invoice-delete",
      {
        invoice_id: invoice_id,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.result;
  } catch (error) {
    console.error("Error deleting invoice:", error);
    throw error;
  }
};

// EDIT INVOICE
// export const editInvoice = async (
//   token,
//   id,
//   project_id,
//   invoice_no,
//   invoice_amount_pre_gst,
//   invoice_amount_with_gst,
//   invoice_date,
//   invoice_img, // This will be a file object (image)
//   invoice_details,
//   status
// ) => {
//   try {
//     const formData = new FormData();

//     // Append all form data fields
//     formData.append("id", id);
//     formData.append("project_id", project_id);
//     formData.append("invoice_no", invoice_no);
//     formData.append("invoice_amount_pre_gst", invoice_amount_pre_gst);
//     formData.append("invoice_amount_with_gst", invoice_amount_with_gst);
//     formData.append("invoice_date", invoice_date);
//     formData.append("invoice_details", invoice_details);
//     formData.append("status", status);

//     // Append the invoice image if it exists
//     if (invoice_img) {
//       formData.append("invoice_img", invoice_img[0]); // invoice_img should be a File object
//     }

//     const response = await api.post("/edit-invoice", formData, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "multipart/form-data", // Make sure the correct content-type is set
//       },
//     });

//     return response.data.result;
//   } catch (error) {
//     console.error("Error editing invoice:", error);
//     throw error;
//   }
// };

export const editInvoice = async (
  token,
  id,
  project_id,
  invoice_no,
  invoice_amount_pre_gst,
  invoice_amount_with_gst,
  invoice_date,
  invoice_img, // This can now be either a file object or an existing image URL (string)
  invoice_details,
  status
) => {
  try {
    const formData = new FormData();

    // Append all form data fields
    formData.append("id", id);
    formData.append("project_id", project_id);
    formData.append("invoice_no", invoice_no);
    formData.append("invoice_amount_pre_gst", invoice_amount_pre_gst);
    formData.append("invoice_amount_with_gst", invoice_amount_with_gst);
    formData.append("invoice_date", invoice_date);
    formData.append("invoice_details", invoice_details);
    formData.append("status", status);

    // Append the invoice image if it exists or if it's a new file upload
    if (invoice_img && typeof invoice_img !== "string") {
      formData.append("invoice_img", invoice_img[0]); // invoice_img is a File object
    } else if (typeof invoice_img === "string") {
      // If it's an existing image URL, just append it as a string
      formData.append("invoice_img", invoice_img);
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
export const getInvoiceList = async (token, financial_year_id) => {
  try {
    const response = await api.post(
      "/invoice-list",
      {
        financial_year_id: financial_year_id,
      },
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
  client_po_no,
  po_amount_pre_gst,
  po_amount_with_gst,
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
    formData.append("client_po_no", client_po_no);
    formData.append("po_amount_pre_gst", po_amount_pre_gst);
    formData.append("po_amount_with_gst", po_amount_with_gst);
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

// ADD CLIENT PO
export const addClientPO = async (
  token,
  project_id,
  client_po_no,
  po_amount_pre_gst,
  po_amount_with_gst,
  po_date,
  po_img, // Image or PDF file
  payment_schedule_days,
  project_order_details,
  financial_year_id,
  status
) => {
  try {
    const formData = new FormData();

    // Append all form data fields
    formData.append("project_id", project_id);
    formData.append("client_po_no", client_po_no);
    formData.append("po_amount_pre_gst", po_amount_pre_gst);
    formData.append("po_amount_with_gst", po_amount_with_gst);
    formData.append("po_date", po_date);
    formData.append("payment_schedule_days", payment_schedule_days);
    formData.append("project_order_details", project_order_details);
    formData.append("financial_year_id", financial_year_id);
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

// EDIT CLIENT PO
export const editClientPO = async (
  token,
  id, // PO ID (to edit an existing PO)
  project_id,
  project_no,
  po_amount_pre_gst,
  po_amount_with_gst,
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
    formData.append("project_no", project_no);
    formData.append("po_amount_pre_gst", po_amount_pre_gst);
    formData.append("po_amount_with_gst", po_amount_with_gst);
    formData.append("po_date", po_date);
    formData.append("payment_schedule_days", payment_schedule_days);
    formData.append("project_order_details", project_order_details);
    formData.append("status", status);

    // Only append the PO image if it's a new file (image or PDF)
    if (po_img && typeof po_img !== "string") {
      formData.append("po_img", po_img[0]); // po_img should be a File object
    } else if (typeof po_img === "string") {
      // If po_img is a URL (i.e., no change to the image), append the URL as part of the payload
      formData.append("po_img", po_img);
    }

    // Send the request with form data
    const response = await api.post("/edit-client-po", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data", // Ensure correct content-type for file uploads
      },
    });

    return response.data.result;
  } catch (error) {
    console.error("Error editing PO:", error);
    throw error;
  }
};

//CLIENT PO LIST
export const getClientPOList = async (token, financial_year_id) => {
  try {
    const response = await api.post(
      "/client-po-list",
      {
        financial_year_id: financial_year_id,
      },
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
  financial_year_id
) => {
  try {
    const formData = new FormData();

    // Append all form data fields
    formData.append("project_id", project_id);
    formData.append("vendor_id", vendor_id);
    formData.append("requisition_amount", requisition_amount);
    formData.append("requisition_remarks", requisition_remarks);
    formData.append("date_of_payments", date_of_payments);
    formData.append("financial_year_id", financial_year_id);

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
export const getPaymentRequisitionList = async (token, financial_year_id) => {
  try {
    const response = await api.post(
      "/payment-requition-list",
      {
        financial_year_id: financial_year_id,
      },
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

// PAYMENT REQUISITION DOWNLOAD STATUS
export const getRequisitionDownloadStatus = async (
  token,
  payment_requition_id
) => {
  try {
    const response = await api.post(
      "/update-download-status",
      {
        payment_requition_id: payment_requition_id,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.result;
  } catch (error) {
    console.error("Error fetching Download Status:", error);
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

    // All field values collected in an object
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

    // Append to FormData
    Object.entries(data).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        // For file arrays (supporting multiple uploads)
        if (key.endsWith("_img") && Array.isArray(value)) {
          value.forEach((file) => {
            if (file instanceof File) {
              formData.append(key, file); // multiple files for the same key
            }
          });
        } else {
          formData.append(key, value);
        }
      }
    });

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


export const editBillingSupportings = async (
  token,
  id,
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

    const data = {
      id,
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

    Object.entries(data).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        if (key.endsWith("_img") && Array.isArray(value)) {
          value.forEach((file) => {
            if (file instanceof File) {
              formData.append(key, file); // allows multiple files for the same field
            }
          });
        } else {
          formData.append(key, value);
        }
      }
    });

    const response = await api.post("/edit-billing-support", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data.result;
  } catch (error) {
    console.error("Error editing billing supportings:", error);
    throw error;
  }
};


// PAYMENT REQUISITION LIST
export const getBillingSupportList = async (token, financial_year_id) => {
  try {
    const response = await api.post(
      "/billing-support-list",
      {
        financial_year_id: financial_year_id,
      },
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

// DASHBOARD PROJECT REPORT

// PAYMENT REQUISITION LIST
export const getReport = async (token, financial_year) => {
  try {
    const response = await api.post(
      "/project-report",
      {
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
    console.error("Error fetching Payment Requisition list:", error);
    throw error;
  }
};

// PAYMENT REQUISITION APPROVAL

export const approvePaymentRequisition = async (
  token,
  payment_requition_id,
  approved_amount,
  status
) => {
  try {
    const response = await api.post(
      "/payment-requisition-approved-status",
      {
        payment_requition_id: payment_requition_id,
        approved_amount: approved_amount,
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
    console.error("Error Approving Payment:", error);
    throw error;
  }
};

// CHANGE PASSWORD

export const changePassword = async (
  token,
  email_id,
  old_password,
  new_password,
  confirm_password
) => {
  try {
    const response = await api.post(
      "/change-password",
      {
        email_id: email_id,
        old_password: old_password,
        new_password: new_password,
        confirm_password: confirm_password,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.result;
  } catch (error) {
    console.error("Failed to change password:", error);
    throw error;
  }
};

// FO REPORT

export const foReportData = async (token) => {
  try {
    const response = await api.post(
      "/fo-report",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.result;
  } catch (error) {
    console.error("Failed to change password:", error);
    throw error;
  }
};
