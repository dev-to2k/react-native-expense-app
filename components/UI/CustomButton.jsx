import { Ionicons } from "@expo/vector-icons"; // Import thư viện icon
import { Pressable, StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../../constants/style";

const CustomButton = ({ children, onPress, mode, style, outline, icon }) => {
  return (
    <View style={style}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [
          pressed && styles.pressed,
          outline && styles.outline,
        ]}
      >
        {({ pressed }) => (
          <View
            style={[
              styles.button,
              mode === "flat" && styles.flat,
              outline && styles.outlineButton,
              styles.content,
            ]}
          >
            {icon && (
              <Ionicons
                name={icon}
                size={18}
                color={
                  pressed
                    ? outline
                      ? GlobalStyles.colors.error500
                      : GlobalStyles.colors.primary200
                    : outline
                    ? GlobalStyles.colors.error50
                    : "white"
                }
                style={styles.icon}
              />
            )}
            <Text
              style={[
                styles.buttonText,
                mode === "flat" && styles.flatText,
                outline && styles.outlineText,
                pressed && outline && styles.pressedText,
              ]}
            >
              {children}
            </Text>
          </View>
        )}
      </Pressable>
    </View>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  button: {
    borderRadius: 4,
    padding: 8,
    backgroundColor: GlobalStyles.colors.primary500,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  flat: {
    backgroundColor: "transparent",
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
  flatText: {
    color: GlobalStyles.colors.primary400,
  },
  pressed: {
    opacity: 0.75,
    backgroundColor: GlobalStyles.colors.error50,
    borderRadius: 4,
  },
  outlineButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: GlobalStyles.colors.error50,
  },
  outlineText: {
    color: GlobalStyles.colors.error50,
  },
  pressedText: {
    color: GlobalStyles.colors.error500,
  },
  icon: {
    marginRight: 8,
  },
});
