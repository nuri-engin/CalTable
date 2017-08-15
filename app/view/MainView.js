Ext.define('CalTable.view.MainView', {
    extend: 'Ext.container.Viewport',
    alias: 'widget.mainview',

    requires: [
        'Ext.menu.Menu',
        'Ext.menu.Item',
        'Ext.form.Label'
    ],

    itemId: 'mainView',
    layout: 'border',
    defaultListenerScope: true,

    items: [
        {
            xtype: 'panel',
            region: 'west',
            split: true,
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
                            text: 'Home View'
                        }
                    ]
                }, {
                    xtype: 'panel',
                    itemId: 'foliolist',
                    title: 'Folio List',
                    layout: {
                        type: 'vbox',
                        align: 'center',
                        pack: 'center'
                    },
                    items: [
                        {
                            xtype: 'label',
                            text: 'Folio List View'
                        }
                    ]
                }, {
                    xtype: 'panel',
                    itemId: 'calendar',
                    title: 'Calendar',
                    layout: {
                        type: 'vbox',
                        align: 'center',
                        pack: 'center'
                    }, 
                    items: [
                        {
                            xtype: 'label',
                            text: 'Calendar View'
                        }
                    ]
                }
            ]
        }
    ],
    
    onMenuClick: function(menu, item, e, eOpts) {
        location.hash = item.itemId;
    }
});