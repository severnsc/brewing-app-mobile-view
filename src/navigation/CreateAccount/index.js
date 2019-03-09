import React from "react";
import { CreateAccount } from "../../containers";
import { Icon, Title } from "../../components";
import { white } from "../../constants";

const createAccount = {
  CREATE_ACCOUNT: {
    screen: CreateAccount,
    navigationOptions: {
      title: "Sign Up",
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
          testID="createAccountTitle"
          color="white"
        />
      )
    }
  }
};

export default createAccount;
