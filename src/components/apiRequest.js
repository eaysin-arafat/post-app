export const apiRequest = async (url = "", optionObj = null, errMsg = null) => {
  try {
    const response = await fetch(url, optionObj);
    if (!response.ok) throw Error("Please reload the app");
  } catch (err) {
    errMsg = err.message;
  } finally {
    // eslint-disable-next-line no-unsafe-finally
    return errMsg;
  }
};
