import { Injectable } from '@angular/core';
import {
  InterpolateFunction,
  InterpolationParameters,
  TranslateDefaultParser,
} from '@ngx-translate/core';

/**
 * The default parser turns numbers and booleans into undefined, which drops data like a project's
 * `id` or `featured` flag from the i18n JSON files. This one returns them unchanged.
 */
@Injectable()
export class ValueKeepingParser extends TranslateDefaultParser {
  override interpolate(
    expr: InterpolateFunction | string,
    params?: InterpolationParameters,
  ): string | undefined {
    const value: unknown = expr;
    if (typeof value === 'number' || typeof value === 'boolean') {
      // The typings say string, but callers reading JSON data (like ProjectsService) expect the real value.
      return value as unknown as string;
    }
    return super.interpolate(expr, params);
  }
}
