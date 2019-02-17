import React from "react";

const data = {
  user: {
    username: null,
    errors: []
  }
};

export const graphql = jest.fn(() =>
  jest.fn(
    Component =>
      class Container extends React.Component {
        constructor(props) {
          super(props);
          this.state = {
            data
          };
        }

        mutate = jest.fn(({ variables }) => {
          if (variables.username === "invalid") {
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
          }
        });

        render() {
          return <Component data={this.state.data} mutate={this.mutate} />;
        }
      }
  )
);
