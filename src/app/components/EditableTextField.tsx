/// <reference path="../../../typings/index.d.ts" />

import * as React from 'react';

export interface IEditableTextField {
  text: string;
  name: string;
}

interface IEditableTextFieldProps {
  onSave: ( textfield: IEditableTextField ) => void;
  text: string;
  name: string;
  editing?: boolean;
  placeholder?: string;
}

interface IEditableTextFieldState {
  text: string;
  editing?: boolean;
}

class EditableTextField extends React.Component<IEditableTextFieldProps, IEditableTextFieldState> {
  static propTypes = {
    onSave: React.PropTypes.func.isRequired,
    text: React.PropTypes.string.isRequired,
    name: React.PropTypes.string.isRequired,
    editing: React.PropTypes.bool,
    placeholder: React.PropTypes.string
  };

  constructor(props: any, context: any) {
    super(props, context);
    this.state = {
      text: this.props.text || '',
      editing: this.props.editing
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e: any) {
    const text = e.target.value.trim();
    if (e.which === 13) {
      this.props.onSave( {text: text, name: this.props.name} );
      this.setState({text: text, editing: !this.state.editing});
    }
  }

  handleChange(e: any) {
    this.setState({text: e.target.value});
  }

  handleClick(e: any) {
    this.setState({text: this.state.text, editing: !this.state.editing});
  }

  render() {
    return (
      <span onClick={this.handleClick}>
        {this.state.editing || this.props.editing
          ? <input
              className='edit'
              type='text'
              name={this.props.name}
              placeholder={this.props.placeholder}
              autoFocus={true}
              value={this.state.text}
              onChange={this.handleChange}
              onKeyDown={this.handleSubmit}
            />
          : this.state.text
        }
      </span>
    );
  }
}

export default EditableTextField;
