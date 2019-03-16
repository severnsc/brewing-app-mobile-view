import React from "react";
import { Login } from "../../../../screens";
import { Icon, Title } from "../../../../components";
import { white } from "../../../../constants";

const login = {
  LOGIN: {
    screen: Login,
    navigationOptions: {
      title: "Login",
      headerStyle: { height: 60 },
      headerTransparent: true,
      headerTitleStyle: { color: white, fontSize: 40 },
      headerLeftContainerStyle: { paddingLeft: 10 },
      headerBackImage: () => (
        <Icon name="ios-arrow-back" size="lg" color={white} />
      ),
      headerTitle: ({ allowFontScaling, style, children }) => (
        <Title
          value={children}
          style={style}
          allowFontScaling={allowFontScaling}
          testID="loginTitle"
          color="white"
        />
      )
    }
  }
};

export default login;
