# On Android, removing an `accessibilityValue`'s text leaves it in the content description

`ReproducerApp/App.tsx` renders a `Pressable` and a plain `View`, each with `accessibilityLabel="Country"` and
`accessibilityValue={{ text: 'Ukraine' }}`, and a button that re-renders both with `accessibilityValue` undefined.

React Native 0.88.0, release build, Android 16 emulator (x86_64):

```sh
cd ReproducerApp
yarn install
cd android && ./gradlew assembleRelease -PreactNativeArchitectures=x86_64 && cd ..
adb install -r android/app/build/outputs/apk/release/app-release.apk
adb shell am start -W -n com.reproducerapp/.MainActivity
adb shell uiautomator dump /sdcard/view.xml && adb pull /sdcard/view.xml before.xml
# tap "REMOVE THE VALUE", then
adb shell uiautomator dump /sdcard/view.xml && adb pull /sdcard/view.xml after.xml
```

| Subject | Before | After, expected | After, seen |
| --- | --- | --- | --- |
| `pressable-subject` | `content-desc="Country, Ukraine"` | `Country` | `Country, Ukraine` |
| `view-subject` | `content-desc="Country, Ukraine"` | `Country` | empty |
