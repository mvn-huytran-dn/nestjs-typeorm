// ...
import { ConsoleLogger } from '@nestjs/common';

export class InternalDisabledLogger extends ConsoleLogger {
  static contextsToIgnore = [
    'InstanceLoader',
    'RoutesResolver',
    'RouterExplorer',
    'NestFactory',
  ];

  log(_: any, context?: string): void {
    if (!InternalDisabledLogger.contextsToIgnore.includes(context)) {
      super.log.apply(this, arguments);
    }
  }
}
