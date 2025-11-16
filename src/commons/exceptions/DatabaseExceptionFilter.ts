import { Catch, ExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { QueryFailedError } from 'typeorm';

@Catch(QueryFailedError)
export class DatabaseExceptionFilter implements ExceptionFilter {
  catch(exception: QueryFailedError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    // MySQL duplicate entry
    if (exception.driverError) {
      return response.status(409).json({
        statusCode: 409,
        message: exception.message,
      });
    }

    return response.status(500).json({
      statusCode: 500,
      message: 'Database error',
    });
  }
}
