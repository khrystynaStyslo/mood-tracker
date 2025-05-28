import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class SerializerInterceptor implements NestInterceptor {
    intercept(
        _context: ExecutionContext,
        next: CallHandler
    ): Observable<any> {
        return next.handle().pipe(
            map((data) => {
                if (data === undefined || data === null || typeof data !== 'object') {
                    return data;
                }

                const json = JSON.stringify(data, (_key, value) => {
                    if (typeof value === 'bigint') {
                        return value.toString();
                    }
                    if (value instanceof Date) {
                        return value.toISOString();
                    }
                    return value;
                });

                return JSON.parse(json);
            })
        );
    }
}