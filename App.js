/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
    TouchableOpacity
} from 'react-native';

import {
  Header,
  Colors,
} from 'react-native/Libraries/NewAppScreen';

const VISION_API_KEY = 'AIzaSyC1gdfBWhu1K4etrIQT6C1f-Iz9JBElR-Q';

const App = () => {

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

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <Header />
          {global.HermesInternal == null ? null : (
            <View style={styles.engine}>
              <Text style={styles.footer}>Engine: Hermes</Text>
            </View>
          )}
          <View style={styles.body}>
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
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
