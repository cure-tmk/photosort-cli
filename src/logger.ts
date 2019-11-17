import * as chalk from 'chalk';
type LogTypes = 'default' | 'error' | 'warn' | 'debug';

const logger: { [x in LogTypes]: (s: string) => void } = {
  default: (content: string) => console.log('[LOG]', content),
  error: (content: string) => console.log(chalk.red(`[ERROR] ${content}`)),
  warn: (content: string) => console.log(chalk.yellow(`[WARN] ${content}`)),
  debug: (content: string) => console.log(chalk.cyan(`[DEBUG] ${content}`)),
}

export default logger;
