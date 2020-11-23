sfdx-mdt-plugin
=======

sfdx metadata plugin

[![Version](https://img.shields.io/npm/v/sfdx-mdt-plugin.svg)](https://npmjs.org/package/sfdx-mdt-plugin)
[![CircleCI](https://circleci.com/gh/Repositories/sfdx-mdt-plugin/tree/master.svg?style=shield)](https://circleci.com/gh/Repositories/sfdx-mdt-plugin/tree/master)
[![Appveyor CI](https://ci.appveyor.com/api/projects/status/github/Repositories/sfdx-mdt-plugin?branch=master&svg=true)](https://ci.appveyor.com/project/heroku/sfdx-mdt-plugin/branch/master)
[![Codecov](https://codecov.io/gh/Repositories/sfdx-mdt-plugin/branch/master/graph/badge.svg)](https://codecov.io/gh/Repositories/sfdx-mdt-plugin)
[![Greenkeeper](https://badges.greenkeeper.io/Repositories/sfdx-mdt-plugin.svg)](https://greenkeeper.io/)
[![Known Vulnerabilities](https://snyk.io/test/github/Repositories/sfdx-mdt-plugin/badge.svg)](https://snyk.io/test/github/Repositories/sfdx-mdt-plugin)
[![Downloads/week](https://img.shields.io/npm/dw/sfdx-mdt-plugin.svg)](https://npmjs.org/package/sfdx-mdt-plugin)
[![License](https://img.shields.io/npm/l/sfdx-mdt-plugin.svg)](https://github.com/Repositories/sfdx-mdt-plugin/blob/master/package.json)

<!-- toc -->

<!-- tocstop -->
<!-- install -->
<!-- usage -->
```sh-session
$ npm install -g sfdx-mdt-plugin
$ sfdx COMMAND
running command...
$ sfdx (-v|--version|version)
sfdx-mdt-plugin/0.1.4 win32-x64 node-v12.14.1
$ sfdx --help [COMMAND]
USAGE
  $ sfdx COMMAND
...
```
<!-- usagestop -->
<!-- commands -->
* [`sfdx mdt:customlabels:compose [-p <string>] [-d <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-mdtcustomlabelscompose--p-string--d-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx mdt:customlabels:decompose [-p <string>] [-d <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-mdtcustomlabelsdecompose--p-string--d-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx mdt:git:delta [-f <string>] [-t <string>] [-d <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-mdtgitdelta--f-string--t-string--d-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx mdt:profile:compose [-p <string>] [-d <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-mdtprofilecompose--p-string--d-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx mdt:profile:decompose [-p <string>] [-d <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-mdtprofiledecompose--p-string--d-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx mdt:profile:retrieve [-p <string>] [-d <string>] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-mdtprofileretrieve--p-string--d-string--u-string---apiversion-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)

## `sfdx mdt:customlabels:compose [-p <string>] [-d <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

```
USAGE
  $ sfdx mdt:customlabels:compose [-p <string>] [-d <string>] [--json] [--loglevel 
  trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  -d, --inputdir=inputdir                                                           The input directory that stores the
                                                                                    decomposed metadata files

  -p, --sourcepath=sourcepath                                                       The path to the source metadata file

  --json                                                                            format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation

EXAMPLE
  $ sfdx mdt:customlabels:compose -p {sourcepath} -d {outputdirectory}
     Compose multiple custom label files into a Custom Label xml file
```

_See code: [lib\commands\mdt\customlabels\compose.js](https://github.com/benahm/sfdx-mdt-plugin/blob/v0.1.4/lib\commands\mdt\customlabels\compose.js)_

## `sfdx mdt:customlabels:decompose [-p <string>] [-d <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

```
USAGE
  $ sfdx mdt:customlabels:decompose [-p <string>] [-d <string>] [--json] [--loglevel 
  trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  -d, --outputdir=outputdir                                                         The output directory to store the
                                                                                    decomposed metadata files

  -p, --sourcepath=sourcepath                                                       The path to the source metadata file

  --json                                                                            format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation

EXAMPLE
  $ sfdx mdt:customlabels:decompose -p {sourcepath} -d {outputdirectory}
     Decompose Custom Labels xml file to multiple custom label files
```

_See code: [lib\commands\mdt\customlabels\decompose.js](https://github.com/benahm/sfdx-mdt-plugin/blob/v0.1.4/lib\commands\mdt\customlabels\decompose.js)_

## `sfdx mdt:git:delta [-f <string>] [-t <string>] [-d <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

```
USAGE
  $ sfdx mdt:git:delta [-f <string>] [-t <string>] [-d <string>] [--json] [--loglevel 
  trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  -d, --outputdir=outputdir                                                         The output directory where to
                                                                                    generate the package

  -f, --from=from                                                                   Branch or commit from

  -t, --to=to                                                                       Branch or commit to

  --json                                                                            format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation

EXAMPLE
  $ sfdx mdt:git:diff -f {fromCommit} -t {toCommit} -d {outputdirectory}
     Generate a delta package based on a git diff
```

_See code: [lib\commands\mdt\git\delta.js](https://github.com/benahm/sfdx-mdt-plugin/blob/v0.1.4/lib\commands\mdt\git\delta.js)_

## `sfdx mdt:profile:compose [-p <string>] [-d <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

```
USAGE
  $ sfdx mdt:profile:compose [-p <string>] [-d <string>] [--json] [--loglevel 
  trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  -d, --inputdir=inputdir                                                           The input directory that stores the
                                                                                    decomposed metadata files

  -p, --sourcepath=sourcepath                                                       The path to the source metadata file

  --json                                                                            format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation

EXAMPLE
  $ sfdx mdt:profile:compose -p {sourcepath} -d {outputdirectory}
     Compose multiple profile access files into the Profile xml file
```

_See code: [lib\commands\mdt\profile\compose.js](https://github.com/benahm/sfdx-mdt-plugin/blob/v0.1.4/lib\commands\mdt\profile\compose.js)_

## `sfdx mdt:profile:decompose [-p <string>] [-d <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

```
USAGE
  $ sfdx mdt:profile:decompose [-p <string>] [-d <string>] [--json] [--loglevel 
  trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  -d, --outputdir=outputdir                                                         The output directory to store the
                                                                                    decomposed metadata files

  -p, --sourcepath=sourcepath                                                       The path to the source metadata file

  --json                                                                            format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation

EXAMPLE
  $ sfdx mdt:profile:decompose -p {sourcepath} -d {outputdirectory}
       Decompose Profile xml file to multiple profile access files
```

_See code: [lib\commands\mdt\profile\decompose.js](https://github.com/benahm/sfdx-mdt-plugin/blob/v0.1.4/lib\commands\mdt\profile\decompose.js)_

## `sfdx mdt:profile:retrieve [-p <string>] [-d <string>] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

```
USAGE
  $ sfdx mdt:profile:retrieve [-p <string>] [-d <string>] [-u <string>] [--apiversion <string>] [--json] [--loglevel 
  trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  -d, --outputdir=outputdir                                                         The input directory that stores the
                                                                                    decomposed metadata files

  -p, --sourcepath=sourcepath                                                       The path to the source metadata
                                                                                    profile file

  -u, --targetusername=targetusername                                               username or alias for the target
                                                                                    org; overrides default target org

  --apiversion=apiversion                                                           override the api version used for
                                                                                    api requests made by this command

  --json                                                                            format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation

EXAMPLE
  $ sfdx mdt:profile:retrieve -u {sourceOrg} -p {sourcepath} [-d {outputdirectory}]
     Retrieve a profile with all the accesses
```

_See code: [lib\commands\mdt\profile\retrieve.js](https://github.com/benahm/sfdx-mdt-plugin/blob/v0.1.4/lib\commands\mdt\profile\retrieve.js)_
<!-- commandsstop -->
<!-- debugging-your-plugin -->
