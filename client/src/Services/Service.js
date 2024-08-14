import client from "../Client/Client";

const handleError = (error, defaultMessage) => {

  console.error("API call failed:", error);
  return { error: error.message || defaultMessage };
};

// Function to register a user
export const registerUser = async (userData) => {
  try {
    const response = await client("/registerUser", {
      method: "POST",
      data: userData,
    });
    return response;
  } catch (error) {
    return handleError(error, "Registration failed");
  }
};

// Function to login
export const login = async (username, password) => {
  try {
    const response = await client("/login", {
      method: "POST",
      data: { username, password },
    });
    return response;
  } catch (error) {
    return handleError(error, "Login failed");
  }
};

// Function to assemble a bike
export const assembleBike = async (employeeId, bikeType) => {
  try {
    const response = await client("/assemble", {
      method: "POST",
      data: { employeeId, bikeType },
    });
    return response;
  } catch (error) {
    return handleError(error, "Failed to assemble bike");
  }
};

// Function to fetch dashboard data
export const fetchDashboardData = async (fromDate, toDate) => {
  try {
    const response = await client("/dashboard", {
      method: "POST",
      data: { fromDate, toDate },
    });
    return response;
  } catch (error) {
    return handleError(error, "Error fetching dashboard data");
  }
};

// Function to fetch employee production data
export const fetchEmployeeData = async (date) => {
  try {
    const response = await client("/employee-production", {
      method: "POST",
      data: { date },
    });
    return response;
  } catch (error) {
    return handleError(error, "Error fetching employee production data");
  }
};
