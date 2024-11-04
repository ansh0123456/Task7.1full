import React, { Component } from 'react'
import { Message } from 'semantic-ui-react'

class Toast extends Component {
  state = { visible: true }

  render() {
    if (this.state.visible) {
      return (
        <Message
          header={this.props.message.includes("Failed") ? "Login Failed" : "Login Successful"}
          content={this.props.message}
          success={!this.props.message.includes("Failed")}
          error={this.props.message.includes("Failed")}
        />
      )
    }
    return null;
  }
}

export default Toast;
