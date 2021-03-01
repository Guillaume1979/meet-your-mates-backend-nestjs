import { Controller } from '@nestjs/common';
import { TechnicalRoleService } from './technical-role.service';

@Controller('technical-role')
export class TechnicalRoleController {
  constructor(private readonly technicalRoleService: TechnicalRoleService) {}
}
