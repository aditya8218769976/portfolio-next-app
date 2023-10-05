export async function addData(currentTab, formData) {
    try {
      const response = await fetch(`/api/${currentTab}/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        // Handle HTTP error here, e.g., throw an error or return an error object
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const result = await response.json();
  
      return result;
    } catch (error) {
      console.error("Error:", error);
      // Handle the error and return an error object or throw it further if needed
      throw error;
    }
  }
  
  
  export async function getData(currentTab) {
    try {
      const response = await fetch(`/api/${currentTab}/get`, {
        method: "GET",
      });
  
      const result = await response.json();
  
      return result;
    } catch (e) {
      console.log(e);
    }
  }
  
  export async function updateData(currentTab, formData) {
    try {
      const response = await fetch(`/api/${currentTab}/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      const result = await response.json();
  
      return result;
    } catch (e) {
      console.log(e);
    }
  }
  
  export async function login(formData) {
    try {
      const response = await fetch(`/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      const result = await response.json();
  
      return result;
    } catch (e) {
      console.log(e);
    }
  }