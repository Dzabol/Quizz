import { decode } from "html-entities";

const categoriesURL = "https://opentdb.com/api_category.php";

async function getDataFromServer(serverAddress) {
  try {
    const response = await fetch(serverAddress);
    if (!response.ok) {
      throw new Error(
        `An error occurred while fetching data from the server: ${response}`
      );
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("An error occurred while fetching data from the server.");
  }
}

function checkResponse(dataFromServer) {
  const response = dataFromServer.response_code;

  switch (response) {
    case 0: {
      return {
        serverAnswer: "Success Returned results successfully.",
        areDataFromServerOK: true,
      };
    }
    case 1: {
      return {
        serverAnswer: `No Results Could not return results. 
                       The API doesn't have enough questions for your query. 
                      (Ex. Asking for 50 Questions in a Category that only has 20.)`,
        areDataFromServerOK: false,
      };
    }
    case 2: {
      return {
        serverAnswer: `Invalid Parameter Contains an invalid parameter. 
                        Arguements passed in aren't valid. (Ex. Amount = Five)`,
        areDataFromServerOK: false,
      };
    }
    case 3: {
      return {
        serverAnswer: `Token Not Found Session Token does not exist.`,
        areDataFromServerOK: false,
      };
    }
    case 4: {
      return {
        serverAnswer: `Token Empty Session Token has returned all possible questions for the specified query. 
                      Resetting the Token is necessary`,
        areDataFromServerOK: false,
      };
    }
    default: {
      return {
        serverAnswer: `Unknown response contact with sebastian.jablecki@gmail.com`,
        areDataFromServerOK: false,
      };
    }
  }
}

export { categoriesURL, getDataFromServer, checkResponse };
