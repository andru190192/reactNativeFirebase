import React, { useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity
} from 'react-native';
import auth from '@react-native-firebase/auth';
import Login from './src/screens/login';

const VISION_API_KEY = 'AIzaSyC1gdfBWhu1K4etrIQT6C1f-Iz9JBElR-Q';

const App = () => {

  useEffect(() => {
    auth()
        .signInWithEmailAndPassword('caguachisaca@gmail.com', '123456')
        .then(() => {
          console.log('User signed in anonymously');
        })
        .catch(error => {
          if (error.code === 'auth/operation-not-allowed') {
            console.log('Enable anonymous in your firebase console.');
          }
          console.error(error);
        });
  }, [])

  async function processImage() {
    let body = JSON.stringify({
      requests: [
        {
          features: [{ type: 'LABEL_DETECTION' }],
          image: {
            source: {
              imageUri: 'https://placeralplato.com/files/2015/11/Pan-para-hot-dogs-640x480.jpg'
            }
          }
        }
      ]
    })
    const response = await fetch(
        `https://vision.googleapis.com/v1/images:annotate?key=${VISION_API_KEY}`,
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          method: 'POST',
          body: body
        }
    )
    const responseJson = await response.json();
    console.log('responseJson', responseJson);
    const getLabel = responseJson.responses[0].labelAnnotations.map(
        obj => console.log(obj.description)
    )
  }

  function onHandlerLogout() {
    auth().signOut().then(() => console.log('User signed out!'));
  }

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic">
          <View style={styles.body}>
            <Login
                onHandlerLogout={onHandlerLogout}
            />
            <TouchableOpacity onPress={processImage}>
              <Text>Comprobar imagen</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: 'white',
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: 'black',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: 'black',
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: 'black',
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
