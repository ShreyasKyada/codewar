const getCompilerInfo = (languageName) => {
  if (languageName === "Java" || languageName === "java") {
    return {
      name: "Java",
      compiler_name: "java",
      index: "4",
    };
  } else if (languageName === "C" || languageName === "c") {
    return {
      name: "C",
      compiler_name: "c",
      index: "5",
    };
  } else if (languageName === "C++") {
    return {
      name: "C++",
      compiler_name: "cpp",
      index: "5",
    };
  } else if (languageName === "Php" || languageName === "php") {
    return {
      name: "Php",
      compiler_name: "php",
      index: "4",
    };
  } else if (languageName === "Perl" || languageName === "perl") {
    return {
      name: "Perl",
      compiler_name: "perl",
      index: "4",
    };
  } else if (languageName === "Python" || languageName === "python") {
    return {
      name: "Python 3",
      compiler_name: "python3",
      index: "4",
    };
  } else if (languageName === "Ruby" || languageName === "ruby") {
    return {
      name: "Ruby",
      compiler_name: "ruby",
      index: "4",
    };
  } else if (languageName === "Sql" || languageName === "sql") {
    return {
      name: "Sql",
      compiler_name: "sql",
      index: "4",
    };
  } else if (
    languageName === "C#" ||
    languageName === "c#" ||
    languageName === "csharp"
  ) {
    return {
      name: "C#",
      compiler_name: "csharp",
      index: "4",
    };
  } else if (languageName === "Vb" || languageName === "Vb.net") {
    return {
      name: "Vb.net",
      compiler_name: "vbn",
      index: "4",
    };
  } else if (languageName === "Swift" || languageName === "swift") {
    return {
      name: "Swift",
      compiler_name: "swift",
      index: "4",
    };
  } else if (languageName === "Javascript" || languageName === "javascript") {
    return {
      name: "Javascript",
      compiler_name: "nodejs",
      index: "4",
    };
  }
};

export const codeRuner = async (code, languageName, stdin, stdout) => {
  const activeLanguage = getCompilerInfo(languageName);
  const executionData = {
    script: code,
    language: activeLanguage.compiler_name,
    versionIndex: activeLanguage.index,
    stdin: stdin,
    clientId: "33d3b212da3e6a652e9349451af6a753",
    clientSecret:
      "55bc5ea55d088288dcbe9dd0156f558b263ce5c673a4ddaab0710aa769ca359e",
  };

  const obj = await fetch("/runCode", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(executionData),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.statusCode === 200 && res.cpuTime !== null) {
        if (stdout === "customOutput") {
          return {
            error: {
              errorHeading: "none",
              error: "",
            },
            output: res.output,
          };
        } else {
          if (res.output === stdout) {
            // if output is matched then we display it into tab and say congratulations..
            return {
              error: {
                errorHeading: "none",
                error: "",
              },
              output: res.output,
            };
          } else {
            //else we print Compile time error
            return {
              error: {
                errorHeading: "Wrong Answer",
                error: "Wrong Answer",
              },
              output: res.output,
            };
          }
        }
      } else if (res.output) {
        let output = res.output;
        output = output.replace(/jdoodle/g, "CodeWar");
        return {
          error: {
            errorHeading: "Compilation error",
            error: output,
          },
          output: "",
        };
      } else {
        console.log("Somthing went wrong");
        // if all 200 free creadit is used.. and this error is not showable
        // bcz its for admin not for user....and we sure that 200 credit will always keep...
      }
    })
    .catch((err) => console.log(err));
  return obj;
};
