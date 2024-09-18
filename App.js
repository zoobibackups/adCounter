import React, { useEffect, useState } from 'react';
import { StyleSheet,Text, View } from 'react-native';
import AdView from './src/components/AdView';
import { hp, wp } from './src/constants/scaling';
import { requestPermission ,insertRecords,RecordingMethod,DeviceType, readRecord, readRecords, initialize ,getSdkStatus, SdkAvailabilityStatus} from 'react-native-health-connect';
const getLastWeekDate = () => {
  return new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000);
};

const getLastTwoWeeksDate = () => {
  return new Date(new Date().getTime() - 2 * 7 * 24 * 60 * 60 * 1000);
};

const random64BitString = () => {
  return Math.floor(Math.random() * 0xffffffffffffffff).toString(16);
};
const getTodayDate = () => {
  return new Date();
};
function App() {
  const [error, setError] = useState(false);
  const [stepsData, setStepsData] = useState("")
  useEffect(() => {
   
    initializeHealthConnect()
    checkAvailability()
    requestPermissions()
   readSampleData()
  },[])
  const initializeHealthConnect = async () => {
    const isInitialized = await initialize();
   // console.log(isInitialized, "initializeHealthConnectinitializeHealthConnects");
  
  };

  const checkAvailability = async () => {
    const status = await getSdkStatus();
    if (status === SdkAvailabilityStatus.SDK_AVAILABLE) {
     // console.log('SDK is available');
    }
  
    if (status === SdkAvailabilityStatus.SDK_UNAVAILABLE) {
      console.log('SDK is not available');
    }
  
    if (
      status === SdkAvailabilityStatus.SDK_UNAVAILABLE_PROVIDER_UPDATE_REQUIRED
    ) {
      console.log('SDK is not available, provider update required');
    }
  }

  const requestPermissions = () => {
    requestPermission([
      {
        accessType: 'read',
        recordType: "Steps",
      },
      {
        accessType: "write",
        recordType: "Steps",
      }
    ]).then((permissions) => {
     // console.log('Granted permissions ', { permissions });
    });
  };

  const insertSampleData = () => {
    insertRecords([
      {
        recordType: 'Steps',
        count: 1000,
        startTime: getLastWeekDate().toISOString(),
        endTime: getTodayDate().toISOString(),
        metadata: {
          clientRecordId: random64BitString(),
          recordingMethod:
            RecordingMethod.RECORDING_METHOD_AUTOMATICALLY_RECORDED,
          device: {
            manufacturer: 'Google',
            model: 'Pixel 4',
            type: DeviceType.TYPE_PHONE,
          },
        },
      },
    ])
      .then((ids) => {
        console.log('Records inserted ', { ids });
      })
      .catch((err) => {
        console.error('Error inserting records ', { err });
      });
  };
  
  const readSampleData = () => {
    
    readRecords('Steps', {
      timeRangeFilter: {
        operator: 'between',
        startTime: getLastTwoWeeksDate().toISOString(),
        endTime: getTodayDate().toISOString(),
      },
    }).then(({ records }) => {
      setStepsData(JSON.stringify(records))
      console.log('Retrieved records: ', JSON.stringify({ records }, null, 2)); 
    }).catch((error) => {
      console.log('Error retrieving records: ', error);
    })
  };
  return (
    <View style={styles.container}>
      <View style={{ width: wp(98),borderRadius:4, height: hp(50), backgroundColor: "#0000" }} >
        <AdView error={error} setError={setError} loadOnMount={true} />
      </View>
      <Text>{stepsData}</Text>
    </View>
  );
}

export default App;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: wp(100),
    height: hp(100),
    justifyContent: "center", alignItems: "center"
  },
  text: {
    fontSize: 28,
    lineHeight: 32,

  },
});
