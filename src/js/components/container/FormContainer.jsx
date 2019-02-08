import React, { Component } from "react";

import Input from "../presentational/Input.jsx";

class FormContainer extends Component {
  state = {seo_title: ""};

  handleChange = (event) => {
    this.setState({ [event.target.id]: event.target.value });
  };

  render() {
    const { seo_title } = this.state;

    return (
      <form id="article-form">
        <Input
          text="SEO title"
          label="seo_title"
          type="text"
          id="seo_title"
          value={seo_title}
          handleChange={this.handleChange}
        />
      </form>
    );
  }
}

export default FormContainer;
