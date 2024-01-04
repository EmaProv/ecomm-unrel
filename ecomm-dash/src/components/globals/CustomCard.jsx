import React from "react";

class CustomCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      background_color: "",
    };
  }

  render() {
    const { background_color } = this.props;
    return (
      <div className={`global-card-${background_color}`}>
        {this.props.children}
      </div>
    );
  }
}

export default CustomCard;
