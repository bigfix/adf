IEM ADF 2.3.0
=============

Content
-------

The zip file contains the following folders:

    -   src: sample dashboard source code

    -   release: built dashboards for release

    -   tools: tools to support dashboard build

    -   dojo: sample dojo dashboard

    -   docs

        -   adf: documentation for ADF pure javascript APIs and ADF jQuery UI
            components

        -   adf-ng: documentation for ADF AngularJS components


Set up build environment
------------------------

Since the version 2.3.0 of ADF, requireJS is used to declare dependency and
allow the sample dashboards to be compiled to a flat folder structure. There is
a known issue ([Bug 59810][1]) that prevents the use of nested folders for both
dashboard and webreport. Using the build script can help you keep nested folders
in source code for development and release the compiled version for production.
Building gives better loading time as well.

### Dependencies:

    -   install [node][2]

    -   install node module 'stdio': `npm install stdio`

### Build config file: config.js

    You can change the release folder name and other settings in the config
    file. This config support multiple dashboards under a site. A common layer
    named 'common' is shared among multiple dashboards.

### Run the build

    Run `tools/build.bat` from command line.

    If using ant, you can run ant from the top level folder instead.



Documentation
-------------

For guidance on how to use the API and sample project, refer to the Developer's
Guide, in particular "Chapter 1: Developer's Overview".

Generated documentation resides under the docs folder. There are two sub
folders:

    -   adf

    -   adf-ng

The docs under adf folder can be opened directly in browser. The adf-ng docs
require an http server to serve its docs content. You can run
start-docs-server.js script to start the http server.

### Start server docs

    Requirements:

    -   install [node][2]

    -   install node module 'connect': `npm install connect`

    From command line, run: `node start-docs-server.js`.

    Or using ant: `ant startDocs`

    Browse to http://localhost:8080 for the docs content.



Upgrading from previous versions
--------------------------------

This version contains some changes in the method of loading dependency files.
Refer to sample.ojo and template.ojo to see the changes. Instead of using html
tags to link to js and css files, this dependency is declared in the main js
file using requirejs instead.



[1]: <http://bugs.sfolab.ibm.com/bugzilla/show_bug.cgi?id=59810>

[2]: <http://nodejs.org>
