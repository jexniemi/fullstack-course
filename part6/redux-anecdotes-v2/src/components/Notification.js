import React from 'react'
import { connect } from 'react-redux'

class Notification extends React.Component {

  render() {
    const style = {
      border: 'solid',
      padding: 10,
      borderWidth: 1
    }
    return (
      <div style={style}>
        {this.props.notification.notification}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    notification: state
  }
}

const ConnectedNotification = connect(mapStateToProps)(Notification)

export default ConnectedNotification
