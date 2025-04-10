import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './decorators/role.decorator';
import { Role } from './role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // Get the required roles from the route metadata
    const requiredRoles = this.reflector.get<Role[]>(ROLES_KEY, context.getHandler());
    
    if (!requiredRoles) {
      return true; // No roles required, allow access
    }

    // Get user from request
    const request  = context.switchToHttp().getRequest();

    const user = request.user;

    if (!user || !user.role) {
      throw new ForbiddenException('Access denied: No role assigned');
    }

    // Check if the user has one of the required roles
    const hasRole = requiredRoles.includes(user.role);
    if (!hasRole) {
      throw new ForbiddenException('Access denied: Insufficient permissions');
    }

    return hasRole;
  }
}
