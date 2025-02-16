

✅ Step 1: Create a Native Android Activity in Kotlin
    📍 Create a new Kotlin file inside android/app/src/main/java/com/yourapp/ named MyKotlinActivity.kt


📍 Register the Activity in AndroidManifest.xml
    <activity android:name=".MyKotlinActivity"/>


✅ Step 2: Expose the Activity to React Native
    📍 Create a new Kotlin file MyKotlinModule.kt inside android/app/src/main/java/com/yourapp/


✅ Step 3: Link Kotlin Module to React Native
    📍 Create a new Kotlin file MyKotlinPackage.kt inside android/app/src/main/java/com/yourapp/


✅ Step 4: Register the Package in MainApplication.kt
    📍 In your MainApplication.kt:

✅ Step 5: Call Native Screen from React Native (JavaScript)
    Now, in your React Native project (e.g., App.js)

    import React from 'react';
    import { Button, View } from 'react-native';
    import { NativeModules } from 'react-native';
    
    const { MyKotlinModule } = NativeModules;
    
    const App = () => {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Button
            title="Open Native Kotlin Screen"
            onPress={() => MyKotlinModule.openNativeScreen()}
          />
        </View>
      );
    };
    
    export default App;



