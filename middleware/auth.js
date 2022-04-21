import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  try {
      //getting token from the frontEnd
    const token = req.headers.authorization.split(" ")[1];
    const isCustomAuth = token.length < 500;
    //if isCustomAuth is < 500, its from the google auth else its from the manual auth

    let decodedData;
    //line 12 - 18 is used to get the manual token while line 16-17 is for google login.
    //secret is needed in the manual login.

    //the sub is a unique id for each user from google.
    
    if (token && isCustomAuth) {
      decodedData = jwt.verify(token, "test");
      req.userId = decodedData?.id;
    } else {
      decodedData = jwt.decode(token);
      req.userId = decodedData?.sub;
    }

    next();
  } catch (error) {
    console.log(error);
  }
};

export default auth;
