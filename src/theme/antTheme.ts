const antTheme = {
  token: {
    colorPrimary: "#4625A0",
    colorInfo: "#4625A0",
  },
  components: {
    Layout: {
      bodyBg: "rgb(255,255,255)",
    },
    Menu: {
      itemSelectedColor: "#000",
      itemSelectedBg: "#0000000a",
      fontSize: 12,
    },
    Table: {
      headerBg: "#B6C2FF",
      headerColor: "#30303",
      colorBgContainer: "#F9F9FA",
      headerSplitColor: "#B6C2FF",
      colorText: "#5C5C5C",
      borderColor: "var(--color-section-bg)",
      rowHoverBg: "#F4F8FF",
    },
    Modal: {
      colorIcon: "rgba(255,255,255,0.45)",
      contentBg: "var(--color-section-bg)",
      colorText: "var(--color-text-color)",
    },

    Button: {
      defaultBg: "var(--color-main)",
      defaultColor: "rgba(255,255,255,0.88)",
    },
    Popconfirm: {
      colorWarning: "rgb(205,3,53)",
    },
    Form: {
      // labelFontSize: 16,
    },
  },
};

export default antTheme;
