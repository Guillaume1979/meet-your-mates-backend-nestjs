import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '../../enums/role';
import { ROLES_KEY } from '../../decorator/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // on teste si la route a besoin d'un role pour être accessible
    if (!requiredRoles) {
      return true;
    }

    // on récupère l'utilisateur
    const { user } = context.switchToHttp().getRequest();
    // si un utilisateur est fourni
    if (user) {
      return requiredRoles.some((role) => user.roles?.includes(role));
    }

    //sinon on bloque l'accès à la ressource
    return false;
  }
}
