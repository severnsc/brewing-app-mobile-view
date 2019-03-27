import React from "react";
import { ForgotPassword } from "../../../../containers";
import { Icon, Subtitle } from "../../../../components";
import { white } from "../../../../constants";

const forgotPassword = {
  FORGOT_PASSWORD: {
    screen: ForgotPassword,
    navigationOptions: {
      title: "Forgot Password",
      headerStyle: { height: 60 },
      headerTransparent: true,
      headerLeftContainerStyle: { paddingLeft: 10 },
      headerBackImage: () => (
        <Icon name="ios-arrow-back" size="lg" color={white} />
      ),
      headerTitle: ({ allowFontScaling, style, children }) => (
        <Subtitle
          value={children}
          style={style}
          allowFontScaling={allowFontScaling}
          testID="forgotPasswordTitle"
          color="white"
        />
      )
    }
  },
  FORGOT_PASSWORD_CONFIRM: {
    screen: () => null,
    navigationOptions: {
      title: "Forgot Password",
      headerStyle: { height: 60 },
      headerTransparent: true,
      headerLeft: () => null,
      headerTitle: ({ allowFontScaling, style, children }) => (
        <Subtitle
          value={children}
          style={style}
          allowFontScaling={allowFontScaling}
          testID="forgotPasswordConfirmTitle"
          color="white"
        />
      )
    }
  }
};

export default forgotPassword;
