import * as commander from 'commander';
import logger from './logger';
import photosort from './photosort';

const VERSION = '0.0.1';

commander
  .version(VERSION)
  .usage('<targt path> -o <output path>')
  .requiredOption('-o, --output <path>', 'output directory')
  .option('-d, --debug', 'run in debug mode', false)
  .action((files) => {
    if (commander.debug) {
      logger.debug('recieved args')
      console.log('debug: %j', commander.debug);
      console.log('output: %j', commander.output);
      console.log('args: %j', commander.args);
    }
    if (!commander.args.length) {
      logger.error('provide a target')
      process.exit(1);
    }
    photosort(commander.args, commander.output)
  })
  .parse(process.argv);

