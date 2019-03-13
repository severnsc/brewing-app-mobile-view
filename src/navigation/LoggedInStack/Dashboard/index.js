import React from "react";
import { Title } from "../../../components";

const dashboard = {
  DASHBOARD: {
    screen: () => null,
    navigationOptions: {
      title: "Home",
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

export default dashboard;
