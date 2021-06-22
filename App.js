import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { useAssets } from "expo-asset";
import { EncodingType, readAsStringAsync } from "expo-file-system";

export default function App() {

  const [beatlesListAsset] = useAssets([require('./assets/beatles.csv')]);
  const [beatlesList, setBeatlesList] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const loadBeatles = async () => {
      let beatlesCSV;
      try {
        beatlesCSV = await readAsStringAsync(beatlesListAsset[0].localUri, { encoding: EncodingType.UTF8 });
        const beatlesNames = beatlesCSV.split('\n').map(line => line.split(','));
        setBeatlesList(beatlesNames.map(beatle => ({ firstName: beatle[0], lastName: beatle[1] })));
      } catch (e) {
        console.error(`Failed to load beatle`, { beatlesListAsset, beatlesCSV, error: e })
        console.log("readAsStringAsync failed with", e)
        setErrorMessage(e.message);
      }
    }

    if (beatlesListAsset && beatlesListAsset[0] && beatlesListAsset[0].localUri) {
      loadBeatles();
    }
  }, [beatlesListAsset])

  return (
    <View style={styles.container}>
      <Text>A full list of Beatles:</Text>
      {beatlesList.map(b => <Text key={b.firstName}>{b.firstName} {b.lastName}</Text>)}
      {errorMessage.length > 0 && <Text>Got an error: {errorMessage}</Text>}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
