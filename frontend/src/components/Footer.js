function Footer() {
  return (
    <footer style={styles.footer}>
      <p>
        © 2026 Blog Platform | Developed by Ashmika
      </p>
    </footer>
  );
}

const styles = {
  footer: {
    textAlign: "center",
    padding: "20px",
    marginTop: "40px",
    backgroundColor: "#1f2937",
    color: "white",
    fontSize: "16px",
  },
};

export default Footer;