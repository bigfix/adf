requirejs.config({
    baseUrl: 'libs',
    paths: {
		"adf": "ADF/API/ADFAPI",
        "adf-ui": "ADF/jQuery/ADFUI",
		"resources": "../resources",
        "sample-resources": "../sample-resources",
		"jquery": "jquery-1.7.1",
        "jquery-ui": "jquery-ui-1.8.17",
        "jquery.validate": "jquery.validate.1.10.0/jquery.validate",
        "jquery.validate.resources": "jquery.validate.1.10.0/jquery.validate.resources",
        "jqplot": "jquery.jqplot.1.0.0b2_r1012/jquery.jqplot",
        "jqplot.barRenderer": "jquery.jqplot.1.0.0b2_r1012/plugins/jqplot.barRenderer",
        "jqplot.pieRenderer": "jquery.jqplot.1.0.0b2_r1012/plugins/jqplot.pieRenderer",
        "jqplot.categoryAxisRenderer": "jquery.jqplot.1.0.0b2_r1012/plugins/jqplot.categoryAxisRenderer",
        "jqplot.highlighter": "jquery.jqplot.1.0.0b2_r1012/plugins/jqplot.highlighter",
        "jqplot.canvasTextRenderer": "jquery.jqplot.1.0.0b2_r1012/plugins/jqplot.canvasTextRenderer",
        "jqplot.canvasAxisLabelRenderer": "jquery.jqplot.1.0.0b2_r1012/plugins/jqplot.canvasAxisLabelRenderer",
        "excanvas": "../excanvas",
        "slick.grid": "SlickGrid-2.0b1-0-gfee9ad2/slick.grid",
        "slick.core": "SlickGrid-2.0b1-0-gfee9ad2/slick.core",
        "slick.dataview": "SlickGrid-2.0b1-0-gfee9ad2/slick.dataview",
        "slick.checkboxselectcolumn": "SlickGrid-2.0b1-0-gfee9ad2/plugins/slick.checkboxselectcolumn",
        "slick.rowselectionmodel": "SlickGrid-2.0b1-0-gfee9ad2/plugins/slick.rowselectionmodel",
        "slick.pager": "SlickGrid-2.0b1-0-gfee9ad2/controls/slick.pager",
        "slick.columnpicker": "SlickGrid-2.0b1-0-gfee9ad2/controls/slick.columnpicker",
        "jquery.event.drag": "SlickGrid-2.0b1-0-gfee9ad2/lib/jquery.event.drag-2.0.min",
        "angular": "../angular_mock",
        "angular-setlocale": "angular/i18n/angular-setlocale"
    },
    packages: [
        {name: 'adf-ng', location: 'ADF/ng'}
    ],
    shim: {

        "adf-ui": {
            deps: [
                "adf",
                "jquery-ui",
                "resources",
                "jquery.validate",
                "jquery.validate.resources",
                "jqplot",
                "jqplot.barRenderer",
                "jqplot.pieRenderer",
                "jqplot.categoryAxisRenderer",
                "jqplot.highlighter",
                "jqplot.canvasTextRenderer",
                "jqplot.canvasAxisLabelRenderer",
                "css!yui-css-grids-3.4.1/grids-min",
                "css!ADF/jQuery/custom-theme/jquery-ui-1.8.18.custom",
                "css!ADF/jQuery/ADFUI"
            ],
            exports: 'temui'
        },
        "jqplot": ["css!jquery.jqplot.1.0.0b2_r1012/jquery.jqplot.css"],
        "jqplot.barRenderer": ["jqplot"],
        "jqplot.pieRenderer": ["jqplot"],
        "jqplot.categoryAxisRenderer": ["jqplot"],
        "jqplot.highlighter": ["jqplot"],
        "jqplot.canvasTextRenderer": ["jqplot"],
        "jqplot.canvasAxisLabelRenderer": ["jqplot"],
		"jquery.validate.resources": ["jquery.validate"],
        "jquery-ui": ['jquery'],
        "jquery.event.drag": ["jquery"],
        "slick.core": ["jquery", "jquery.event.drag"],
        "slick.grid": {
            deps: [
                "jquery",
                "jquery.event.drag",
                "slick.core",
                "css!SlickGrid-2.0b1-0-gfee9ad2/slick.grid"
            ],
            exports: 'Slick.Grid'
        },
        "slick.pager": {
            deps: [
                "slick.grid",
                "css!SlickGrid-2.0b1-0-gfee9ad2/controls/slick.pager"
            ],
            exports: 'Slick.Controls.Pager'
        },
        "slick.columnpicker": {
            deps: [
                "slick.grid",
                "css!SlickGrid-2.0b1-0-gfee9ad2/controls/slick.columnpicker"
            ],
            exports: 'Slick.Controls.ColumnPicker'
        },
        "angular-setlocale": ["angular"]
    },
    config: {
        text: {
            env: 'console'
        }
    }
});
