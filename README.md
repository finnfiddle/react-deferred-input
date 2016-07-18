# React Deferred Input

```bash
npm install react-deferred-input
```

## What is the purpose of this component?

Form inputs in react can either be controller or uncontrolled (see [here](https://facebook.github.io/react/docs/forms.html)). Controlled components always display the `value` prop they are passed and need to trigger the `onChange` handler every time a character is added or removed from them so that they can be updated. Uncontrolled components render the initial `defaultValue` prop they get passed and after that they render what the user types into them.

This component gives you the functionality of a controlled component that always displays the `value` prop that it is given EXCEPT when a user is focused on the input then it waits till the user blurs and then only triggers the `onChange` (and `onBlur`) handlers if the value has change.

This can dramatically reduce the number of network requests that get sent.

## Example Usage

```javascript
import React, { Component } from 'react';
import DeferredInput from 'react-deferred-input';

class MyComponent extends Component {
  render() {
    return (
      <DeferredInput value='initial value' onChange={this.handleChange} />
    );
  }

  handleChange(value) {
    console.log("this is only called when the input is blurred with the value: ", value);
  }
}

```

## Options/Available props

| Prop Name      | Description                                                       | Default Value       |
|----------------|-------------------------------------------------------------------|---------------------|
| value          | input value                                                       | String: ''          |
| onChange       | handler called with one argument (input value) on blur (required) | Function: undefined |
| onBlur         | handler called with one argument (input value) on blur            | Function: undefined |
| blurOnEnter    | should input blur when press ENTER key                            | Boolean: false      |
| focusOnMount   | should input be focused when initially mounted                    | Boolean: false      |
| clearOnChange  | should input value be cleared on blur                             | Boolean: false      |
| inputComponent | component to be used for actual input                             | 'input'             |

Any other custom props will be passed on to input component.

## License

MIT
