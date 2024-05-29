# Vertex AI Gemini Parallel Function Calling Example

This repository contains an example of how to use the Google Cloud Vertex AI service with the Gemini model to perform parallel function calls in a Node.js environment.

## Overview

The code demonstrates how to initialize the Vertex AI client, create a chat session, send messages, and handle function calls to retrieve doctor profiles. The example uses hardcoded doctor profiles for demonstration purposes.

## Prerequisites

Before running the code, make sure you have the following:

- Node.js installed
- A Google Cloud project with Vertex AI API enabled
- Google Cloud SDK installed and authenticated

## Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/vertex-ai-gemini-example.git
   cd vertex-ai-gemini-example

1. Install the dependencies:

   ```
   npm install @google-cloud/vertexai
   ```

2. Set up environment variables:

   Export your Google Cloud project ID and location where Vertex AI is enabled.

   ```
   export PROJECT_ID="your-project-id"
   export LOCATION="your-location"
   ```

   Also ensure you already authenticated wih gcloud.
   ```
   gcloud auth application-default login
    ```

## Usage

1. Replace the placeholder `PROJECT_ID` and `LOCATION` in the code with your actual Google Cloud project ID and location.

2. Run the script:

    ```
   node index.js
   ```

## Code Explanation

- **getProfile(doctorName)**: A helper function to get a doctor profile based on the doctor's name.
- **sendChat(text)**: Sends a chat message to the generative model and logs the response.
- **functionDeclarations**: Defines the functions that can be called by the chat model, including the parameters required.
- **prepareResponse(consolidatedProfiles)**: Prepares the response for the function call.
- **extractFunctionCalls(response)**: Extracts function calls from the model's response.
- **main()**: The main function that initializes the Vertex AI client, starts a chat session, sends messages, and processes function calls.

## Example

The script sends a message to get the profiles of doctors Beata, Lidia, and Kiata. It then processes the function calls to retrieve the profiles and sends the responses back to the chat model.
