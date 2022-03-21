export const CodeEditorSupportedThemes = () => {
  return [
    "Chaos",
    "Vibrant ink",
    "Terminal",
    "Monokai",
    "Dracula",
    "Chrome",
    "Xcode",
    "Eclipse",
    "Dreamweaver",
    "Dawn",
  ];
};

export const getCodeEditorLanguageMode = (languageName) => {
  if (languageName === "Java" || languageName === "java") {
    return "java";
  } else if (languageName === "C" || languageName === "c") {
    return "c_cpp";
  } else if (languageName === "C++") {
    return "c_cpp";
  } else if (languageName === "Php" || languageName === "php") {
    return "php";
  } else if (languageName === "Perl" || languageName === "perl") {
    return "perl";
  } else if (languageName === "Python" || languageName === "python") {
    return "python";
  } else if (languageName === "Ruby" || languageName === "ruby") {
    return "ruby";
  } else if (languageName === "Sql" || languageName === "sql") {
    return "sql";
  } else if (
    languageName === "C#" ||
    languageName === "c#" ||
    languageName === "csharp"
  ) {
    return "csharp";
  } else if (languageName === "Vb" || languageName === "Vb.net") {
    return "vbscript";
  } else if (languageName === "Swift" || languageName === "swift") {
    return "swift";
  } else if (languageName === "Javascript" || languageName === "javascript") {
    return "javascript";
  }
};
