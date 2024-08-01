import { TouchableOpacity, Text, View, StyleSheet } from "react-native";
import { useActionSheet } from '@expo/react-native-action-sheet';
import * as Location from 'expo-location';
import * as ImagePicker from 'expo-image-picker';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const CustomActions = ({storage, onSend, wrapperStyle, iconTextStyle, userID }) => {
    const actionSheet = useActionSheet();

    const onActionPress = () => {
        const options = ['Choose From Library', 'Take Picture', 'Send Location', 'Cancel'];
        const cancelButtonIndex = options.length - 1;
        actionSheet.showActionSheetWithOptions(
            {
              options,
              cancelButtonIndex,
            },
            async (buttonIndex) => {
              switch (buttonIndex) {
                case 0:
                    pickImage();
                  return;
                case 1:
                    takePhoto();
                  return;
                case 2:
                    getLocation();
                default:
              }
            },
          );
    };

    const generateReference = (uri) => {
        const timeStamp = (new Date()).getTime();
        const imageName = uri.split("/")[uri.split("/").length - 1];
        return `${userID}-${timeStamp}-${imageName}`;
      }
    
      const uploadAndSendImage = async (imageURI) => {
        try {
            const uniqueRefString = generateReference(imageURI);
            const newUploadRef = ref(storage, uniqueRefString);
            const response = await fetch(imageURI);
            const blob = await response.blob();
            await uploadBytes(newUploadRef, blob);
            const imageURL = await getDownloadURL(newUploadRef);
            onSend([{ image: imageURL, _id: uniqueRefString, createdAt: new Date(), user: { _id: userID }}]);
        } catch (error) {
            console.error("Error uploading image:", error);
        }
    };
    
      const pickImage = async () => {
        let permissions = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permissions?.granted) {
          let result = await ImagePicker.launchImageLibraryAsync();
          if (!result.canceled) await uploadAndSendImage(result.assets[0].uri);
          else Alert.alert("Permissions haven't been granted.");
        }
      }
    
      const takePhoto = async () => {
        let permissions = await ImagePicker.requestCameraPermissionsAsync();
        if (permissions?.granted) {
          let result = await ImagePicker.launchCameraAsync();
          if (!result.canceled) await uploadAndSendImage(result.assets[0].uri);
          else Alert.alert("Permissions haven't been granted.");
        }
      }
    
      const getLocation = async () => {
        try {
            let permissions = await Location.requestForegroundPermissionsAsync();
            if (permissions?.granted) {
                const location = await Location.getCurrentPositionAsync({});
                if (location) {
                    onSend([{
                        location: {
                            longitude: location.coords.longitude,
                            latitude: location.coords.latitude,
                        },
                        _id: new Date().toISOString(),
                        createdAt: new Date(),
                        user: { _id: userID }
                    }]);
                } else {
                    Alert.alert("Error", "Failed to fetch location.");
                }
            } else {
                Alert.alert("Permissions haven't been granted.");
            }
        } catch (error) {
            console.error("Error fetching location:", error);
        }
    };

  return (
    <TouchableOpacity style={styles.container} 
    onPress={onActionPress}>
      <View style={[styles.wrapper, wrapperStyle]}>
        <Text style={[styles.iconText, iconTextStyle]}>+</Text>
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
    container: {
      width: 26,
      height: 26,
      marginLeft: 10,
      marginBottom: 10,
    },
    wrapper: {
      borderRadius: 13,
      borderColor: '#b2b2b2',
      borderWidth: 2,
      flex: 1,
    },
    iconText: {
      color: '#b2b2b2',
      fontWeight: 'bold',
      fontSize: 10,
      backgroundColor: 'transparent',
      textAlign: 'center',
    },
  });

export default CustomActions;
