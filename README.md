# ChatApp

## Project Description

ChatApp is a mobile chat application built using React Native and Expo. The app enables users to engage in real-time chat, share images and location data, and access their chat history both online and offline. Users can customize their chat experience by selecting a background color and entering their name before starting a conversation.

## Key Features

- **Personalized Chat Screen**: Users can enter their name and choose a background color for the chat screen before joining.
- **Chat Interface**: A page that displays the conversation with an input field and a submit button.
- **Image Sharing**: Users can pick and send images from their phone’s image library or take new pictures with the device’s camera.
- **Location Sharing**: Users can share their location data via a map view in the chat.
- **Offline Data Storage**: Chat conversations are stored both online in Google Firestore and offline on the device.
- **Anonymous Authentication**: Users are authenticated anonymously via Google Firebase authentication.

## Installation Instructions

1. **Clone the Repository**:
   - ```bash
   - git clone https://github.com/khafiz12/ChatApp.git
   - cd ChatApp
  
## Usage Instructions

1. **Launch the App**:
   - Open the app using the Expo Go app on your mobile device.
   - Alternatively, run the app on a simulator or emulator.

2. **Enter Your Name**:
   - On the initial screen, you will be prompted to enter your name.
   - Select a background color for the chat screen from the available options.

3. **Start Chatting**:
   - After entering your name and choosing a color, tap the "Start Chatting" button to enter the chat interface.

4. **Send Messages**:
   - Type your message into the input field at the bottom of the chat screen.
   - Press the submit button (usually represented by a send icon) to send your message.

5. **Share Images**:
   - **From Image Library**: Tap the image icon to open your phone’s image library, select an image, and send it.
   - **Take a New Picture**: Tap the camera icon to take a new picture and send it.

6. **Share Location**:
   - Tap the location icon to share your current location.
   - A map view showing your location will be sent in the chat.

7. **Offline Access**:
   - Your chat messages will be stored locally on your device.
   - Messages remain accessible even if you go offline.
   - The app will synchronize with the server once you are back online.

## Technical Details

- **Framework**: The application is built with **React Native**, enabling cross-platform mobile development using JavaScript.
- **Development Tool**: **Expo** is used for development and testing, providing a set of tools and services for building and deploying React Native apps.
- **Database**: **Google Firestore** is used for real-time database functionality, allowing chat conversations to be stored and synchronized online.
- **Authentication**: **Google Firebase** provides anonymous authentication, allowing users to securely access the app without needing to create an account.
- **Image Storage**: Images are stored using **Firebase Cloud Storage**, ensuring that all media files are securely saved and accessible.
- **Local Storage**: **AsyncStorage** is used to store chat data locally on the device, providing offline access.
- **Chat Library**: The **Gifted Chat** library is used to create the chat interface and manage chat functionality.
