# Material-UI Phone Field

Simple React phone input field based on [Material-UI](https://material-ui.com/), [`i18n-iso-countries`](https://www.npmjs.com/package/i18n-iso-countries) and [`libphonenumber-js`](https://www.npmjs.com/package/libphonenumber-js). **Overall look and feel will change when we add country flags.**

## Installation

To install the component run this command:

```
npm i -S @ambiot/material-ui-phone-field
```

## API

### PhoneField (default export)

| Prop Name      | Type                                | Default      | Description                                                                                                                                                                                                                                                    |
| -------------- | ----------------------------------- | ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| value          | string                              | empty string | Accepts plain phone number, without any formatting. For example, `+79031234567`                                                                                                                                                                                |
| onChange       | `(value: string) => void`, required | —            | Callback when user changes the input. Returns plain phone number without any formatting. If user didn't choose the country, returns just the value of the text field. If user did, returns text field value with plus sign and country calling code prepended. |
| defaultCountry | string                              | `null`       | ISO country code to be selected by default                                                                                                                                                                                                                     |
| fullWidth      | boolean                             | `false`      | If `true`, field will take 100% of the available width.                                                                                                                                                                                                        |
| language       | string                              | `en`         | Language in which country names are displayed. Currently supports only `en` and `ru` values for English and Russian language respectively.                                                                                                                     |

## To-Do

- [ ] Correctly expose `registerLocale` method of `i18n-iso-countries` without increasing the bundle size, so user can required languages manually.
- [ ] Add country flags to `Select` field from the `flags` folder. See [this TSDX issue](https://github.com/jaredpalmer/tsdx/issues/533) and [this StackOverflow question](https://stackoverflow.com/questions/60560497/how-to-get-static-files-served-dynamically-with-rollup-and-work-along-with-node).

## Contributing

The package is built using [TSDX](https://github.com/jaredpalmer/tsdx). Refer to its documentation if you need some advanced stuff. Here's simple stuff:

1. Clone the repository: `git clone https://github.com/ambiot-llc/material-ui-phone-field.git`
2. Get inside the folder: `cd material-ui-phone-field`
3. Install all the general dependencies: `npm install`
4. Run TSDX watcher using `npm start`
5. Open another terminal and get inside the `example` folder: `cd example`
6. Install all dependencies needed to launch the example: `npm install`
7. Run `npm start` to launch the example app
8. Library is located in `src`. Edit the code and watch the changes in the browser
