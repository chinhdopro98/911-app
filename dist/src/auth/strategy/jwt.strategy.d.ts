import { Strategy } from "passport-local";
import "dotenv/config";
import { IJwtPayload } from "../interface/jwt-payload.interface";
import { AuthService } from "../auth.service";
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly authService;
    constructor(authService: AuthService);
    validate(payload: IJwtPayload): Promise<import("../../users/entities/user.entity").User>;
}
export {};
