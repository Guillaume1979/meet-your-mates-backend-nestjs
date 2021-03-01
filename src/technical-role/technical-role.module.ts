import { Module } from '@nestjs/common';
import { TechnicalRoleService } from './technical-role.service';
import { TechnicalRoleController } from './technical-role.controller';

@Module({
  controllers: [TechnicalRoleController],
  providers: [TechnicalRoleService]
})
export class TechnicalRoleModule {}
