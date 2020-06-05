import { LOGIN_TYPE } from "../utils/enums";
import DiscordHandler from "./DiscordHandler";
import FacebookHandler from "./FacebookHandler";
import GoogleHandler from "./GoogleHandler";
import { CreateHandlerParams, ILoginHandler } from "./interfaces";
import JwtHandler from "./JwtHandler";
import PasswordlessHandler from "./PasswordlessHandler";
import RedditHandler from "./RedditHandler";
import TwitchHandler from "./TwitchHandler";

const createHandler = ({ clientId, redirect_uri, typeOfLogin, verifier, jwtParams, redirectToOpener }: CreateHandlerParams): ILoginHandler => {
  switch (typeOfLogin) {
    case LOGIN_TYPE.GOOGLE:
      return new GoogleHandler(clientId, verifier, redirect_uri, redirectToOpener);
    case LOGIN_TYPE.FACEBOOK:
      return new FacebookHandler(clientId, verifier, redirect_uri, redirectToOpener);
    case LOGIN_TYPE.TWITCH:
      return new TwitchHandler(clientId, verifier, redirect_uri, redirectToOpener);
    case LOGIN_TYPE.REDDIT:
      return new RedditHandler(clientId, verifier, redirect_uri, redirectToOpener);
    case LOGIN_TYPE.DISCORD:
      return new DiscordHandler(clientId, verifier, redirect_uri, redirectToOpener);
    case LOGIN_TYPE.PASSWORDLESS:
      return new PasswordlessHandler(clientId, verifier, redirect_uri, typeOfLogin, redirectToOpener, jwtParams);
    case LOGIN_TYPE.GITHUB:
    case LOGIN_TYPE.LINKEDIN:
    case LOGIN_TYPE.TWITTER:
    case LOGIN_TYPE.WEIBO:
    case LOGIN_TYPE.EMAIL_PASSWORD:
    case LOGIN_TYPE.JWT:
      return new JwtHandler(clientId, verifier, redirect_uri, typeOfLogin, redirectToOpener, jwtParams);
    default:
      throw new Error("Invalid login type");
  }
};

export default createHandler;
