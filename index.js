const { VertexAI } = require("@google-cloud/vertexai");

const PROJECT_ID = process.env.PROJECT_ID;
const LOCATION = process.env.LOCATION; //"europe-west3";
//const MODEL_NAME = "gemini-1.5-pro-001";
const MODEL_NAME = "gemini-1.5-flash-001";

// Helper function to get doctor profile (replace with actual logic)
function getProfile(doctorName) {
  if (doctorName === "Lidia") {
    return "Lidia is a Cardiologist with 10 years of experience";
  } else if (doctorName === "Beata") {
    return "Beata is a Dentist with 10 years of experience";
  } else {
    return "Doctor profile not found";
  }
}

let generativeModel = {};

async function sendChat(text) {
  const chat = generativeModel.startChat();
  const chatInput = text;
  const result = await chat.sendMessage(chatInput);
  const response = result.response;
  console.log("response: ", JSON.stringify(response));
}

const functionDeclarations = [
  {
    function_declarations: [
      {
        name: "get_doctor_profile",
        description: "Search for doctor profile and returns details",
        parameters: {
          type: "object",
          properties: {
            doctor_name: {
              type: "string",
              description: "Name of the doctor to get the profile",
            },
          },
          // required: ["doctor_name"],
        },
      },
    ],
  },
];

const prepareResponse = (consolidatedProfiles) => {
  const responseParts = [
    {
      functionResponse: {
        name: "get_doctor_profile",
        response: {
          name: "get_doctor_profile",
          content: { profile: consolidatedProfiles },
        },
      },
    },
  ];
  return responseParts;
};

function extractFunctionCalls(response) {
  const functionCalls = [];
  if (response.candidates[0].content.parts) {
    for (const part of response.candidates[0].content.parts) {
      functionCalls.push(part.functionCall);
    }
  }
  return functionCalls;
}

//  const response = await generativeModel.countTokens(request);
async function main() {
  // Initialize Vertex AI client
  const vertexAI = new VertexAI({ project: PROJECT_ID, location: LOCATION });
  model = MODEL_NAME;

  const generationConfig = {
    temperature: 0,
    topP: 1.0,
    maxOutputTokens: 250,
  };

  generativeModel = vertexAI.getGenerativeModel({
    model: model,

    generationConfig: generationConfig,
  });
  // Create a chat session and pass your function declarations
  const chat = generativeModel.startChat({ tools: functionDeclarations });

  const chatInput1 = "Get doctor profile for Beata, Lidia and Kiata";

  const result1 = await chat.sendMessage(chatInput1);
  functionCalls = extractFunctionCalls(result1.response);

  apiResponses = [];

  for (let fcall of functionCalls) {
    docProfile = getProfile(fcall.args["doctor_name"]);
    const funcResponseData = prepareResponse(docProfile);
    apiResponses.push(funcResponseData);
  }

  const result2 = await chat.sendMessage(apiResponses);

  console.log(
    result2.response.candidates[0].content.parts.map((p) => p.text).join("\n")
  );
}

main().catch(console.error);
