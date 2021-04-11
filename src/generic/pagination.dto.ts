import { IsNumber } from 'class-validator';
import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class PaginationDto {
  @Field(() => Int, { name: 'limit' })
  @IsNumber()
  private _limit: number;

  @Field(() => Int, { name: 'page' })
  @IsNumber()
  private _page: number;

  constructor(limit: number, page: number) {
    this._limit = limit;
    this._page = page;
  }

  get limit(): number {
    return this._limit > 100 ? 100 : this._limit;
  }

  set limit(value: number) {
    this._limit = Number(value);
  }

  get page(): number {
    return this._page;
  }

  set page(value: number) {
    this._page = Number(value);
  }
}
