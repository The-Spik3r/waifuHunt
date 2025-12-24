import { Repository } from "../repository";
import * as userDomain from "../user/domain";
import * as waifuDomain from "../waifu/domain";
import * as voteDomain from "../vote/domain";

export const dependecyContainer = {
  userService: userDomain,
  waifuService: waifuDomain,
  voteService: voteDomain,
  ...Repository,
};

export type Dependencies = typeof dependecyContainer;
