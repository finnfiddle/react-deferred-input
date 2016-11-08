import ReactDOM from 'react-dom';
import React from 'react';
import DeferredInput from 'react-deferred-input';

ReactDOM.render((
  <DeferredInput
    value='initial value'
    onChange={value => alert(value)}
    focusOnMount={true}
  />
), document.getElementById('example-1'));

ReactDOM.render((
  <DeferredInput
    value='initial value'
    onChange={value => alert(value)}
    blurOnEnter={true}
  />
), document.getElementById('example-2'));

ReactDOM.render((
  <DeferredInput
    value='initial value'
    onChange={value => alert(value)}
    clearOnChange={true}
  />
), document.getElementById('example-3'));

ReactDOM.render((
  <DeferredInput
    value='initial value'
    onChange={value => alert(value)}
    inputComponent='textarea'
  />
), document.getElementById('example-4'));

class CustomInput extends React.Component {
  render() {
    return (
      <input
        style={{ borderColor: 'cyan' }}
        {...this.props}
      />
    );
  }
}

ReactDOM.render((
  <DeferredInput
    value='initial value'
    onChange={value => alert(value)}
    inputComponent={CustomInput}
  />
), document.getElementById('example-5'));
