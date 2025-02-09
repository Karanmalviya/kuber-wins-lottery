import React, { Component } from "react";
import "../styles/errorboundary.css";
import App from "../app/App";
function withErrorHandling(WrappedComponent) {
  return class extends Component {
    constructor(props) {
      super(props);
      this.state = {
        error: null,
      };
    }

    static getDerivedStateFromError(error) {
      return { error: error };
    }

    componentDidCatch(error, errorInfo) {
      console.error(error, errorInfo);
    }

    async componentDidMount() {
      try {
        // await this.props.asyncData();
        this.setState({ error: false });

        <App />;
      } catch (error) {
        console.error("Async error:", error);
        this.setState({ error: true });
      }
    }

    render() {
      const { error } = this.state;
      if (error) {
        return (
          <div id="notfound">
            <div class="notfound">
              <div class="notfound-404"></div>
              <h1>500</h1>
              <h2>Oops! Something went wrong.</h2>
              <p>
                Sorry but the page you are looking for does not exist, have been
                removed. name changed or is temporarily unavailable
              </p>
              <a href="#">Back to homepage</a>
            </div>
          </div>
        );
      }

      return <WrappedComponent {...this.props} />;
    }
  };
}

export { withErrorHandling };
