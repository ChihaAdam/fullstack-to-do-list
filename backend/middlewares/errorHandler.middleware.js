export const ErrorHandler = (err, _req, res, _next) => {
    if (err?.code === 11000) {
      res.status(409).json({ message: "Duplicate key entered" });
      return;
    }
    switch (err?.name) {
      case "DocumentNotFoundError":
        res.status(404).json({ message: "Resource not found" });
        break;

      case "ValidationError":
        res.status(400).json({
          message: "body doesn't match with the required schema",
        });
        break;

      case "noTokenProvidedError":
        res.status(401).json({ message: "no token provided" });
        break;
      case "invalidAccessTokenError":
        res.status(401).json({ message: "invalid access token" });
        break;
      case "invalidRefreshTokenError":
        res
          .status(401)
          .cookie("refreshToken", null,{
            httpOnly:true
          })
          .json({ message: "invalid refresh token", accessToken: null });
        break;
      case "wrongLoginInfoError":
        res.status(401).json({ message: "incorrect username or password" });
        break;
      
      default:
        console.error(err);
        console.table(err);
        res.status(500).json({
          message: "internal server error",
        });
    }
};
