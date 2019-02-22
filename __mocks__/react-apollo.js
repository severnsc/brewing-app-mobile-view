import React from "react";

const data = {
  user: {
    username: null,
    email: "",
    errors: []
  }
};

export const mutate = jest.fn(
  ({ variables }) =>
    variables.username === "invalid" || variables.email === "invalid"
);

export const graphql = jest.fn();

export const compose = jest.fn(() =>
  jest.fn(
    Component =>
      class Container extends React.Component {
        constructor(props) {
          super(props);
          this.state = {
            data
          };
        }

        mutate = ({ variables }) => {
          if (mutate({ variables })) {
            if (variables.username) {
              this.setState({
                data: {
                  user: {
                    ...this.state.data.user,
                    username: variables.username,
                    errors: [
                      ...this.state.data.user.errors,
                      {
                        message: "Username is invalid!",
                        location: {
                          node: "user",
                          field: "username"
                        }
                      }
                    ]
                  }
                }
              });
            } else {
              this.setState({
                data: {
                  user: {
                    ...this.state.data.user,
                    email: variables.email,
                    errors: [
                      ...this.state.data.user.errors,
                      {
                        message: "Email is invalid!",
                        location: {
                          node: "user",
                          field: "email"
                        }
                      }
                    ]
                  }
                }
              });
            }
          } else {
            this.setState({
              data: {
                user: {
                  ...this.state.data.user,
                  username: variables.username
                }
              }
            });
          }
        };

        render() {
          const props = this.props;
          return (
            <Component data={this.state.data} mutate={this.mutate} {...props} />
          );
        }
      }
  )
);
