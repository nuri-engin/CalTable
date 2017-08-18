Ext.define('CalTable.model.MyEventModel', {
    extend : 'Sch.model.Event',
    fields : ['Guest']
});

Ext.define('CalTable.view.Scheduler', {
    extend : 'Sch.panel.SchedulerGrid',
    xtype  : 'calendar',

    requires : [
        'Sch.plugin.NonWorkingTime',
        'Sch.feature.HeaderResize'
    ],

    title             : 'Presets and zooming',
    itemId            : 'calendar',
    barMargin         : 2,
    rowHeight         : 35,
    border            : false,
    viewPreset        : 'dayNightShift',
    eventBodyTemplate : '<div class="value" style="width: {Guest}%">{Guest}</div>',
    startDate         : new Date(2017, 0, 1),
    endDate           : new Date(2017, 0, 3),
    split             : false,

    highlightWeekends : true,

    // Setup static columns
    columns : [
        { header : 'Room', sortable : true, width : 80, dataIndex : 'Name', flex : 1 }
    ],

    horizontalTimeAxisColumnCfg : {
        enableTickResizing : true
    },

    resourceStore : {
        type    : 'resourcestore',
        sorters : {
            property  : 'Room',
            direction : 'ASC'
        },
        data    : [
            { Id : '101', Name : '101' },
            { Id : '201', Name : '201' },
            { Id : '301', Name : '301' },
            { Id : '401', Name : '401' },
            { Id : '501', Name : '501' },
            { Id : '601', Name : '601' }
        ]
    },

    eventStore : {
        type  : 'eventstore',
        model : 'CalTable.model.MyEventModel', // See definition above
        data  : [
            {
                ResourceId  : '101',
                Guest : 'Mike Hunder',
                StartDate   : new Date(2017, 0, 1, 10),
                EndDate     : new Date(2017, 0, 2, 12)
            },
            {
                ResourceId  : '201',
                Guest : 'Jennifer Abustly',
                StartDate   : new Date(2017, 0, 1, 12),
                EndDate     : new Date(2017, 0, 4, 13)
            },
            {
                ResourceId  : '301',
                Guest : 'Maria Gochra',
                StartDate   : new Date(2017, 0, 1, 14),
                EndDate     : new Date(2017, 0, 7, 16)
            },
            {
                ResourceId  : '601',
                Guest : 'Alexendar Mity',
                StartDate   : new Date(2017, 0, 1, 16),
                EndDate     : new Date(2017, 0, 3, 18)
            }
        ]
    },

    initComponent : function() {
        var me = this;

        Sch.preset.Manager.registerPreset("dayNightShift", {
            timeColumnWidth  : 35,
            rowHeight        : 32,
            displayDateFormat: 'G:i',
            shiftIncrement   : 1,
            shiftUnit        : "DAY",
            timeResolution   : {
                unit     : "MINUTE",
                increment: 15
            },
            defaultSpan      : 24,
            headerConfig     : {
                bottom: {
                    unit      : "HOUR",
                    increment : 1,
                    dateFormat: 'G',
                    renderer : function (startDate, endDate, headerConfig, cellIdx) {
                        return Ext.Date.format(startDate, 'G:i');
                    }
                },
                middle: {
                    unit     : "HOUR",
                    increment: 12,
                    renderer : function (startDate, endDate, headerConfig, cellIdx) {
                        // Setting align on the header config object
                        headerConfig.align = 'center';

                        if (startDate.getHours() === 0) {
                            // Setting a custom CSS on the header cell element
                            headerConfig.headerCls = 'x-fa fa-moon-o';

                            return Ext.Date.format(startDate, 'M d') + ' Night Shift';
                        }
                        else {
                            // Setting a custom CSS on the header cell element
                            headerConfig.headerCls = 'x-fa fa-sun-o';

                            return Ext.Date.format(startDate, 'M d') + ' Day Shift';
                        }
                    }
                },
                top   : {
                    unit      : "DAY",
                    increment : 1,
                    dateFormat: 'd M Y'
                }
            }
        });

        Sch.preset.Manager.registerPreset("onelevel", {
            timeColumnWidth  : 140,
            rowHeight        : 32,
            displayDateFormat: 'G:i',
            shiftIncrement   : 1,
            shiftUnit        : "DAY",
            timeResolution   : {
                unit     : "MINUTE",
                increment: 15
            },
            defaultSpan      : 24,
            headerConfig     : {
                middle: {
                    unit     : "HOUR",
                    increment: 12,
                    renderer : function (startDate, endDate, headerConfig, cellIdx) {
                        // Setting align on the header config object
                        headerConfig.align = 'center';

                        if (startDate.getHours() === 0) {
                            // Setting a custom CSS on the header cell element
                            headerConfig.headerCls = 'nightShift';
                            return Ext.Date.format(startDate, 'M d') + ' Night Shift';
                        }
                        else {
                            // Setting a custom CSS on the header cell element
                            headerConfig.headerCls = 'dayShift';
                            return Ext.Date.format(startDate, 'M d') + ' Day Shift';
                        }
                    }
                }
            }
        });

        Ext.apply(me, {
            header : {
                items: [
                    {
                        xtype  : 'button',
                        text   : 'set normal column text',
                        handler: function () {
                            me.down('gridcolumn').setText('foo');
                        }
                    },
                    {
                        xtype  : 'button',
                        text   : 'set 3 row text',
                        handler: function () {
                            me.down('gridcolumn').setText('foo<BR>bar<br>baz');
                            me.setViewPreset('onelevel');
                        }
                    },
                    {
                        xtype  : 'button',
                        text   : 'set 5 row text',
                        handler: function () {
                            me.down('gridcolumn').setText('foo<BR>bar<br>foo<BR>bar<br>baz');
                            me.setViewPreset('weekAndMonth');
                        }
                    },
                    {
                        xtype : 'button',
                        text  : 'Select preset',
                        itemId: 'presets',
                        menu  : {
                            items: [
                                {
                                    text     : 'Seconds',
                                    itemId   : 'secondAndMinute',
                                    startDate: new Date(2017, 0, 1, 10),
                                    endDate  : new Date(2017, 0, 1, 13)
                                },
                                {
                                    text     : 'Minutes',
                                    itemId   : 'minuteAndHour',
                                    startDate: new Date(2017, 0, 1, 10),
                                    endDate  : new Date(2017, 0, 1, 14)
                                },
                                {
                                    text     : 'Hours',
                                    itemId   : 'hourAndDay',
                                    startDate: new Date(2017, 0, 1, 8),
                                    endDate  : new Date(2017, 0, 1, 18)
                                },
                                {
                                    text     : 'Days',
                                    itemId   : 'weekAndDay',
                                    startDate: new Date(2017, 0, 1),
                                    endDate  : new Date(2017, 0, 21)
                                },
                                {text: 'Weeks', itemId: 'weekAndMonth'},
                                {text: 'Weeks 2', itemId: 'weekAndDayLetter'},
                                {text: 'Weeks 3', itemId: 'weekDateAndMonth'},
                                {text: 'Months', itemId: 'monthAndYear'},
                                {
                                    text     : 'Years',
                                    itemId   : 'year',
                                    startDate: new Date(2015, 0, 1),
                                    endDate  : new Date(2020, 0, 1)
                                },
                                {
                                    text     : 'Years 2',
                                    itemId   : 'manyYears',
                                    startDate: new Date(2010, 0, 1),
                                    endDate  : new Date(2020, 0, 1)
                                },
                                '-',
                                {
                                    text     : 'Day/night shift (custom)',
                                    itemId   : 'dayNightShift',
                                    startDate: new Date(2017, 0, 1),
                                    endDate  : new Date(2017, 0, 2)
                                },
                                {
                                    text     : '1 level',
                                    itemId   : 'onelevel',
                                    startDate: new Date(2017, 0, 1),
                                    endDate  : new Date(2017, 0, 2)
                                }
                            ]
                        }
                    },
                    {
                        xtype  : 'button',
                        iconCls: 'fa fa-search-plus',
                        width  : null,
                        handler: function () {
                            me.zoomIn();
                        }
                    },
                    {
                        xtype  : 'button',
                        iconCls: 'fa fa-search-minus',
                        width  : null,
                        handler: function () {
                            me.zoomOut();
                        }
                    }

                ]
            }
        });

        me.callParent();

        me.on('render', function() {
            // tools not available with down before render, add listener after render
            me.down('#presets menu').on('click', me.onPresetMenu, me);
        });
    },

    onPresetMenu: function(menu, item) {
        if (item) {
            this.switchViewPreset(item.itemId, item.startDate, item.endDate);
            this.down('#presets').setText(item.text);
        }
    }
});