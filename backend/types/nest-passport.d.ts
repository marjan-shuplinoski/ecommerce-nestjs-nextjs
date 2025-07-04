// types/nest-passport.d.ts
// Custom type declarations to force strict types for AuthGuard and PassportStrategy factories

import { Type } from '@nestjs/common';

// Patch AuthGuard factory to always return a class with correct type
export declare function AuthGuard(type?: string | string[]): Type<any>;

export declare class PassportStrategy<T = any, N extends string = string> {
    constructor(strategy: T, name?: N);
}
