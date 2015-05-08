# The BigFix Application Development Framework 
The Application Development Framework (ADF) enables rapid, standardized development of rich applications in the form of dashboards and wizards that display within the IEM Console 
and web reports that display in a separate web-based interface.

##Features

###UI components
- UI component library built off of jQuery plugins and libraries and a sample dashboard that shows how to implement a basic application.
- "support" code that enables Dojo applications to run in the Console.
- AngularJS support for some UI components. These components are defined under “adf-ng” module.

###JavaScript API
The ADF includes a JavaScript API that provides the bulk of functionality available to an IEM application.  
Among the typical things you would like to do in an IEM application that can be done using the API include:
•	Making Session Relevance calls- the tem.evalRel() function can be used to make Relevance calls.
•	Creating custom content-  tem.content.createContent() is used for creating Fixlets, Tasks etc.
•	Storing data- tem.dataStore functions allow you to work with persistent data for individual dashboards.
•	Running an external executable-  tem.shell functions enable running external executables via ActiveX.
•	Installing library-  tem.library functions enable the installation and use of libraries with nested folder structure, i.e. Dojo

###Tools to support dashboard build
Using the build script can help you keep nested folders in source code for development and release the compiled version for production. 
Building gives better loading time as well.

##Contributing

If you <b>discover a bug</b> or would like to propose a new feature, please open a new [issue](https://github.com/bigfix/adf/issues).

