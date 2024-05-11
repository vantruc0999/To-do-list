import { CustomDecorator, SetMetadata } from '@nestjs/common';

/**
 *
 * @description This decorator is used to mark a route as public, meaning that it does not require authentication.
 */
export const Public = (): CustomDecorator => SetMetadata('isPublic', true);
