import React from "react";

class AccordionMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contentVisible: false,
      title: "",
    };

    this.toggleContentVisible = this.toggleContentVisible.bind(this);
  }

  toggleContentVisible() {
    this.setState((prevState) => {
      return { contentVisible: !prevState.contentVisible };
    });
  }
  render() {
    const { title } = this.props;
    return (
      <div className="accordion_container">
        <div className="accordion">
          <div className="accordion_title" onClick={this.toggleContentVisible}>
            <h2>{title}</h2>
            <h2>&#8595;</h2>
          </div>
        </div>

        <div
          className={`accordion_content ${
            this.state.contentVisible ? "show_content" : ""
          }`}
        >
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default AccordionMenu;
