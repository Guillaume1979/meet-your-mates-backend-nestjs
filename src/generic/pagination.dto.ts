import { IsNumber } from 'class-validator';

export class PaginationDto {
  @IsNumber()
  private _limit: number;

  @IsNumber()
  private _page: number;

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
