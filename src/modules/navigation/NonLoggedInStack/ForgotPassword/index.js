import React from "react";
import { ForgotPassword } from "../../../../containers";
import { Icon, Title } from "../../../../components";
import { white } from "../../../../constants";

const forgotPassword = {
  FORGOT_PASSWORD: {
    screen: ForgotPassword,
    navigationOptions: {
      title: "Forgot Password",
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
          testID="forgotPasswordTitle"
          color="white"
        />
      )
    }
  }
};

export default forgotPassword;
