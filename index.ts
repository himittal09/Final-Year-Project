import dotenv from 'dotenv';

if (dotenv.config().error)
{
    console.error('\x1b[31m%s\x1b[0m', `Could not parse the config file for environment variables!`);
    process.exit(1);
}