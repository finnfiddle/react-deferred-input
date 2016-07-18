import React, { Component } from 'react';

// keyboard key codes
const KEY_CODES = {
  ENTER: 13,
};

// same as lodash.omit - rewritten so that dropdown can be made into standalone module
const omit = (obj, keys) => {
  const result = Object.assign({}, obj);
  keys.forEach(key => delete result[key]);
  return result;
};

const noop = () => {};

const isSet = val => val !== null && typeof val !== 'undefined';

class DeferredInput extends Component {

  constructor() {
    super();
    // initial state
    this.state = { value: '' };
  }

  componentDidMount() {
    // update state with props
    this.setState({ value: this.props.value || '' });
    // focus on element when it mounts if `props.focusOnMount` is set to true
    if (this.props.focusOnMount) {
      this.focus();
    }
  }

  componentWillReceiveProps(nextProps) {
    // update value if new value prop is received
    if (this.props.value !== nextProps.value) {
      this.setState({ value: nextProps.value });
    }
  }

  // internal input `onChange` handler
  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  // `onBlur` handler
  handleBlur() {
    // call `props.onBlur` if set
    this.props.onBlur(this.state.value);
    // call `props.onChange` of provided and value is changed
    if (isSet(this.props.onChange) && this.state.value !== this.props.value) {
      this.props.onChange(this.state.value);
    }
    // if `props.clearOnChange` is true then clear the input when blurred
    if (this.props.clearOnChange) this.setState({ value: '' });
  }

  // get props for input where `onChange`, `onBlur` and `value` are replaced with private methods
  getChildProps() {
    const privateProps = [
      'value',
      'onChange',
      'onBlur',
      'isInput',
      'onKeyDown',
    ];

    return Object.assign({}, omit(this.props, privateProps), {
      value: isSet(this.state.value) ? this.state.value : '',
      onChange: this.handleChange.bind(this),
      onBlur: this.handleBlur.bind(this),
    });
  }

  // trigger the specified action on the first textarea or input found within an element
  // (or the element itself)
  actionOnElementOrChild(element, action) {
    if (['TEXTAREA', 'INPUT'].indexOf(element.tagName) > -1) {
      return element[action]();
    } else if (element.childNodes.length) {
      [].forEach.call(element.childNodes, child => this.actionOnElementOrChild(child, action));
    }
  }

  // trigger blur on element
  blur() {
    this.actionOnElementOrChild(ReactDOM.findDOMNode(this.refs.input), 'blur');
  }

  // trigger focus on element
  focus() {
    this.actionOnElementOrChild(ReactDOM.findDOMNode(this.refs.input), 'focus');
  }

  // key down event handler
  handleKeyDown(event) {
    // if `props.blurOnEnter` and key pressed is ENTER then call blur()
    if (this.props.blurOnEnter && event.keyCode === KEY_CODES.ENTER) {
      this.blur();
    }
    if (this.props.onKeyDown) this.props.onKeyDown(event);
  }

  render() {
    const props = Object.assign({}, this.getChildProps(), {
      onKeyDown: this.handleKeyDown.bind(this),
    });

    return <this.props.inputComponent {...props} ref='input' />;
  }
}

DeferredInput.defaultProps = {
  blurOnEnter: false,
  focusOnMount: false,
  onBlur: noop,
  clearOnChange: false,
  inputComponent: 'input',
};

export default DeferredInput;
