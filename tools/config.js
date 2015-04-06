{
    appDir: '../src',
    mainConfigFile: '../src/common.js',
    dir: '../release',
    optimize: 'none',
    removeCombined: true,
    imageDir: "..", // relative to baseUrl
    imagePrefix: "sample_2.3.0_", // optional
    modules: [
        {
            // common layer that is shared among multiple ojo
            name: '../common',
            include: [
                "adf",
                "adf-ui",
                "adf-ng",
                "slick.grid",
                "slick.dataview",
                "slick.checkboxselectcolumn",
                "slick.rowselectionmodel",
                "slick.pager",
                "slick.columnpicker"
            ]
        },
        {
            name: '../sample',
            exclude: ['../common']
        },
        {
            name: '../template',
            exclude: ['../common']
        },
        {
            name: '../ng-sample',
            exclude: ['../common']
        }
        
        ,{
            name: '../docs-libs',
            include: [
                "adf",
                "adf-ui",
                "adf-ng"
            ],
            exclude: ['angular']
        }
    ],
    config: {
        text: {
            env: 'node'
        }
    }
}