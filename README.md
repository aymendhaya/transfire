@fornya/transfire
================

SQL Server to Google Firestore Migration CLI

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/@fornya/transfire.svg)](https://npmjs.org/package/@fornya/transfire)
[![Downloads/week](https://img.shields.io/npm/dw/@fornya/transfire.svg)](https://npmjs.org/package/@fornya/transfire)
[![License](https://img.shields.io/npm/l/@fornya/transfire.svg)](https://github.com/wearefornya/transfire/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g transfire
$ transfire COMMAND
running command...
$ transfire (-v|--version|version)
transfire/0.0.1 darwin-x64 node-v16.13.0
$ transfire --help [COMMAND]
USAGE
  $ transfire COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`transfire config [ACTION]`](#transfire-config-action)
* [`transfire help [COMMAND]`](#transfire-help-command)
* [`transfire mssql [MSSQLTABLENAME] [CUSTOM_ID]`](#transfire-mssql-mssqltablename-custom_id)

## `transfire config [ACTION]`

Configure Google Cloud Service Account

```
USAGE
  $ transfire config [ACTION]

OPTIONS
  -f, --file=file  Service Account JSON path
  -h, --help       show CLI help

EXAMPLE
  $ transfire config sa --file=./path/to/my/serviceaccount.json
```

_See code: [src/commands/config.ts](https://github.com/wearefornya/transfire/blob/v0.0.1/src/commands/config.ts)_

## `transfire help [COMMAND]`

display help for transfire

```
USAGE
  $ transfire help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.5/src/commands/help.ts)_

## `transfire mssql [MSSQLTABLENAME] [CUSTOM_ID]`

migrate a Microsoft SQL Server Table to Google Firestore document collections

```
USAGE
  $ transfire mssql [MSSQLTABLENAME] [CUSTOM_ID]

OPTIONS
  -d, --database=database  MSSQL Database name
  -h, --help               show CLI help
  -p, --password=password  MSSQL Database Password
  -s, --server=server      MSSQL Database Host
  -u, --username=username  MSSQL Database Username

EXAMPLE
  $ transfire mssql MySQLTable CUSTOM_ID -d=mysqldb -s=192.168.10.12 -u=sa -p=myP@55word
```

_See code: [src/commands/mssql.ts](https://github.com/wearefornya/transfire/blob/v0.0.1/src/commands/mssql.ts)_
<!-- commandsstop -->
