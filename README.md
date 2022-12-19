# ts-react-native-barcode-scanner

Barcode Scanner

## Installation

```sh
npm install ts-react-native-barcode-scanner
```

## Usage


Install peer dependencies

```sh
yarn add react-native-reanimated react-native-vision-camera vision-camera-code-scanner
```

Configure babel.config.js

```js
...
plugins: [
    ...
    [
      'react-native-reanimated/plugin',
      {
        globals: ['__scanCodes'],
      },
    ],
    ...
  ],
...

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
