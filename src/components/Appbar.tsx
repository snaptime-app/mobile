import React from "react";
import { Appbar } from "react-native-paper";

type AppBarProps = {
  title: string;
  subtitle?: string;
  backAction?: () => void;
  actions?: { icon: string; onPress: () => void }[];
};

export const CustomAppBar: React.FC<AppBarProps> = ({
  title,
  subtitle,
  backAction,
  actions,
}) => {
  return (
    <Appbar.Header>
      {backAction && <Appbar.BackAction onPress={backAction} />}
      <Appbar.Content title={title} subtitle={subtitle} />
      {actions?.map((action, index) => (
        <Appbar.Action
          key={index}
          icon={action.icon}
          onPress={action.onPress}
        />
      ))}
    </Appbar.Header>
  );
};
