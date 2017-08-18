Ext.define('CalTable.view.MainView', {
    extend: 'Ext.container.Viewport',
    alias: 'widget.mainview',

    requires: [
        'Ext.menu.Menu',
        'Ext.menu.Item',
        'Ext.form.Label',
        'CalTable.view.FolioList',
        'CalTable.view.Scheduler'
    ],

    itemId: 'mainView',
    layout: 'border',
    defaultListenerScope: true,
    
    items: [
        {
            xtype: 'panel',
            region: 'west',
            collapsible: true,
            split: false,
            padding: 1,
            itemId: 'menuPanel',
            width: 150,
            title: 'Menu',
            items: [
                {
                    xtype: 'menu',
                    floating: false,
                    itemId: 'menu',
                    items: [
                        {
                            xtype: 'menuitem',
                            itemId: 'home',
                            text: 'Home',
                            focusable: true
                        }, {
                            xtype: 'menuitem',
                            itemId: 'foliolist',
                            text: 'Folio List',
                            focusable: true
                        }, {
                            xtype: 'menuitem',
                            itemId: 'calendar',
                            text: 'Calendar',
                            focusable: true
                        }
                    ],
                    listeners: {click: 'onMenuClick'}
                }
            ]
        }, {
            xtype: 'panel',
            region: 'center',
            itemId: 'contentPanel',
            layout: 'card',
            padding: 1,
            scope: this,
            items: [
                {
                    xtype: 'panel',
                    itemId: 'home',
                    title: 'Home',
                    layout: {
                        type: 'vbox',
                        align: 'center',
                        pack: 'center'
                    },
                    items: [
                        {
                            xtype: 'label',
                            text: 'Please select the action on the "Menu" panel at left side.'
                        }
                    ]
                }, {
                    xtype: 'foliolist'
                }, {
                    xtype: 'calendar'
                }
            ]
        }
    ],
    
    onMenuClick: function(menu, item, e, eOpts) {
        location.hash = item.itemId;
    },

    initComponent: function () {
        console.log('Step 2: MainView');
        var me = this;
        me.callParent();
    }
});