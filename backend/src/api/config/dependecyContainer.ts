import { Repository } from "../repository";
import * as userDomain from "../user/domain";
export const dependecyContainer = {
    userService: userDomain,
    ...Repository
};

export type Dependencies = typeof dependecyContainer
