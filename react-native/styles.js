import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  heading: {
    alignItems: "center",
    color: "white",
    display: "flex",
    fontSize: 25,
    fontWeight: "bold",
    justifyContent: "center",
    margin: 0,
    textTransform: "uppercase",
    width: "75%"
  },
  headingContainer: {
    backgroundColor: "rgba(255,255,255,.5)",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10
  },
  mainBackground: {
    flex: 1,
    height: "100%",
    width: "100%"
  }
});
