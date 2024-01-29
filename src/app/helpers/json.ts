export const validateJsonStr = <T>(str: string) => {
  try {
    const object = JSON.parse(str);

    return {
      data: object as T,
      isValid: true,
    };
  } catch (err) {
    console.error("err:", err, "json string:", str);
    return {
      isValid: false,
    };
  }
};
